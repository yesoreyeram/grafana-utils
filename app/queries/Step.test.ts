import { NAMESPACE } from "./../../config/config.ts";
import { assertEquals } from "./../../test_deps.ts";
import Step from "./Step.ts";
import { timeSeriesResult } from "./../../types.d.ts";

Deno.test({
  name: `${NAMESPACE}.TimeSeries.Step.Basic`,
  fn: () => {
    const query = new Step("Step()");
    const startTime = new Date("2020-08-31T09:20:00.000Z").getTime();
    const endTime = new Date("2020-08-31T09:30:00.000Z").getTime();
    const series: timeSeriesResult[] = query.toGrafanaSeriesList(
      startTime,
      endTime
    );
    assertEquals(series.length, 1);
    assertEquals(typeof series[0], "object");
    assertEquals(typeof series[0].target, "string");
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
  name: `${NAMESPACE}.TimeSeries.Step.Number`,
  fn: () => {
    const query = new Step("Step(7)");
    const startTime = new Date("2020-08-31T09:20:00.000Z").getTime();
    const endTime = new Date("2020-08-31T09:30:00.000Z").getTime();
    const series: timeSeriesResult[] = query.toGrafanaSeriesList(
      startTime,
      endTime
    );
    assertEquals(series.length, 1);
    assertEquals(typeof series[0], "object");
    assertEquals(typeof series[0].target, "string");
    assertEquals(typeof series[0].datapoints, "object");
    assertEquals(series[0].datapoints.length, 10);
    assertEquals(series[0].datapoints[0].length, 2);
    assertEquals(typeof series[0].datapoints[0][0], "number");
    assertEquals(series[0].datapoints[0][0], 7);
    assertEquals(series[0].datapoints[9][0], 16);
    assertEquals(series[0].datapoints[0][1], 1598865600000);
    assertEquals(series[0].datapoints[9][1], 1598866140000);
  },
});
Deno.test({
  name: `${NAMESPACE}.TimeSeries.Step.NumberNamed`,
  fn: () => {
    const query = new Step("Step(7,Rainbow )");
    const startTime = new Date("2020-08-31T09:20:00.000Z").getTime();
    const endTime = new Date("2020-08-31T09:30:00.000Z").getTime();
    const series: timeSeriesResult[] = query.toGrafanaSeriesList(
      startTime,
      endTime
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
    assertEquals(series[0].datapoints[9][0], 16);
    assertEquals(series[0].datapoints[0][1], 1598865600000);
    assertEquals(series[0].datapoints[9][1], 1598866140000);
  },
});
Deno.test({
  name: `${NAMESPACE}.TimeSeries.Step.NumberNamedStep`,
  fn: () => {
    const query = new Step("Step(5,Rainbow,10)");
    const startTime = new Date("2020-08-31T09:20:00.000Z").getTime();
    const endTime = new Date("2020-08-31T09:30:00.000Z").getTime();
    const series: timeSeriesResult[] = query.toGrafanaSeriesList(
      startTime,
      endTime
    );
    assertEquals(series.length, 1);
    assertEquals(typeof series[0], "object");
    assertEquals(typeof series[0].target, "string");
    assertEquals(series[0].target, "Rainbow");
    assertEquals(typeof series[0].datapoints, "object");
    assertEquals(series[0].datapoints.length, 10);
    assertEquals(series[0].datapoints[0].length, 2);
    assertEquals(typeof series[0].datapoints[0][0], "number");
    assertEquals(series[0].datapoints[0][0], 5);
    assertEquals(series[0].datapoints[9][0], 95);
    assertEquals(series[0].datapoints[0][1], 1598865600000);
    assertEquals(series[0].datapoints[9][1], 1598866140000);
  },
});
