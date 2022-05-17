import { createSlice } from "@reduxjs/toolkit";
import { createSelector } from "reselect";

// Reducer
let lastId = 0;

const slice = createSlice({
	name: "bugs",
	initialState: [],
	reducers: {
		// actions : action handlers
		bugAssignedToUser: (bugs, action) => {
			const { bugId, userId } = action.payload;
			const index = bugs.findIndex(bug => bug.id === bugId);
			bugs[index].userId = userId;
		},

		bugAdded: (bugs, action) => {
			bugs.push({
				id: ++lastId,
				description: action.payload.description,
				resolved: false,
			});
		},

		bugResolved: (bugs, action) => {
			const index = bugs.findIndex(bug => bug.id === action.payload.id);
			bugs[index].resolved = true;
		},

		bugRemoved: (bugs, action) => {
			const index = bugs.findIndex(bug => bug.id === action.payload.id);
			bugs.splice(index, 1);

			// return bugs.filter(bug => bug.id !== action.payload.id);
		},
	},
});

export const { bugAdded, bugResolved, bugRemoved, bugAssignedToUser } = slice.actions;
export default slice.reducer;

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
