const toast = store => next => action => {
	if (action.type.toLowerCase() === "error") {
		console.log("Toastify:", action.payload.message);
	} else return next(action);
};

export default toast;
