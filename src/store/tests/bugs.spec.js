import { apiCallBegan } from "../api";
import { addBug } from "../bugs";

describe("bugsSlice", () => {
	describe("action creators", () => {
		it("addBug", () => {
			const bug = { id: 1, description: "a" };
			const result = addBug(bug);
			const expected = {
				type: apiCallBegan.type,
				payload: {
					url: "/bugs",
					method: "post",
					data: bug,
					onSuccess: "bugs/bugAdded",
				},
			};
			expect(result).toEqual(expected);
		});
	});
});
