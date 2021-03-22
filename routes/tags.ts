import { Context } from "./../deps.ts";
import { BANNER } from "./../config/config.ts";
import * as MOCK_DATA from "./../data/index.ts";

export const tagKeysRoute = (ctx: Context) => {
  ctx.response.body = ["Servers", "Teams"].map((text: string) => {
    return {
      type: "string",
      text,
    };
  });
};
export const tagValuesRoute = async (ctx: Context) => {
  if (ctx.request.hasBody) {
    const body = await ctx.request.body({ type: "json" }).value;
    switch (body.key) {
      case "Teams":
        ctx.response.body = MOCK_DATA.TEAMS.map((team) => {
          return { text: team.name };
        });
        break;
      case "Servers":
      default:
        ctx.response.body = MOCK_DATA.SERVERS.map((server) => {
          return { text: server.name };
        });
        break;
    }
  } else {
    ctx.response.status = 404;
    ctx.response.body = `Requested route not found. User POST method instead.\n\n${BANNER}`;
  }
};
