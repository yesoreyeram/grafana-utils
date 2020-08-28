import { Context } from "./../deps.ts";
import { BANNER } from "./../config.ts";

export const tagKeysRoute = async (ctx: Context) => {
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
        ctx.response.body = ["Team A", "Team B"].map((text: string) => {
          return { text };
        });
        break;
      case "Servers":
      default:
        ctx.response.body = ["Server 1", "Server 2", "Server 3"].map(
          (text: string) => {
            return { text };
          },
        );
        break;
    }
  } else {
    ctx.response.status = 404;
    ctx.response.body = `Requested route not found.\n\n${BANNER}`;
  }
};
