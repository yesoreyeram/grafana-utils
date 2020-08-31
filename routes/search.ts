// deno-lint-ignore-file
import { Context } from "./../deps.ts";
import { BANNER } from "./../config/config.ts";
import * as MOCK_DATA from "./../data/index.ts";
import { processData } from "./query.ts";

export const searchRoute = async (ctx: Context) => {
  if (ctx.request.hasBody) {
    const body = await ctx.request.body({ type: "json" }).value;
    const query = (body.target || "").trim();
    switch (query) {
      case "Servers()":
        ctx.response.body = MOCK_DATA.SERVERS.map((server) => server.name);
        break;
      case "Teams()":
        ctx.response.body = MOCK_DATA.TEAMS.map((server) => server.name);
        break;
      default:
        if (query.startsWith("CSV(") && query.endsWith(")")) {
          let output: any[] = await processData(
            [{
              target: body.target,
              type: "table",
            }],
            body.startTime || new Date().getTime(),
            body.endTime || new Date().getTime(),
          );
          ctx.response.body = output[0].rows.flat();
        } else {
          ctx.response.body = [
            "cpu",
            "memory",
            "RandomWalk()",
            "FlatLine(5)",
            "Step(0,,5)",
            "Pattern(HeartBeat,0,0,0,-3,-2,4,0,0)",
            "Expression(Foo,multiply:0.1,cos,abs,max:0.3)",
            "Expression(Bar,random,multiply:100)",
          ];
        }

        break;
    }
  } else {
    ctx.response.status = 404;
    ctx.response.body =
      `Requested route not found. User POST method instead.\n\n${BANNER}`;
  }
};
