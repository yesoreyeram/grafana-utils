import Query from "./Query.ts";
import { timeSeriesResult } from "./../../types.d.ts";
import * as MOCK_DATA from "./../../data/index.ts";
import { sample } from "./../../utils/_.ts";
import { math } from "./../../deps.ts";

export default class Maths extends Query {
  seriesName: string;
  query: string;
  constructor(queryString: string) {
    super("timeserie", queryString, { token: "Maths" });
    this.seriesName = this.queryObjects[0] || sample(MOCK_DATA.RANDOM_WORDS);
    this.query = this.queryObjects.slice(1).join(",");
  }
  toGrafanaSeriesList(startTime: number, endTime: number): timeSeriesResult[] {
    const result: timeSeriesResult[] = [];
    result.push({
      target: this.seriesName,
      datapoints: MOCK_DATA.getRandomWalkDataPoints(
        startTime,
        endTime,
        [0],
        [0]
      ).map((item, index) => {
        const query = this.query;
        let value = null;
        try {
          value = math.evaluate(query, {
            $i: index,
          });
        } catch (ex) {
          return [null, item[1]];
        }
        if (!isNaN(value)) {
          return [value, item[1]];
        } else {
          return [null, item[1]];
        }
      }),
    });
    return result;
  }
}
