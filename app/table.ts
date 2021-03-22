import { queryResult } from "./../types.d.ts";
import * as MOCK_DATA from "./../data/index.ts";
import CustomQuery from "./queries/Custom.ts";

export const getTableResults = (result: queryResult[], query = "") => {
  if (query.toLowerCase().startsWith("custom(") && query.endsWith(")")) {
    const qo = new CustomQuery(query);
    result.push(qo.toGrafanaTable());
  } else {
    result.push({
      columns: [
        { text: "Server", type: "string" },
        { text: query, type: "number" },
      ],
      rows: MOCK_DATA.SERVERS.map((server) => {
        return [server.name, Math.random() * 100];
      }),
    });
  }
  return result;
};
