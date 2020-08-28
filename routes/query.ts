import { Context } from "./../deps.ts";
import { BANNER } from "./../config.ts";
import { queryResult, dataPoint, grafanaQueryTarget } from "./../types.d.ts";

export const queryRoute = async (ctx: Context) => {
  if (ctx.request.hasBody) {
    const body = await ctx.request.body({ type: "json" }).value;
    const startTime = new Date(body.range.from).getTime();
    const endTime = new Date(body.range.to).getTime();
    var result: queryResult[] = [];
    body.targets.forEach((target: grafanaQueryTarget) => {
      if (target.type === "timeserie") {
        let dataPointTime = startTime;
        const datapoints: dataPoint[] = [];
        let value = ([0, 20, 50, 70][Math.floor(Math.random() * 4)]);
        while (dataPointTime < endTime) {
          value += ([-1, 0, 1][Math.floor(Math.random() * 3)]);
          datapoints.push([
            value,
            startTime + (datapoints.length * 60 * 1000),
          ]);
          dataPointTime = dataPointTime + (60 * 1000);
        }
        result.push({
          target: target.target,
          datapoints,
        });
      } else if (target.type === "table") {
        result.push({
          columns: [
            { text: "Server", type: "string" },
            { text: target.target, type: "number" },
          ],
          rows: [
            ["Server 1", Math.random() * 100],
            ["Server 2", Math.random() * 100],
            ["Server 3", Math.random() * 100],
          ],
        });
      }
    });
    ctx.response.body = result;
  } else {
    ctx.response.status = 404;
    ctx.response.body = `Requested route not found.\n\n${BANNER}`;
  }
};
