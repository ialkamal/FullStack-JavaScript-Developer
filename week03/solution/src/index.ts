//First try
// export const checkTriangle = (a: number, b: number, c: number): boolean => {
//   if (a > b + c && b > a + c && c > a + b) return true;
//   return false;
// };

export const checkTriangle = (a: number, b: number, c: number): boolean => {
  if (a < b + c && b < a + c && c < a + b) return true;
  return false;
};
