import Query from "./Query.ts";
import { timeSeriesResult } from "./../../types.d.ts";
import * as MOCK_DATA from "./../../data/index.ts";
import { sample } from "./../../utils/_.ts";

export default class FlatLine extends Query {
  startFrom: number;
  seriesName: string;
  constructor(queryString: string) {
    super("timeserie", queryString, { token: "FlatLine" });
    this.startFrom = +(this.queryObjects[0] || "0");
    this.seriesName = this.queryObjects[1] || sample(MOCK_DATA.RANDOM_WORDS);
  }
  toGrafanaSeriesList(startTime: number, endTime: number): timeSeriesResult[] {
    const result: timeSeriesResult[] = [];
    result.push({
      target: this.seriesName,
      datapoints: MOCK_DATA.getRandomWalkDataPoints(
        startTime,
        endTime,
        [this.startFrom],
        [0]
      ),
    });
    return result;
  }
}
