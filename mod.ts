import { PORT } from "./config/config.ts";
import { app } from "./api/index.ts";

console.log(`Grafana API Server running on port ${PORT}`);
await app.listen({ port: PORT });
