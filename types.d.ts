export type dataPoint = [number, number];
type timeSeriesResult = {
  target: string;
  datapoints: dataPoint[];
};
type column = {
  text: string;
  type: string;
};
type tableResult = {
  columns: column[];
  rows: (string | number | object)[];
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
