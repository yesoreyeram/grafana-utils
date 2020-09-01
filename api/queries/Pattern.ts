import Query from "./Query.ts";
import { timeSeriesResult } from "./../../types.d.ts";
import * as MOCK_DATA from "./../../data/index.ts";
import { sample } from "./../../utils/_.ts";

export default class Pattern extends Query {
  seriesName: string;
  steps: number[];
  constructor(queryString: string) {
    super("timeserie", queryString, { token: "Pattern" });
    this.seriesName = this.queryObjects[0] || sample(MOCK_DATA.RANDOM_WORDS);
    this.steps = this.queryObjects.splice(1).map((item) => +item).filter((
      item,
    ) => !isNaN(item));
    if (this.steps.length === 0) {
      this.steps = [0];
    }
  }
  toGrafanaSeriesList(startTime: number, endTime: number): timeSeriesResult[] {
    let result: timeSeriesResult[] = [];
    result.push({
      target: this.seriesName,
      datapoints: MOCK_DATA.getRandomWalkDataPoints(
        startTime,
        endTime,
        [0],
        [0],
      ).map((item, index) => {
        return [this.steps[index % this.steps.length], item[1]];
      }),
    });
    return result;
  }
}
export class Patterns extends Query {
  private patterns: Pattern[];
  constructor(queryString: string) {
    super("timeserie", queryString, { token: "Patterns" });
    this.patterns = this.query.split("]").map((a) => a.replace("[", "")).filter(
      Boolean,
    ).map((a) => `Pattern(${a})`).map((a) => new Pattern(a));
  }
  toGrafanaSeriesList(startTime: number, endTime: number): timeSeriesResult[] {
    let result: timeSeriesResult[] = [];
    this.patterns.forEach((pattern) => {
      result.push({
        target: pattern.seriesName,
        datapoints: MOCK_DATA.getRandomWalkDataPoints(
          startTime,
          endTime,
          [0],
          [0],
        ).map((item, index) => {
          return [pattern.steps[index % pattern.steps.length], item[1]];
        }),
      });
    });
    return result;
  }
}
