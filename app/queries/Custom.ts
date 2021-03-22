import {
  GrafanaTableColumn,
  GrafanaTableRow,
  tableResult,
} from "./../../types.d.ts";
import { chunk } from "./../../utils/_.ts";
import Query from "./Query.ts";

export default class CustomQuery extends Query {
  private columnCount: number;
  private columns: GrafanaTableColumn[];
  private rows: GrafanaTableRow[][];
  constructor(query: string) {
    super("table", query, { token: "Custom" });
    this.columnCount = +(this.queryObjects[0] || "1");
    this.columns = this.queryObjects
      .slice(1)
      .filter((q, index) => index < this.columnCount)
      .map((text) => {
        const items = (text + "").split(":").map((a) => a.trim());
        return {
          text: items[0],
          type: items[1] || "string",
        };
      });
    this.rows = chunk(
      this.queryObjects.slice(this.columnCount + 1),
      this.columnCount
    );
  }
  toGrafanaTable(): tableResult {
    return { columns: this.columns, rows: this.rows };
  }
}
