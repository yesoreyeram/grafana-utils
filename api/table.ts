import { queryResult } from "./../types.d.ts";
import * as MOCK_DATA from "./../data/index.ts";
import { chunk } from "./../utils/_.ts";

export const getTableResults = (
  result: queryResult[],
  query = "",
) => {
  if (query.startsWith("Custom(") && query.endsWith(")")) {
    const columnCount =
      (+(query.replace("Custom(", "").replace(")", "")).split(",")[0]) || 1;

    const rowItems = (query.replace("Custom(", "").replace(")", "")).split(",")
      .filter((value, index) => index > 0).map((a) => a.trim());

    const columns = (rowItems.filter((q, index) => index < (columnCount))).map(
      (text) => {
        let items = (text + "").split(":").map((a) => a.trim());
        return {
          text: items[0],
          type: items[1] || "string",
        };
      },
    );
    const rows = chunk(
      (rowItems.filter((q, index) => index >= columnCount)),
      columnCount,
    );
    result.push({ rows, columns });
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
