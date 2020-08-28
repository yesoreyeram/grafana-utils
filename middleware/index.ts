import { Context, Middleware } from "./../deps.ts";
import { BANNER } from "./../config.ts";

export const setupResponseHeaders: Middleware = async (
  ctx: Context,
  next: () => Promise<void>,
) => {
  await next();
  ctx.response.headers.set("Access-Control-Allow-Origin", `*`);
  ctx.response.headers.set("Access-Control-Allow-Methods", `POST`);
  ctx.response.headers.set(
    "Access-Control-Allow-Headers",
    `accept, content-type`,
  );
};
export const NOTFOUND: Middleware = (ctx: Context) => {
  ctx.response.status = 404;
  ctx.response.body = `Requested route not found.\n\n${BANNER}`;
};
