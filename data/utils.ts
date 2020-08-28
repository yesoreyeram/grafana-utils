import { dataPoint } from "./../types.d.ts";

export const getRandomWalkDataPoints = (startTime: number, endTime: number) => {
  const datapoints: dataPoint[] = [];
  let dataPointTime = startTime;
  let value = ([0, 20, 50, 70][Math.floor(Math.random() * 4)]);
  while (dataPointTime < endTime) {
    value += ([-1, 0, 1][Math.floor(Math.random() * 3)]);
    datapoints.push([
      value,
      startTime + (datapoints.length * 60 * 1000),
    ]);
    dataPointTime = dataPointTime + (60 * 1000);
  }
  return datapoints;
};
