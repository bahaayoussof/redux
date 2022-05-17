import configureStore from "./store/configureStore";
import {
	bugAdded,
	bugRemoved,
	bugResolved,
	getUnresolvedBugs,
	bugAssignedToUser,
	getBugByUser,
} from "./store/bugs";
import { projectAdded } from "./store/projects";
import { userAdded, assignBug } from "./store/users";

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

// Users
store.dispatch(userAdded({ name: "User 1" }));
store.dispatch(userAdded({ name: "User 2" }));

store.dispatch(bugAssignedToUser({ bugId: 1, userId: 1 }));
store.dispatch(bugAssignedToUser({ bugId: 2, userId: 2 }));
store.dispatch(bugAssignedToUser({ bugId: 3, userId: 2 }));

const bugsByUser = getBugByUser(2)(store.getState());
console.log("bugsByUser", bugsByUser);
