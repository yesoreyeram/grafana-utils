import { NAMESPACE } from "./../../config/config.ts";
import { assertEquals } from "./../../test_deps.ts";
import Maths from "./Maths.ts";
import { timeSeriesResult } from "./../../types.d.ts";

Deno.test({
  name: `${NAMESPACE}.TimeSeries.Maths.Basic`,
  fn: () => {
    const query = new Maths("Maths(Foo,1+(2*$i))");
    const startTime = new Date("2020-08-31T09:20:00.000Z").getTime();
    const endTime = new Date("2020-08-31T09:30:00.000Z").getTime();
    const series: timeSeriesResult[] = query.toGrafanaSeriesList(
      startTime,
      endTime
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
    assertEquals(series[0].datapoints[1][0], 3);
    assertEquals(series[0].datapoints[9][0], 19);
    assertEquals(series[0].datapoints[0][1], 1598865600000);
    assertEquals(series[0].datapoints[9][1], 1598866140000);
  },
});
Deno.test({
  name: `${NAMESPACE}.TimeSeries.Maths.Invalid`,
  fn: () => {
    const query = new Maths("Maths(Foo,1+(2*foo$i))");
    const startTime = new Date("2020-08-31T09:20:00.000Z").getTime();
    const endTime = new Date("2020-08-31T09:30:00.000Z").getTime();
    const series: timeSeriesResult[] = query.toGrafanaSeriesList(
      startTime,
      endTime
    );
    assertEquals(series.length, 1);
    assertEquals(typeof series[0], "object");
    assertEquals(typeof series[0].target, "string");
    assertEquals(series[0].target, "Foo");
    assertEquals(typeof series[0].datapoints, "object");
    assertEquals(series[0].datapoints.length, 10);
    assertEquals(series[0].datapoints[0].length, 2);
    assertEquals(typeof series[0].datapoints[0][0], "object");
    assertEquals(series[0].datapoints[0][0], null);
    assertEquals(series[0].datapoints[1][0], null);
    assertEquals(series[0].datapoints[9][0], null);
    assertEquals(series[0].datapoints[0][1], 1598865600000);
    assertEquals(series[0].datapoints[9][1], 1598866140000);
  },
});
