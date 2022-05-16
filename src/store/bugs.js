// Action types
const BUG_ADDED = "bugAdded";
const BUG_REMOVE = "bugRemoved";
const BUG_RESOLVED = "bugResolved";

// Action creators

export const bugAdded = bugName => {
	return {
		type: BUG_ADDED,
		payload: {
			description: bugName,
		},
	};
};

export const bugResolved = id => {
	return {
		type: BUG_RESOLVED,
		payload: {
			id,
		},
	};
};

// Reducer

let lastId = 0;
export default function reducer(state = [], action) {
	if (action.type === BUG_ADDED) {
		return [
			...state,
			{
				id: ++lastId,
				description: action.payload.description,
				resolved: false,
			},
		];
	}

	if (action.type === BUG_REMOVE) {
		return state.filter(bug => bug.id !== action.payload.id);
	}

	if (action.type === BUG_RESOLVED) {
		return state.map(bug => (bug.id !== action.payload.id ? bug : { ...bug, resolved: true }));
	}

	return state;
}
