import { queryResult } from "./../types.d.ts";
import * as MOCK_DATA from "./../data/index.ts";

interface getTimeSeriesResultsOptions {
  startTime: number;
  endTime: number;
}

export const getTimeSeriesResults = (
  result: queryResult[],
  query: string,
  options: getTimeSeriesResultsOptions,
) => {
  if (query.startsWith("RandomWalk(") && query.endsWith(")")) {
    const count =
      (+(query.replace("RandomWalk(", "").replace(")", "")).split(",")[0]) || 1;
    const seriesName =
      (query.replace("RandomWalk(", "").replace(")", "")).split(",")[1];
    for (let i = 0; i < count; i++) {
      result.push({
        target: seriesName
          ? (seriesName + ` ${i + 1}`)
          : MOCK_DATA.getRandomElementFromStringArray(MOCK_DATA.RANDOM_WORDS),
        datapoints: MOCK_DATA.getRandomWalkDataPoints(
          options.startTime,
          options.endTime,
        ),
      });
    }
  } else if (query.startsWith("FlatLine(") && query.endsWith(")")) {
    const startFrom =
      (+(query.replace("FlatLine(", "").replace(")", "")).split(",")[0]) || 0;
    const seriesName =
      (query.replace("FlatLine(", "").replace(")", "")).split(",")[1] ||
      MOCK_DATA.getRandomElementFromStringArray(MOCK_DATA.RANDOM_WORDS);
    result.push({
      target: seriesName,
      datapoints: MOCK_DATA.getRandomWalkDataPoints(
        options.startTime,
        options.endTime,
        [startFrom],
        [0],
      ),
    });
  } else {
    result.push({
      target: query,
      datapoints: MOCK_DATA.getRandomWalkDataPoints(
        options.startTime,
        options.endTime,
      ),
    });
  }
  return result;
};
