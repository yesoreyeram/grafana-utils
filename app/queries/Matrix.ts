import Query from "./Query.ts";
import { timeSeriesResult, dataPoint } from "./../../types.d.ts";
import * as MOCK_DATA from "./../../data/index.ts";

export default class Matrix extends Query {
  seriesName: string;
  offset: number;
  matrix: (number | null)[][];
  constructor(queryString: string) {
    super("timeserie", queryString, { token: "Matrix" });
    this.seriesName = this.queryObjects[0];
    this.offset = +(this.queryObjects[1]);
    this.matrix = (this.queryObjects.slice(2)
      .join(",").split("]").map((a) => a.replace("[", "").trim())
      .filter(Boolean)
      .map((a) => a.split(",").map((b) => b ? +b : null)));
  }
  toGrafanaSeriesList(startTime: number, endTime: number): timeSeriesResult[] {
    let result: timeSeriesResult[] = [];
    let datapoints = MOCK_DATA.getRandomWalkDataPoints(startTime, endTime).map(
      (dp, index) => {
        const timestamp = dp[1];
        const actualValue = dp[0];
        return {
          timestamp,
          value: actualValue,
        };
      },
    );
    let newDatapoints = datapoints.map((dp, index) => {
      let ts = dp.timestamp;
      return this.matrix[index - 1]
        ? this.matrix[index - 1].map((a) => {
          return [a, ts] as dataPoint;
        })
        : [];
    });
    if (this.offset > 0) {
      newDatapoints = datapoints.map((dp, index) => {
        if (index < this.offset) {
          return [];
        }
        let ts = dp.timestamp;
        return this.matrix[index - 1 - this.offset]
          ? this.matrix[index - 1 - this.offset].map((a) => {
            return [a, ts] as dataPoint;
          })
          : [];
      });
    }
    result.push({
      target: this.seriesName,
      datapoints: newDatapoints.reduce((a, b) => a.concat(b), []),
    });
    return result;
  }
}
