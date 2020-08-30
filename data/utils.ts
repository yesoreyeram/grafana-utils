import { dataPoint } from "./../types.d.ts";

export const getRandomElementFromNumberArray = (array: number[]): number => {
  return array[Math.floor(Math.random() * array.length)];
};

export const getRandomElementFromStringArray = (array: string[]): string => {
  return array[Math.floor(Math.random() * array.length)];
};

export const getRandomWalkDataPoints = (
  startTime: number,
  endTime: number,
  startFrom: number[] = [0, 20, 50, 70],
  steps: number[] = [-1, 0, 1],
) => {
  const datapoints: dataPoint[] = [];
  let dataPointTime = startTime;
  let value = getRandomElementFromNumberArray(startFrom);
  while (dataPointTime < endTime) {
    value += getRandomElementFromNumberArray(steps);
    datapoints.push([
      value,
      startTime + (datapoints.length * 60 * 1000),
    ]);
    dataPointTime = dataPointTime + (60 * 1000);
  }
  return datapoints;
};
