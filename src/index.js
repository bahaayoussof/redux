import configureStore from "./store/store";
// import * as actions from "./store/bugs";
import * as actions from "./store/projects";

const store = configureStore();

store.subscribe(() => {
	console.log("store changed!", store.getState({ trace: true }));
});

// Bugs

// store.dispatch(actions.bugAdded({ description: "Bug 1" }));
// store.dispatch(actions.bugAdded({ description: "Bug 2" }));
// store.dispatch(actions.bugAdded({ description: "Bug 3" }));
// store.dispatch(actions.bugResolved({ id: 1 }));
// store.dispatch(actions.bugRemoved({ id: 1 }));

// Projects

store.dispatch(actions.projectAdded({ name: "Project 1" }));

console.log(store.getState());
