import { addArr, mulArr } from "../../utility/index";

describe("Array Tests", () => {
  it("Check Addition", () => {
    expect(addArr([-1, -2, -3], 3)).toEqual([2, 1, 0]);
  });
  it("Check Multiplication of Numbers", () => {
    expect(mulArr([-1, -2, -3], 5)).toEqual([-5, -10, -15]);
  });
  it("Check Multiplication of Strings", () => {
    expect(mulArr(["a", "b", "c"], 3)).toEqual(["aaa", "bbb", "ccc"]);
  });
});
