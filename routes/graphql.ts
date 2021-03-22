import { Context } from "./../deps.ts";

export const graphQLRoute = (ctx: Context) => {
  ctx.response.body = "graphql";
};
