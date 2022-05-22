import configureStore from "./store/configureStore";
import { loadBugs, addBug, resolveBug, assignBugToUser } from "./store/bugs";
import { projectAdded } from "./store/projects";

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
// store.dispatch(addBug({ description: "New bug" }));
store.dispatch(loadBugs());
store.dispatch(assignBugToUser(4, 1));
setTimeout(() => store.dispatch(resolveBug(5)), 2000);
