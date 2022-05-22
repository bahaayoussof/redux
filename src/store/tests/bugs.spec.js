import { apiCallBegan } from "../api";

import { addBug } from "../bugs";
import configureStore from "../configureStore";

import axios from "axios";
import MockAdapter from "axios-mock-adapter";

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
	let store;
	let fakeAxios;

	beforeEach(() => {
		store = configureStore();
		fakeAxios = new MockAdapter(axios);
	});

	const bugsSlice = () => store.getState().entities.bugs;

	it("should add the bug to the store if it's saved to the server", async () => {
		const bug = { description: "a" };
		const savedBug = { ...bug, id: 1 };
		fakeAxios.onPost("/bugs").reply(200, savedBug);

		await store.dispatch(addBug(bug));

		expect(bugsSlice().list).toContainEqual(savedBug);
	});

	it("should not add the bug to the store if it's not saved to the server", async () => {
		const bug = { description: "a" };
		const savedBug = { ...bug, id: 1 };
		fakeAxios.onPost("/bugs").reply(500);

		await store.dispatch(addBug(bug));

		expect(bugsSlice().list).toHaveLength(0);
	});
});
