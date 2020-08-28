import { Context } from "./../deps.ts";
import { BANNER } from "./../config.ts";
import { annotationResult } from "./../types.d.ts";

export const annotationsRoute = async (ctx: Context) => {
  if (ctx.request.hasBody) {
    const body = await ctx.request.body({ type: "json" }).value;
    const startTime = new Date(body.range.from).getTime();
    const endTime = new Date(body.range.to).getTime();
    var annotations: annotationResult[] = [];
    let dataPointTime = startTime;
    while (dataPointTime < endTime) {
      annotations.push({
        title: `${body.annotation.query} ${annotations.length + 1}`,
        time: startTime + (annotations.length * ((endTime - startTime) / 3)) +
          (Math.random() * 5 * 60 * 10000),
        text:
          `Description of event ${body.annotation.query} ${annotations.length +
            1}`,
        tags: ["Tag A", "Tag B", body.annotation.query],
      });
      dataPointTime = dataPointTime + ((endTime - startTime) / 3) + 20000;
    }
    ctx.response.body = annotations;
  } else {
    ctx.response.status = 404;
    ctx.response.body = `Requested route not found.\n\n${BANNER}`;
  }
};
