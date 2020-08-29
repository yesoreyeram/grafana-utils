import { dataPoint } from "./../types.d.ts";

export const getRandomElementFromNumberArray = (array: number[]): number => {
  return array[Math.floor(Math.random() * array.length)];
};

export const getRandomWalkDataPoints = (startTime: number, endTime: number) => {
  const datapoints: dataPoint[] = [];
  let dataPointTime = startTime;
  let value = getRandomElementFromNumberArray([0, 20, 50, 70]);
  while (dataPointTime < endTime) {
    value += getRandomElementFromNumberArray([-1, 0, 1]);
    datapoints.push([
      value,
      startTime + (datapoints.length * 60 * 1000),
    ]);
    dataPointTime = dataPointTime + (60 * 1000);
  }
  return datapoints;
};
