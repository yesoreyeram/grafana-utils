import { dataPoint } from "./../types.d.ts";

export const getRandomElementFromNumberArray = (array: number[]): number => {
  return array[Math.floor(Math.random() * array.length)];
};

export const getRandomElementFromStringArray = (array: string[]): string => {
  return array[Math.floor(Math.random() * array.length)];
};

const getStepFromRange = (startTime: number, endTime: number): number => {
  const MINUTE = 60 * 1000;
  const HOUR = 60 * MINUTE;
  const DAY = 24 * HOUR;
  const WEEK = 7 * DAY;
  const MONTH = 30 * DAY;
  let range = endTime - startTime;
  let step = MINUTE;
  if (range > 13 * MONTH) {
    step = WEEK;
  } else if (range > 40 * DAY) {
    step = DAY;
  } else if (range > 2 * DAY) {
    step = HOUR;
  } else {
    step = MINUTE;
  }
  return step;
};

export const getRandomWalkDataPoints = (
  startTime: number,
  endTime: number,
  startFrom: number[] = [0, 20, 50, 70],
  steps: number[] = [-1, 0, 1],
) => {
  let step = getStepFromRange(startTime, endTime);
  const datapoints: dataPoint[] = [];
  let dataPointTime = startTime;
  let value = getRandomElementFromNumberArray(startFrom);
  while (dataPointTime < endTime) {
    value += getRandomElementFromNumberArray(steps);
    datapoints.push([
      value,
      startTime + (datapoints.length * step),
    ]);
    dataPointTime = dataPointTime + step;
  }
  return datapoints;
};
