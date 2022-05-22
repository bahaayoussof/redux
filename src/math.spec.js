import { isEven } from "./math";

describe("isEven", () => {
	it("should return true if the number is even", () => {
		expect(isEven(2)).toEqual(true);
	});

	it("should return false if the number is odd", () => {
		expect(isEven(3)).toEqual(false);
	});
});
