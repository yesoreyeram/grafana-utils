// deno-lint-ignore-file
export const chunk = (input: any[], size: number) => {
  return input.reduce((arr, item, idx) => {
    return idx % size === 0
      ? [...arr, [item]]
      : [...arr.slice(0, -1), [...arr.slice(-1)[0], item]];
  }, []);
};
export const sample = (arr: any[]) => {
  const len = arr == null ? 0 : arr.length;
  return len ? arr[Math.floor(Math.random() * len)] : undefined;
};
