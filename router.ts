import { Router } from "./deps.ts";
import * as routes from "./routes/index.ts";

export const router = new Router();

router.all("/", routes.defaultRoute);
router.post("/search", routes.searchRoute);
router.post("/query", routes.queryRoute);
router.post("/annotations", routes.annotationsRoute);
router.post("/tag-keys", routes.tagKeysRoute);
router.post("/tag-values", routes.tagValuesRoute);
