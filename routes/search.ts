import { Context } from "./../deps.ts";
import { BANNER } from "./../config.ts";
import * as MOCK_DATA from "./../data.ts";

export const searchRoute = async (ctx: Context) => {
  if (ctx.request.hasBody) {
    const body = await ctx.request.body({ type: "json" }).value;
    switch (body.target) {
      case "Servers()":
        ctx.response.body = MOCK_DATA.SERVERS.map((server) => server.name);
        break;
      case "Teams()":
        ctx.response.body = MOCK_DATA.TEAMS.map((server) => server.name);
        break;
      default:
        ctx.response.body = ["cpu", "memory"];
        break;
    }
  } else {
    ctx.response.status = 404;
    ctx.response.body = `Requested route not found.\n\n${BANNER}`;
  }
};
