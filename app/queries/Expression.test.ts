import { NAMESPACE } from "./../../config/config.ts";
import { assertEquals } from "./../../test_deps.ts";
import Expression from "./Expression.ts";
import { timeSeriesResult } from "./../../types.d.ts";

Deno.test({
  name: `${NAMESPACE}.TimeSeries.Expression.Basic`,
  fn: () => {
    const query = new Expression("Expression(Foo)");
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
    assertEquals(series[0].datapoints[0][0], 0);
    assertEquals(series[0].datapoints[9][0], 9);
    assertEquals(series[0].datapoints[0][1], 1598865600000);
    assertEquals(series[0].datapoints[9][1], 1598866140000);
  },
});
Deno.test({
  name: `${NAMESPACE}.TimeSeries.Expression.Single`,
  fn: () => {
    const query = new Expression("Expression(Foo,multiply:0.1)");
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
    assertEquals(series[0].datapoints[0][0], 0);
    assertEquals(series[0].datapoints[9][0], 0.9);
    assertEquals(series[0].datapoints[0][1], 1598865600000);
    assertEquals(series[0].datapoints[9][1], 1598866140000);
  },
});
Deno.test({
  name: `${NAMESPACE}.TimeSeries.Expression.Multiple`,
  fn: () => {
    const query = new Expression("Expression(Foo,multiply:0.15,add:2.3)");
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
    assertEquals(series[0].datapoints[0][0], 2.3);
    assertEquals(series[0].datapoints[9][0], 3.6499999999999995);
    assertEquals(series[0].datapoints[0][1], 1598865600000);
    assertEquals(series[0].datapoints[9][1], 1598866140000);
  },
});
Deno.test({
  name: `${NAMESPACE}.TimeSeries.Expression.StopAfter`,
  fn: () => {
    const query = new Expression(
      "Expression(Foo,multiply:0.15,add:2.3,stop-after:3)"
    );
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
    assertEquals(series[0].datapoints[0][0], 2.3);
    assertEquals(series[0].datapoints[9][0], null);
    assertEquals(series[0].datapoints.filter((d) => d[0] !== null).length, 3);
    assertEquals(series[0].datapoints[0][1], 1598865600000);
    assertEquals(series[0].datapoints[9][1], 1598866140000);
  },
});
Deno.test({
  name: `${NAMESPACE}.TimeSeries.Expression.StartAfter`,
  fn: () => {
    const query = new Expression(
      "Expression(Foo,multiply:0.15,add:2.3,start-after:3)"
    );
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
    assertEquals(typeof series[0].datapoints[3][0], "number");
    assertEquals(series[0].datapoints[0][0], null);
    assertEquals(series[0].datapoints[9][0], 3.6499999999999995);
    assertEquals(series[0].datapoints.filter((d) => d[0] !== null).length, 7);
    assertEquals(series[0].datapoints[0][1], 1598865600000);
    assertEquals(series[0].datapoints[9][1], 1598866140000);
  },
});
Deno.test({
  name: `${NAMESPACE}.TimeSeries.Expression.StartAndStop`,
  fn: () => {
    const query = new Expression(
      "Expression(Foo,multiply:0.15,add:2.3,start-after:3,stop-after:5)"
    );
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
    assertEquals(typeof series[0].datapoints[3][0], "number");
    assertEquals(typeof series[0].datapoints[9][0], "object");
    assertEquals(series[0].datapoints[0][0], null);
    assertEquals(series[0].datapoints[4][0], 2.9);
    assertEquals(series[0].datapoints[9][0], null);
    assertEquals(series[0].datapoints.filter((d) => d[0] !== null).length, 2);
    assertEquals(series[0].datapoints[0][1], 1598865600000);
    assertEquals(series[0].datapoints[9][1], 1598866140000);
  },
});
