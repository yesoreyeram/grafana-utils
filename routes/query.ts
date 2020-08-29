import { Context } from "./../deps.ts";
import { BANNER } from "./../config/config.ts";
import { queryResult, grafanaQueryTarget } from "./../types.d.ts";
import * as MOCK_DATA from "./../data/index.ts";

export const queryRoute = async (ctx: Context) => {
  if (ctx.request.hasBody) {
    const body = await ctx.request.body({ type: "json" }).value;
    const startTime = new Date(body.range.from).getTime();
    const endTime = new Date(body.range.to).getTime();
    var result: queryResult[] = [];
    body.targets.forEach((target: grafanaQueryTarget) => {
      if (target.type === "timeserie") {
        result.push({
          target: target.target,
          datapoints: MOCK_DATA.getRandomWalkDataPoints(startTime, endTime),
        });
      } else if (target.type === "table") {
        result.push({
          columns: [
            { text: "Server", type: "string" },
            { text: target.target, type: "number" },
          ],
          rows: MOCK_DATA.SERVERS.map((server) => {
            return [server.name, Math.random() * 100];
          }),
        });
      }
    });
    ctx.response.body = result;
  } else {
    ctx.response.status = 404;
    ctx.response.body =
      `Requested route not found. User POST method instead.\n\n${BANNER}`;
  }
};
