export const addArr = (arg1: number[], arg2: number) =>
  arg1.map((item) => item + arg2);

export const mulArr = (arg1: number[] | string[], arg2: number) => {
  if (!arg1.length) return [];

  if (typeof arg1[0] === "number") {
    return (arg1 as number[]).map((item) => item * arg2);
  } else {
    return (arg1 as string[]).map((item) => item.repeat(arg2));
  }
};
