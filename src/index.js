import configureStore from "./store/configureStore";
import {
	bugAdded,
	bugRemoved,
	bugResolved,
	getUnresolvedBugs,
	bugAssignedToUser,
	getBugByUser,
	loadBugs,
	addBug,
} from "./store/bugs";
import { projectAdded } from "./store/projects";
import { userAdded, assignBug } from "./store/users";

const store = configureStore();

// api without actionCreators
// store.dispatch({
// 	type: "apiCallBegan",
// 	payload: {
// 		url: "/bugs",
// 		onSuccess: "bugsReceived",
// 		onError: "apiRequestFailed",
// 	},
// });

// api with actionCreators
// store.dispatch(
// 	actions.apiCallBegan({
// 		url: "/bugs",
// 		onSuccess: "bugsReceived",
// 	})
// );
// store.dispatch(loadBugs());
store.dispatch(addBug({ description: "Bug 0" }));
