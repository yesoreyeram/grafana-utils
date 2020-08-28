import { parse } from "./deps.ts";

const args = parse(Deno.args);

export const PORT = args.port || 8080;

export const BANNER = `Simple Grafana Deno REST API Server.

Refer https://github.com/yesoreyeram/grafana-simple-deno-api-backend for more details.`;
