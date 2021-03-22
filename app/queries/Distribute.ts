import Query from "./Query.ts";
import { timeSeriesResult } from "./../../types.d.ts";
import * as MOCK_DATA from "./../../data/index.ts";

export default class Distribute extends Query {
  TotalValue: number;
  seriesNames: string[];
  constructor(queryString: string) {
    super("timeserie", queryString, { token: "Distribute" });
    this.TotalValue = +(this.queryObjects[0] || "100");
    this.seriesNames = this.queryObjects.slice(1);
  }
  toGrafanaSeriesList(startTime: number, endTime: number): timeSeriesResult[] {
    const result: timeSeriesResult[] = [];
    const startValue = Math.round(this.TotalValue / this.seriesNames.length);
    this.seriesNames.forEach((seriesName: string) => {
      result.push({
        target: seriesName,
        datapoints: MOCK_DATA.getRandomWalkDataPoints(
          startTime,
          endTime,
          [startValue],
          [-3, -2, -1, 0, 1, 2, 3]
        ),
      });
    });
    return result;
  }
}
