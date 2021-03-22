import { NAMESPACE } from "./../../config/config.ts";
import { assertEquals } from "./../../test_deps.ts";
import Distribute from "./Distribute.ts";
import { timeSeriesResult } from "./../../types.d.ts";

Deno.test({
  name: `${NAMESPACE}.TimeSeries.Distribute.Basic`,
  fn: () => {
    const query = new Distribute("Distribute(300,A,B,C)");
    const startTime = new Date("2020-08-31T09:20:00.000Z").getTime();
    const endTime = new Date("2020-08-31T09:30:00.000Z").getTime();
    const series: timeSeriesResult[] = query.toGrafanaSeriesList(
      startTime,
      endTime
    );
    assertEquals(series.length, 3);
    assertEquals(typeof series[0], "object");
    assertEquals(typeof series[0].target, "string");
    assertEquals(typeof series[0].datapoints, "object");
    assertEquals(series[0].datapoints.length, 10);
    assertEquals(series[0].datapoints[0].length, 2);
    assertEquals(typeof series[0].datapoints[0][0], "number");
    assertEquals(series[0].datapoints[0][0], 100);
    assertEquals(series[1].datapoints[0][0], 100);
    assertEquals(series[2].datapoints[0][0], 100);
    assertEquals(series[0].datapoints[0][1], 1598865600000);
    assertEquals(series[0].datapoints[9][1], 1598866140000);
    assertEquals(series[2].datapoints[0][1], 1598865600000);
    assertEquals(series[2].datapoints[9][1], 1598866140000);
  },
});
