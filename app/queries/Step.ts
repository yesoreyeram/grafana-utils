import Query from "./Query.ts";
import { timeSeriesResult } from "./../../types.d.ts";
import * as MOCK_DATA from "./../../data/index.ts";
import { sample } from "./../../utils/_.ts";

export default class Step extends Query {
  stepCount: number;
  startFrom: number;
  seriesName: string;
  constructor(queryString: string) {
    super("timeserie", queryString, { token: "Step" });
    this.stepCount = +(this.queryObjects[2] || "1");
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
        [this.stepCount]
      ),
    });
    return result;
  }
}
