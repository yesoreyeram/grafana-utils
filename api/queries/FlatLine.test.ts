import { NAMESPACE } from "./../../config/config.ts";
import { assertEquals } from "./../../test_deps.ts";
import FlatLine from "./FlatLine.ts";
import { timeSeriesResult } from "./../../types.d.ts";

Deno.test({
  name: `${NAMESPACE}.TimeSeries.FlatLine.Basic`,
  fn: () => {
    const query = new FlatLine("FlatLine()");
    const startTime = new Date("2020-08-31 10:20:00").getTime();
    const endTime = new Date("2020-08-31 10:30:00").getTime();
    let series: timeSeriesResult[] = query.toGrafanaSeriesList(
      startTime,
      endTime,
    );
    assertEquals(series.length, 1);
    assertEquals(typeof series[0], "object");
    assertEquals(typeof series[0].target, "string");
    assertEquals(typeof series[0].datapoints, "object");
    assertEquals(series[0].datapoints.length, 10);
    assertEquals(series[0].datapoints[0].length, 2);
    assertEquals(typeof series[0].datapoints[0][0], "number");
    assertEquals(series[0].datapoints[0][0], 0);
    assertEquals(series[0].datapoints[0][1], 1598865600000);
    assertEquals(series[0].datapoints[9][1], 1598866140000);
  },
});
Deno.test({
  name: `${NAMESPACE}.TimeSeries.FlatLine.Number`,
  fn: () => {
    const query = new FlatLine("FlatLine(3)");
    const startTime = new Date("2020-08-31 10:20:00").getTime();
    const endTime = new Date("2020-08-31 10:30:00").getTime();
    let series: timeSeriesResult[] = query.toGrafanaSeriesList(
      startTime,
      endTime,
    );
    assertEquals(series.length, 1);
    assertEquals(typeof series[0], "object");
    assertEquals(typeof series[0].target, "string");
    assertEquals(typeof series[0].datapoints, "object");
    assertEquals(series[0].datapoints.length, 10);
    assertEquals(series[0].datapoints[0].length, 2);
    assertEquals(typeof series[0].datapoints[0][0], "number");
    assertEquals(series[0].datapoints[0][0], 3);
    assertEquals(series[0].datapoints[0][1], 1598865600000);
    assertEquals(series[0].datapoints[9][1], 1598866140000);
  },
});
Deno.test({
  name: `${NAMESPACE}.TimeSeries.FlatLine.NamedNumber`,
  fn: () => {
    const query = new FlatLine("FlatLine(7,Rainbow)");
    const startTime = new Date("2020-08-31 10:20:00").getTime();
    const endTime = new Date("2020-08-31 10:30:00").getTime();
    let series: timeSeriesResult[] = query.toGrafanaSeriesList(
      startTime,
      endTime,
    );
    assertEquals(series.length, 1);
    assertEquals(typeof series[0], "object");
    assertEquals(typeof series[0].target, "string");
    assertEquals(series[0].target, "Rainbow");
    assertEquals(typeof series[0].datapoints, "object");
    assertEquals(series[0].datapoints.length, 10);
    assertEquals(series[0].datapoints[0].length, 2);
    assertEquals(typeof series[0].datapoints[0][0], "number");
    assertEquals(series[0].datapoints[0][0], 7);
    assertEquals(series[0].datapoints[0][1], 1598865600000);
    assertEquals(series[0].datapoints[9][1], 1598866140000);
  },
});
