import { apiCallBegan } from "../api";

import { addBug } from "../bugs";
import configureStore from "../configureStore";

// Solitary test

// describe("bugsSlice", () => {
// 	describe("action creators", () => {
// 		it("addBug", () => {
// 			const bug = { id: 1, description: "a" };
// 			const result = addBug(bug);
// 			const expected = {
// 				type: apiCallBegan.type,
// 				payload: {
// 					url: "/bugs",
// 					method: "post",
// 					data: bug,
// 					onSuccess: "bugs/bugAdded",
// 				},
// 			};
// 			expect(result).toEqual(expected);
// 		});
// 	});
// });

// Social test

describe("bugsSlice", () => {
	it("should handle the addBug action", async () => {
		const store = configureStore();
		const bug = { description: "a" };
		await store.dispatch(addBug(bug));
		expect(store.getState().entities.bugs.list).toHaveLength(1);
	});
});
