import configureStore from "./store/configureStore";
import {
	bugAdded,
	bugRemoved,
	bugResolved,
	getUnresolvedBugs,
	bugAssignedToUser,
	getBugByUser,
	loadBugs,
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

store.dispatch(loadBugs());
setTimeout(() => store.dispatch(loadBugs()), 2000);
