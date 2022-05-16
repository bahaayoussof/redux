import configureStore from "./store/store";
import * as actions from "./store/bugs";

const store = configureStore();

store.subscribe(() => {
	console.log("store changed!", store.getState({ trace: true }));
});

store.dispatch(actions.bugAdded("Bug 1"));
store.dispatch(actions.bugAdded("Bug 2"));
store.dispatch(actions.bugAdded("Bug 3"));
store.dispatch(actions.bugResolved(1));

console.log(store.getState());
