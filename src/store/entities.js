import { combineReducers } from "redux";
import bugsReducer from "./bugs";
import projectsReducer from "./projects";

export default combineReducers({
	// reducers
	bugs: bugsReducer,
	projects: projectsReducer,
});
