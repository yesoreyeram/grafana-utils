import { queryResult } from "./../types.d.ts";
import * as MOCK_DATA from "./../data/index.ts";
import RandomWalk from "./queries/RandomWalk.ts";
import FlatLine from "./queries/FlatLine.ts";
import Step from "./queries/Step.ts";
import Pattern, { Patterns } from "./queries/Pattern.ts";
import Expression from "./queries/Expression.ts";
import Distribute from "./queries/Distribute.ts";
import Matrix from "./queries/Matrix.ts";

interface getTimeSeriesResultsOptions {
  startTime: number;
  endTime: number;
}

export const getTimeSeriesResults = (
  result: queryResult[],
  query: string,
  options: getTimeSeriesResultsOptions,
) => {
  if (query.startsWith("RandomWalk(") && query.endsWith(")")) {
    const rw = new RandomWalk(query);
    result = result.concat(
      rw.toGrafanaSeriesList(options.startTime, options.endTime),
    );
  } else if (query.startsWith("FlatLine(") && query.endsWith(")")) {
    const fl = new FlatLine(query);
    result = result.concat(
      fl.toGrafanaSeriesList(options.startTime, options.endTime),
    );
  } else if (query.startsWith("Step(") && query.endsWith(")")) {
    const step = new Step(query);
    result = result.concat(
      step.toGrafanaSeriesList(options.startTime, options.endTime),
    );
  } else if (query.startsWith("Pattern(") && query.endsWith(")")) {
    const pattern = new Pattern(query);
    result = result.concat(
      pattern.toGrafanaSeriesList(options.startTime, options.endTime),
    );
  } else if (query.startsWith("Patterns(") && query.endsWith(")")) {
    const patterns = new Patterns(query);
    result = result.concat(
      patterns.toGrafanaSeriesList(options.startTime, options.endTime),
    );
  } else if (query.startsWith("Matrix(") && query.endsWith(")")) {
    const matrix = new Matrix(query);
    result = result.concat(
      matrix.toGrafanaSeriesList(options.startTime, options.endTime),
    );
  } else if (query.startsWith("Expression(") && query.endsWith(")")) {
    const expression = new Expression(query);
    result = result.concat(
      expression.toGrafanaSeriesList(options.startTime, options.endTime),
    );
  } else if (query.startsWith("Distribute(") && query.endsWith(")")) {
    const distribution = new Distribute(query);
    result = result.concat(
      distribution.toGrafanaSeriesList(options.startTime, options.endTime),
    );
  } else {
    result.push({
      target: query,
      datapoints: MOCK_DATA.getRandomWalkDataPoints(
        options.startTime,
        options.endTime,
      ),
    });
  }
  return result;
};
