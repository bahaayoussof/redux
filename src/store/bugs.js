import { createSlice } from "@reduxjs/toolkit";
import { createSelector } from "reselect";
import { apiCallBegan } from "./api";
import moment from "moment";
import axios from "axios";

// Reducer
let lastId = 0;

const slice = createSlice({
	name: "bugs",
	initialState: {
		list: [],
		loading: false,
		lastFetch: null,
	},

	reducers: {
		// actions : action handlers

		bugsRequested: (bugs, action) => {
			bugs.loading = true;
		},

		bugsRequestedFailed: (bugs, action) => {
			bugs.loading = false;
		},

		bugsReceived: (bugs, action) => {
			bugs.list = action.payload;
			bugs.loading = false;
			bugs.lastFetch = Date.now();
		},

		bugAssignedToUser: (bugs, action) => {
			const { id: bugId, userId } = action.payload;
			const index = bugs.list.findIndex(bug => bug.id === bugId);
			bugs.list[index].userId = userId;
		},

		bugAdded: (bugs, action) => {
			bugs.list.push(action.payload);
		},

		bugResolved: (bugs, action) => {
			const index = bugs.list.findIndex(bug => bug.id === action.payload.id);
			bugs.list[index].resolved = true;
		},

		bugRemoved: (bugs, action) => {
			const index = bugs.list.findIndex(bug => bug.id === action.payload.id);
			bugs.list.splice(index, 1);

			// return bugs.list.filter(bug => bug.id !== action.payload.id);
		},
	},
});

const {
	bugAdded,
	bugResolved,
	bugRemoved,
	bugAssignedToUser,
	bugsReceived,
	bugsRequested,
	bugsRequestedFailed,
} = slice.actions;
export default slice.reducer;

// ActionCreators
const url = "/bugs";

export const loadBugs = () => (dispatch, getState) => {
	const { lastFetch } = getState().entities.bugs;

	const diffInMinutes = moment().diff(moment(lastFetch), "minutes");

	if (diffInMinutes < 10) return;

	dispatch(
		apiCallBegan({
			url,
			onStart: bugsRequested.type,
			onSuccess: bugsReceived.type,
			onError: bugsRequestedFailed.type,
		})
	);
};

// export const loadBugs = () =>
// 	apiCallBegan({
// 		url,
// 		onStart: bugsRequested.type,
// 		onSuccess: bugsReceived.type,
// 		onError: bugsRequestedFailed.type,
// 	});

// another way to addBug action

// export const addBug = bug => async dispatch => {
// 	const response = await axios.request({
// 		baseURL: "http://localhost:9001/api",
// 		url: "/bugs",
// 		method: "post",
// 		data: bug,
// 	});
// 	dispatch(bugAdded(response.data));
// };

export const addBug = bug =>
	apiCallBegan({
		url,
		method: "post",
		data: bug,
		onSuccess: bugAdded.type,
	});

export const resolveBug = id =>
	apiCallBegan({
		url: url + "/" + id,
		method: "patch",
		data: { resolved: true },
		onSuccess: bugResolved.type,
	});

export const assignBugToUser = (bugId, userId) =>
	apiCallBegan({
		url: `${url}/${bugId}`,
		method: "patch",
		data: { userId },
		onSuccess: bugAssignedToUser.type,
	});

// Selectors

// Memoization
// bugs => get unresolved bugs from the cache.

export const getUnresolvedBugs = createSelector(
	state => state.entities.bugs, // selector
	bugs => bugs.filter(bug => !bug.resolved) // result
);

export const getBugByUser = userId =>
	createSelector(
		state => state.entities.bugs,
		bugs => bugs.filter(bug => bug.userId === userId)
	);
