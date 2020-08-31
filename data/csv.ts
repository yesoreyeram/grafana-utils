// deno-lint-ignore-file
import { CSVParse } from "./../deps.ts";
import { queryResult } from "./../types.d.ts";
import * as MOCK_DATA from "./../data/index.ts";

const getCSVasTable = async (url = MOCK_DATA.DEFAULT_CSV_FILE_URL) => {
  const csv = await fetch(url).then((a) => a.text());
  return await CSVParse(csv);
};

const headerStringsToHeaderObjects = (headers: string[]) => {
  return headers.map((text: string) => {
    return {
      text,
      type: "string",
    };
  });
};

export const parseResultIntoGrafanaFormat = (
  format: string,
  data: any[],
  queryParams: string[],
): queryResult => {
  const customHeader = queryParams.find((q) => q.startsWith("headers:"));
  const headers: string[] = customHeader
    ? customHeader.replace("headers:", "").split(":")
    : data[0];
  return {
    columns: headerStringsToHeaderObjects(headers),
    rows: customHeader ? data : data.filter((row, index: number) => index > 0),
  };
};

interface getCSVResultOptions {
  type: string;
  startTime: number;
  endTime: number;
}

export const getCSVResults = async (
  result: queryResult[],
  query = "",
  options: getCSVResultOptions,
): Promise<any[]> => {
  if (query.startsWith("CSV(") && query.endsWith(")")) {
    const queryParams = (query.replace("CSV(", "").replace(")", "")).split(",")
      .map((a) => a.trim());
    const CSVUrl = queryParams[0] || MOCK_DATA.DEFAULT_CSV_FILE_URL;
    const data: any[] = await getCSVasTable(CSVUrl);
    result.push(
      parseResultIntoGrafanaFormat(options.type || "table", data, queryParams),
    );
  }
  return result;
};
