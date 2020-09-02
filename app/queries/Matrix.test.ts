import { NAMESPACE } from "./../../config/config.ts";
import { assertEquals } from "./../../test_deps.ts";
import Matrix, { LCD } from "./Matrix.ts";
import { timeSeriesResult } from "./../../types.d.ts";

Deno.test({
  name: `${NAMESPACE}.TimeSeries.Matrix.Basic`,
  fn: () => {
    const query = new Matrix("Matrix(Foo,0,[1,2,3,4,5][1,2,0,4,5][1,2,,4,5])");
    const startTime = new Date("2020-08-31T09:20:00.000Z").getTime();
    const endTime = new Date("2020-08-31T09:30:00.000Z").getTime();
    let series: timeSeriesResult[] = query.toGrafanaSeriesList(
      startTime,
      endTime,
    );
    assertEquals(series.length, 1);
    assertEquals(typeof series[0], "object");
    assertEquals(typeof series[0].target, "string");
    assertEquals(series[0].target, "Foo");
    assertEquals(typeof series[0].datapoints, "object");
    assertEquals(series[0].datapoints.length, 15);
    assertEquals(series[0].datapoints[0].length, 2);
    assertEquals(typeof series[0].datapoints[0][0], "number");
    assertEquals(series[0].datapoints[0][0], 1);
    assertEquals(series[0].datapoints[1][0], 2);
    assertEquals(series[0].datapoints[9][0], 5);
    assertEquals(series[0].datapoints[0][1], 1598865660000);
    assertEquals(series[0].datapoints[9][1], 1598865720000);
  },
});
Deno.test({
  name: `${NAMESPACE}.TimeSeries.Matrix.Offset`,
  fn: () => {
    const query = new Matrix("Matrix(Foo,3,[1,2,3,4,5][1,2,0,4,5][1,2,,4,5])");
    const startTime = new Date("2020-08-31T09:20:00.000Z").getTime();
    const endTime = new Date("2020-08-31T09:30:00.000Z").getTime();
    let series: timeSeriesResult[] = query.toGrafanaSeriesList(
      startTime,
      endTime,
    );
    assertEquals(series.length, 1);
    assertEquals(typeof series[0], "object");
    assertEquals(typeof series[0].target, "string");
    assertEquals(series[0].target, "Foo");
    assertEquals(typeof series[0].datapoints, "object");
    assertEquals(series[0].datapoints.length, 15);
    assertEquals(series[0].datapoints[0].length, 2);
    assertEquals(typeof series[0].datapoints[0][0], "number");
    assertEquals(series[0].datapoints[0][0], 1);
    assertEquals(series[0].datapoints[1][0], 2);
    assertEquals(series[0].datapoints[9][0], 5);
    assertEquals(series[0].datapoints[0][1], 1598865840000);
    assertEquals(series[0].datapoints[9][1], 1598865900000);
  },
});
Deno.test({
  name: `${NAMESPACE}.TimeSeries.LCD.Basic`,
  fn: () => {
    const query = new LCD("LCD(* sriram *)");
    const startTime = new Date("2020-08-31T09:20:00.000Z").getTime();
    const endTime = new Date("2020-08-31T10:30:00.000Z").getTime();
    let series: timeSeriesResult[] = query.toGrafanaSeriesList(
      startTime,
      endTime,
    );
    assertEquals(series.length, 10);
    assertEquals(typeof series[0], "object");
    assertEquals(typeof series[0].target, "string");
    assertEquals(series[0].target, "*");
    assertEquals(series[2].target, "S");
    assertEquals(typeof series[0].datapoints, "object");
    assertEquals(series[0].datapoints.length, 0);
    assertEquals(series[2].datapoints.length, 19);
    assertEquals(series[2].datapoints[0].length, 2);
    assertEquals(typeof series[2].datapoints[0][0], "number");
    assertEquals(series[2].datapoints[0][0], 2);
    assertEquals(series[2].datapoints[1][0], 5);
    assertEquals(series[2].datapoints[9][0], 5);
    assertEquals(series[2].datapoints[0][1], 1598866380000);
    assertEquals(series[2].datapoints[9][1], 1598866500000);
  },
});
