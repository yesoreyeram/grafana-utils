import { Application } from "./../deps.ts";
import { setupResponseHeaders, NOTFOUND } from "./../middleware/index.ts";
import { router } from "./../routes/router.ts";

export const app = new Application();

app.use(setupResponseHeaders);
app.use(router.routes());
app.use(router.allowedMethods());
app.use(NOTFOUND);

export default app.handle;
