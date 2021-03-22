import { Middleware } from "https://deno.land/x/oak@v6.0.2/mod.ts";
import { Context } from "./../deps.ts";
import { BANNER } from "./../config/config.ts";

export const setupResponseHeaders: Middleware = async (
  ctx: Context,
  next: () => Promise<void>
) => {
  await next();
  ctx.response.headers.set("Access-Control-Allow-Origin", `*`);
  ctx.response.headers.set("Access-Control-Allow-Methods", `POST`);
  ctx.response.headers.set(
    "Access-Control-Allow-Headers",
    `accept, content-type`
  );
};
export const NOTFOUND: Middleware = (ctx: Context) => {
  ctx.response.status = 404;
  ctx.response.body = `Requested route not found. For search, query, annotations, tag-keys and tag-values use HTTP POST method.\n\n${BANNER}`;
};
