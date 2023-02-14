import { parse } from "./../deps.ts";

const args = parse(Deno.args);

export const PORT = args.port || 8080;

export const NAMESPACE = `GrafanaUtils`;

export const BANNER = `Simple Grafana Deno REST API Server.`;
