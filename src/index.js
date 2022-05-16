import configureStore from "./store/configureStore";
import { bugAdded, bugRemoved, bugResolved, getUnresolvedCount } from "./store/bugs";
import { projectAdded } from "./store/projects";

const store = configureStore();

store.subscribe(() => {
	console.log("store changed!", store.getState({ trace: true }));
});

// Bugs

store.dispatch(bugAdded({ description: "Bug 1" }));
store.dispatch(bugAdded({ description: "Bug 2" }));
store.dispatch(bugAdded({ description: "Bug 3" }));
store.dispatch(bugResolved({ id: 1 }));

// Projects

store.dispatch(projectAdded({ name: "Project 1" }));

const unresolvedBugs = getUnresolvedCount(store.getState());

console.log("Unresolved bugs:", unresolvedBugs);
