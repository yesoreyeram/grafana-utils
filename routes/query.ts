import { Context } from "./../deps.ts";
import { BANNER } from "./../config/config.ts";
import { queryResult, grafanaQueryTarget } from "./../types.d.ts";
import { getTimeSeriesResults } from "./../app/timeseries.ts";
import { getTableResults } from "./../app/table.ts";
import { getCSVResults } from "./../data/csv.ts";

export async function processData(
  targets: grafanaQueryTarget[],
  startTime: number,
  endTime: number
): Promise<queryResult[]> {
  const promises = targets.map(async (target) => {
    const query = target.target || "";
    if (query.startsWith("CSV(") && query.endsWith(")")) {
      const type = target.type;
      return getCSVResults([], query, { type, startTime, endTime });
    } else if (target.type === "timeserie") {
      return getTimeSeriesResults([], query, { startTime, endTime });
    } else if (target.type === "table") {
      return await getTableResults([], query);
    }
  });
  return await Promise.all(promises).then((res) => res.flat());
}

export const queryRoute = async (ctx: Context) => {
  if (ctx.request.hasBody) {
    const body = await ctx.request.body({ type: "json" }).value;
    const startTime = new Date(body.range.from).getTime();
    const endTime = new Date(body.range.to).getTime();
    const results = await processData(body.targets, startTime, endTime);
    ctx.response.body = results;
  } else {
    ctx.response.status = 404;
    ctx.response.body = `Requested route not found. User POST method instead.\n\n${BANNER}`;
  }
};
