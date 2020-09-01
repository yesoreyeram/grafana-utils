import { NAMESPACE } from "./../../config/config.ts";
import { assertEquals } from "./../../test_deps.ts";
import RandomWalk from "./RandomWalk.ts";
import { timeSeriesResult } from "./../../types.d.ts";

Deno.test({
  name: `${NAMESPACE}.TimeSeries.RandomWalk.Basic`,
  fn: () => {
    const query = new RandomWalk("RandomWalk()");
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
    assertEquals(series[0].datapoints[0][1], 1598865600000);
    assertEquals(series[0].datapoints[9][1], 1598866140000);
  },
});
Deno.test({
  name: `${NAMESPACE}.TimeSeries.RandomWalk.Multi`,
  fn: () => {
    const query = new RandomWalk("RandomWalk(3)");
    const startTime = new Date("2020-08-31 10:20:00").getTime();
    const endTime = new Date("2020-08-31 10:30:00").getTime();
    let series: timeSeriesResult[] = query.toGrafanaSeriesList(
      startTime,
      endTime,
    );
    assertEquals(series.length, 3);
    assertEquals(typeof series[2], "object");
    assertEquals(typeof series[2].target, "string");
    assertEquals(typeof series[2].datapoints, "object");
    assertEquals(series[2].datapoints.length, 10);
    assertEquals(series[2].datapoints[0].length, 2);
    assertEquals(typeof series[2].datapoints[0][0], "number");
    assertEquals(series[2].datapoints[0][1], 1598865600000);
    assertEquals(series[2].datapoints[9][1], 1598866140000);
  },
});
Deno.test({
  name: `${NAMESPACE}.TimeSeries.RandomWalk.MultiNamed`,
  fn: () => {
    const query = new RandomWalk("RandomWalk(3,Server)");
    const startTime = new Date("2020-08-31 10:20:00").getTime();
    const endTime = new Date("2020-08-31 10:30:00").getTime();
    let series: timeSeriesResult[] = query.toGrafanaSeriesList(
      startTime,
      endTime,
    );
    assertEquals(series.length, 3);
    assertEquals(typeof series[2], "object");
    assertEquals(typeof series[2].target, "string");
    assertEquals(series[2].target, "Server 3");
    assertEquals(typeof series[2].datapoints, "object");
    assertEquals(series[2].datapoints.length, 10);
    assertEquals(series[2].datapoints[0].length, 2);
    assertEquals(typeof series[2].datapoints[0][0], "number");
    assertEquals(series[2].datapoints[0][1], 1598865600000);
    assertEquals(series[2].datapoints[9][1], 1598866140000);
  },
});
Deno.test({
  name: `${NAMESPACE}.TimeSeries.RandomWalk.SingleNamed`,
  fn: () => {
    const query = new RandomWalk("RandomWalk(,Server)");
    const startTime = new Date("2020-08-31 10:20:00").getTime();
    const endTime = new Date("2020-08-31 10:30:00").getTime();
    let series: timeSeriesResult[] = query.toGrafanaSeriesList(
      startTime,
      endTime,
    );
    assertEquals(series.length, 1);
    assertEquals(typeof series[0], "object");
    assertEquals(typeof series[0].target, "string");
    assertEquals(series[0].target, "Server");
    assertEquals(typeof series[0].datapoints, "object");
    assertEquals(series[0].datapoints.length, 10);
    assertEquals(series[0].datapoints[0].length, 2);
    assertEquals(typeof series[0].datapoints[0][0], "number");
    assertEquals(series[0].datapoints[0][1], 1598865600000);
    assertEquals(series[0].datapoints[9][1], 1598866140000);
  },
});
Deno.test({
  name: `${NAMESPACE}.TimeSeries.RandomWalk.NotANumber`,
  fn: () => {
    const query = new RandomWalk("RandomWalk(Server)");
    const startTime = new Date("2020-08-31 10:20:00").getTime();
    const endTime = new Date("2020-08-31 10:30:00").getTime();
    let series: timeSeriesResult[] = query.toGrafanaSeriesList(
      startTime,
      endTime,
    );
    assertEquals(series.length, 0);
  },
});
