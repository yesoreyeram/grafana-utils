import Query from "./Query.ts";
import { timeSeriesResult } from "./../../types.d.ts";
import * as MOCK_DATA from "./../../data/index.ts";
import { sample } from "./../../utils/_.ts";

export default class RandomWalk extends Query {
  count: number;
  seriesName: string;
  constructor(queryString: string) {
    super("timeserie", queryString, { token: "RandomWalk" });
    this.count = +(this.queryObjects[0] || "1");
    this.seriesName = this.queryObjects[1] || "";
  }
  toGrafanaSeriesList(startTime: number, endTime: number): timeSeriesResult[] {
    const result: timeSeriesResult[] = [];
    for (let i = 0; i < this.count; i++) {
      let target = this.seriesName
        ? this.seriesName + ` ${i + 1}`
        : sample(MOCK_DATA.RANDOM_WORDS) || "";
      if (!this.queryObjects[0]) {
        target = this.seriesName;
      }
      result.push({
        target,
        datapoints: MOCK_DATA.getRandomWalkDataPoints(startTime, endTime),
      });
    }
    return result;
  }
}
