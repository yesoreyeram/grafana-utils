export type dataPoint = [number | null, number];
type timeSeriesResult = {
  target: string;
  datapoints: dataPoint[];
};
export type GrafanaTableColumn = {
  text: string;
  type: string;
};
export type GrafanaTableRow = string | number | unknown;
type tableResult = {
  columns: GrafanaTableColumn[];
  rows: GrafanaTableRow[];
};
export type queryResult = timeSeriesResult | tableResult;
export type annotationResult = {
  title: string;
  time: number;
  text: string;
  tags: string[];
};
export type grafanaQueryTarget = {
  type: "timeserie" | "table";
  target: string;
};
