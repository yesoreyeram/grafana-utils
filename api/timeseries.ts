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
  } else if (query.startsWith("Step(") && query.endsWith(")")) {
    const startFrom =
      (+(query.replace("Step(", "").replace(")", "")).split(",")[0]) || 0;
    const seriesName =
      (query.replace("Step(", "").replace(")", "")).split(",")[1] ||
      MOCK_DATA.getRandomElementFromStringArray(MOCK_DATA.RANDOM_WORDS);
    const stepCount =
      (+(query.replace("Step(", "").replace(")", "")).split(",")[2]) || 1;
    result.push({
      target: seriesName,
      datapoints: MOCK_DATA.getRandomWalkDataPoints(
        options.startTime,
        options.endTime,
        [startFrom],
        [stepCount],
      ),
    });
  } else if (query.startsWith("Pattern(") && query.endsWith(")")) {
    const seriesName =
      (query.replace("Pattern(", "").replace(")", "")).split(",")[0] ||
      MOCK_DATA.getRandomElementFromStringArray(MOCK_DATA.RANDOM_WORDS);
    let steps = query.replace("Pattern(", "").replace(")", "").split(",").map(
      (a) => a.trim(),
    ).filter((value, index) => index > 0).map((item) => +item).filter((item) =>
      !isNaN(item)
    );
    if (steps.length === 0) steps = [0];
    result.push({
      target: seriesName,
      datapoints: MOCK_DATA.getRandomWalkDataPoints(
        options.startTime,
        options.endTime,
        [0],
        [0],
      ).map((item, index) => {
        return [steps[index % steps.length], item[1]];
      }),
    });
  } else if (query.startsWith("Distribute(") && query.endsWith(")")) {
    const TotalValue =
      (+(query.replace("Distribute(", "").replace(")", "")).split(",")[0]) ||
      100;
    const seriesNames = (query.replace("Distribute(", "").replace(")", ""))
      .split(",").filter((value, index) => index > 0);
    const startValue = Math.round(TotalValue / (seriesNames.length));
    seriesNames.forEach((seriesName: string) => {
      result.push({
        target: seriesName,
        datapoints: MOCK_DATA.getRandomWalkDataPoints(
          options.startTime,
          options.endTime,
          [startValue],
          [-3, -2, -1, 0, 1, 2, 3],
        ),
      });
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
