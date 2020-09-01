import { NAMESPACE } from "./../../config/config.ts";
import { assertEquals } from "./../../test_deps.ts";
import Pattern from "./Pattern.ts";
import { timeSeriesResult } from "./../../types.d.ts";

Deno.test({
  name: `${NAMESPACE}.TimeSeries.Pattern.Basic`,
  fn: () => {
    const query = new Pattern("Pattern(Foo,1,2,3,2)");
    const startTime = new Date("2020-08-31 10:20:00").getTime();
    const endTime = new Date("2020-08-31 10:30:00").getTime();
    let series: timeSeriesResult[] = query.toGrafanaSeriesList(
      startTime,
      endTime,
    );
    assertEquals(series.length, 1);
    assertEquals(typeof series[0], "object");
    assertEquals(typeof series[0].target, "string");
    assertEquals(series[0].target, "Foo");
    assertEquals(typeof series[0].datapoints, "object");
    assertEquals(series[0].datapoints.length, 10);
    assertEquals(series[0].datapoints[0].length, 2);
    assertEquals(typeof series[0].datapoints[0][0], "number");
    assertEquals(series[0].datapoints[0][0], 1);
    assertEquals(series[0].datapoints[1][0], 2);
    assertEquals(series[0].datapoints[9][0], 2);
    assertEquals(series[0].datapoints[0][1], 1598865600000);
    assertEquals(series[0].datapoints[9][1], 1598866140000);
  },
});
