import { Application } from "./deps.ts";
import { PORT } from "./config.ts";
import { setupResponseHeaders, NOTFOUND } from "./middleware/index.ts";
import { router } from "./router.ts";

const app = new Application();
app.use(setupResponseHeaders);
app.use(router.routes());
app.use(router.allowedMethods());
app.use(NOTFOUND);

console.log(`Grafana API Server running on port ${PORT}`);
await app.listen({ port: PORT });
