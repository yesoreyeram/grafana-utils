interface QueryOptions {
  token: string;
  delimiter?: string;
}
export default class Query {
  query: string;
  queryObjects: string[];
  constructor(
    public type: "table" | "timeserie",
    querystring: string,
    public options: QueryOptions,
  ) {
    this.query = querystring;
    if (
      querystring.toLowerCase().startsWith(`${options.token.toLowerCase()}(`) &&
      querystring.endsWith(")")
    ) {
      this.query = querystring.slice(options.token.length + 1).slice(0, -1);
    }
    this.queryObjects = this.query.split(options.delimiter || ",").map((s) =>
      s.trim()
    );
  }
}
