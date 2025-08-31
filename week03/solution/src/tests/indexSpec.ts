import { checkTriangle } from "../index";

/*
I generated the tests using AI to handle most cases.
*/

describe("Triangle Tests", () => {
  // Test with negative values
  it("should return false for negative lengths", () => {
    expect(checkTriangle(-1, -2, -3)).toBeFalse();
    expect(checkTriangle(-1, 2, 3)).toBeFalse();
    expect(checkTriangle(1, -2, 3)).toBeFalse();
    expect(checkTriangle(1, 2, -3)).toBeFalse();
  });

  // Test with zero values
  it("should return false for zero lengths", () => {
    expect(checkTriangle(0, 0, 0)).toBeFalse();
    expect(checkTriangle(0, 1, 1)).toBeFalse();
    expect(checkTriangle(1, 0, 1)).toBeFalse();
    expect(checkTriangle(1, 1, 0)).toBeFalse();
  });

  // Test valid triangles (equilateral)
  it("should return true for equilateral triangles", () => {
    expect(checkTriangle(3, 3, 3)).toBeTrue();
    expect(checkTriangle(5, 5, 5)).toBeTrue();
    expect(checkTriangle(10, 10, 10)).toBeTrue();
  });

  // Test valid triangles (isosceles)
  it("should return true for isosceles triangles", () => {
    expect(checkTriangle(3, 3, 4)).toBeTrue();
    expect(checkTriangle(5, 4, 5)).toBeTrue();
    expect(checkTriangle(4, 5, 5)).toBeTrue();
  });

  // Test valid triangles (scalene)
  it("should return true for scalene triangles", () => {
    expect(checkTriangle(3, 4, 5)).toBeTrue();
    expect(checkTriangle(6, 8, 10)).toBeTrue();
    expect(checkTriangle(5, 12, 13)).toBeTrue();
  });

  // Test invalid triangles (triangle inequality violation)
  it("should return false when one side is too long", () => {
    expect(checkTriangle(1, 1, 3)).toBeFalse(); // 1 + 1 = 2 < 3
    expect(checkTriangle(1, 3, 1)).toBeFalse(); // 1 + 1 = 2 < 3
    expect(checkTriangle(3, 1, 1)).toBeFalse(); // 1 + 1 = 2 < 3
    expect(checkTriangle(1, 2, 4)).toBeFalse(); // 1 + 2 = 3 < 4
  });

  // Test edge cases (degenerate triangles)
  it("should return false for degenerate triangles", () => {
    expect(checkTriangle(1, 1, 2)).toBeFalse(); // 1 + 1 = 2 (collinear)
    expect(checkTriangle(2, 1, 1)).toBeFalse(); // 1 + 1 = 2 (collinear)
    expect(checkTriangle(1, 2, 1)).toBeFalse(); // 1 + 1 = 2 (collinear)
    expect(checkTriangle(5, 3, 2)).toBeFalse(); // 3 + 2 = 5 (collinear)
  });

  // Test with decimal values
  it("should work with decimal values", () => {
    expect(checkTriangle(1.5, 2.5, 3.0)).toBeTrue();
    expect(checkTriangle(0.5, 0.5, 1.0)).toBeFalse(); // degenerate
    expect(checkTriangle(1.1, 1.1, 2.5)).toBeFalse(); // too long
  });

  // Test with very small values
  it("should work with very small positive values", () => {
    expect(checkTriangle(0.1, 0.1, 0.1)).toBeTrue();
    expect(checkTriangle(0.001, 0.001, 0.002)).toBeFalse(); // degenerate
  });

  // Test with large values
  it("should work with large values", () => {
    expect(checkTriangle(100, 100, 100)).toBeTrue();
    expect(checkTriangle(1000, 1000, 1999)).toBeTrue();
    expect(checkTriangle(1000, 1000, 2001)).toBeFalse(); // too long
  });
});
