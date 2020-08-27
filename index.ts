import { Application, Router } from "https://deno.land/x/oak/mod.ts";
import { parse } from "https://deno.land/std/flags/mod.ts";

const args = parse(Deno.args);
const port = args.port || 8080;
const app = new Application();
const router = new Router();

router.all("/", async (ctx: any) => {
    ctx.response.body = "Simple Grafana Deno REST API Server";
})
router.all("/search", async (ctx: any) => {
    if (ctx.request.hasBody) {
        const body = await ctx.request.body({ type: 'json' }).value;
        if (body.target) {
            switch (body.target) {
                case "Servers()":
                    ctx.response.body = ["Server 1", "Server 2", "Server 3"];
                    break;
                case "Teams()":
                    ctx.response.body = ["Team A", "Team B"];
                    break;
                default:
                    ctx.response.body = ["cpu", "memory"];
                    break;
            }
        } else {
            ctx.response.body = ["cpu", "memory"];
        }
    } else {
        ctx.response.body = ["cpu", "memory"];
    }
})
router.all("/query", async (ctx: any) => {
    if (ctx.request.hasBody) {
        const body = await ctx.request.body({ type: 'json' }).value;
        const startTime = new Date(body.range.from).getTime();
        const endTime = new Date(body.range.to).getTime();
        var result: any[] = [];
        body.targets.forEach((target: any) => {
            if (target.type === 'timeserie') {
                let dataPointTime = endTime;
                const datapoints: any[] = [];
                while (dataPointTime > startTime) {
                    datapoints.push([
                        Math.random() * 100, endTime - (datapoints.length * 60 * 1000)
                    ]);
                    dataPointTime = dataPointTime - (60 * 1000)
                }
                result.push({
                    target: target.target,
                    datapoints
                });
            } else if (target.type === 'table') {
                result.push({
                    columns: [{ text: 'Server', type: 'string' }, { text: target.target, type: 'number' }],
                    rows: [
                        ['Server 1', Math.random() * 100],
                        ['Server 2', Math.random() * 100],
                        ['Server 3', Math.random() * 100],
                    ]
                })
            }
        })
        ctx.response.body = result;
    } else {
        ctx.response.status = 404;
        ctx.response.body = "Not Found"
    }
})
router.all("/annotations", async (ctx: any) => {
    if (ctx.request.hasBody) {
        const body = await ctx.request.body({ type: 'json' }).value;
        const startTime = new Date(body.range.from).getTime();
        const endTime = new Date(body.range.to).getTime();
        var annotations: any[] = [];
        let dataPointTime = startTime;
        while (dataPointTime < endTime) {
            annotations.push({
                title: `Event ${annotations.length + 1}`,
                time: startTime + (annotations.length * 10 * 60 * 1000) + 20000,
                text: `Description of event ${annotations.length + 1}`,
                tags: ["Tag A", "Tag B"]
            });
            dataPointTime = dataPointTime + (10 * 60 * 1000) + 20000;
        }
        ctx.response.body = annotations;
    } else {
        ctx.response.status = 404;
        ctx.response.body = "Not Found"
    }
})

app.use(async (ctx, next) => {
    await next();
    ctx.response.headers.set("Access-Control-Allow-Origin", `*`);
    ctx.response.headers.set("Access-Control-Allow-Methods", `POST`);
    ctx.response.headers.set("Access-Control-Allow-Headers", `accept, content-type`);
});
app.use(router.routes());
app.use(router.allowedMethods());
app.use((ctx: any) => {
    ctx.response.status = 404;
    ctx.response.body = "Not found";
})

console.log(`Grafana API Server running on port ${port}`);
await app.listen({ port });