import { Context } from "./../deps.ts";
import { BANNER } from "./../config.ts";

export const searchRoute = async (ctx: Context) => {
  if (ctx.request.hasBody) {
    const body = await ctx.request.body({ type: "json" }).value;
    switch (body.target) {
      case "Servers()":
        ctx.response.body = ["Server 1", "Server 2", "Server 3"];
        break;
      case "Teams()":
        ctx.response.body = ["Team A", "Team B"];
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
