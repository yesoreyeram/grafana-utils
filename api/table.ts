import { queryResult } from "./../types.d.ts";
import * as MOCK_DATA from "./../data/index.ts";

export const getTableResults = (
  result: queryResult[],
  query = "",
) => {
  result.push({
    columns: [
      { text: "Server", type: "string" },
      { text: query, type: "number" },
    ],
    rows: MOCK_DATA.SERVERS.map((server) => {
      return [server.name, Math.random() * 100];
    }),
  });
  return result;
};
