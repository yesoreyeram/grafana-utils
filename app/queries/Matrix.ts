import Query from "./Query.ts";
import { timeSeriesResult, dataPoint } from "./../../types.d.ts";
import * as MOCK_DATA from "./../../data/index.ts";

export default class Matrix extends Query {
  seriesName: string;
  offset: number;
  matrix: (number | null)[][];
  constructor(queryString: string) {
    super("timeserie", queryString, { token: "Matrix" });
    this.seriesName = this.queryObjects[0];
    this.offset = +(this.queryObjects[1]);
    this.matrix = (this.queryObjects.slice(2)
      .join(",").split("]").map((a) => a.replace("[", "").trim())
      .filter(Boolean)
      .map((a) => a.split(",").map((b) => b ? +b : null)));
  }
  toGrafanaSeriesList(startTime: number, endTime: number): timeSeriesResult[] {
    let result: timeSeriesResult[] = [];
    let datapoints = MOCK_DATA.getRandomWalkDataPoints(startTime, endTime).map(
      (dp, index) => {
        const timestamp = dp[1];
        const actualValue = dp[0];
        return {
          timestamp,
          value: actualValue,
        };
      },
    );
    let newDatapoints = datapoints.map((dp, index) => {
      let ts = dp.timestamp;
      return this.matrix[index - 1]
        ? this.matrix[index - 1].map((a) => {
          return [a, ts] as dataPoint;
        })
        : [];
    });
    if (this.offset > 0) {
      newDatapoints = datapoints.map((dp, index) => {
        if (index < this.offset) {
          return [];
        }
        let ts = dp.timestamp;
        return this.matrix[index - 1 - this.offset]
          ? this.matrix[index - 1 - this.offset].map((a) => {
            return [a, ts] as dataPoint;
          })
          : [];
      });
    }
    result.push({
      target: this.seriesName,
      datapoints: newDatapoints.reduce((a, b) => a.concat(b), []),
    });
    return result;
  }
}
export class LCD extends Query {
  private letters: Matrix[];
  constructor(queryString: string) {
    super("timeserie", queryString, { token: "LCD" });
    this.letters = this.queryObjects[0].split("").map((letter, index) => {
      let expression_matrix = "";
      let offset = index * 6;
      switch (letter.toUpperCase()) {
        case "A":
          expression_matrix =
            `Matrix(A,${offset},[1,2,3,4,5,6,7,8][5,9][5,9][5,9][1,2,3,4,5,6,7,8])`;
          break;
        case "B":
          expression_matrix =
            `Matrix(B,${offset},[1,2,3,4,5,6,7,8,9][1,5,9][1,5,9][1,5,9][2,3,4,6,7,8])`;
          break;
        case "C":
          expression_matrix =
            `Matrix(C,${offset},[2,3,4,5,6,7,8][1,9][1,9][1,9][2,8])`;
          break;
        case "D":
          expression_matrix =
            `Matrix(D,${offset},[1,2,3,4,5,6,7,8,9][1,9][1,9][2,8][3,4,5,6,7])`;
          break;
        case "E":
          expression_matrix =
            `Matrix(E,${offset},[1,2,3,4,5,6,7,8,9][1,5,9][1,5,9][1,5,9][1,5,9])`;
          break;
        case "F":
          expression_matrix =
            `Matrix(F,${offset},[1,2,3,4,5,6,7,8,9][5,9][5,9][5,9][5,9])`;
          break;
        case "G":
          expression_matrix =
            `Matrix(G,${offset},[2,3,4,5,6,7,8][1,9][1,5,9][1,5,9][2,3,4,5,8])`;
          break;
        case "H":
          expression_matrix =
            `Matrix(H,${offset},[1,2,3,4,5,6,7,8,9][5][5][5][1,2,3,4,5,6,7,8,9])`;
          break;
        case "I":
          expression_matrix =
            `Matrix(I,${offset},[1,9][1,9][1,2,3,4,5,6,7,8,9][1,9][1,9])`;
          break;
        case "J":
          expression_matrix =
            `Matrix(J,${offset},[2,3,9][1,9][1,2,3,4,5,6,7,8,9][9][9])`;
          break;
        case "K":
          expression_matrix =
            `Matrix(K,${offset},[1,2,3,4,5,6,7,8,9][4,6][3,7][2,8][1,9])`;
          break;
        case "L":
          expression_matrix =
            `Matrix(L,${offset},[1,2,3,4,5,6,7,8,9][1][1][1][1])`;
          break;
        case "M":
          expression_matrix =
            `Matrix(M,${offset},[1,2,3,4,5,6,7,8,9][8,9][5,6,7,8][8,9][1,2,3,4,5,6,7,8,9])`;
          break;
        case "N":
          expression_matrix =
            `Matrix(N,${offset},[1,2,3,4,5,6,7,8,9][7,8,9][5,6,7][2,3,4][1,2,3,4,5,6,7,8,9])`;
          break;
        case "O":
          expression_matrix =
            `Matrix(O,${offset},[3,4,5,6,7][2,8][1,9][2,8][3,4,5,6,7])`;
          break;
        case "P":
          expression_matrix =
            `Matrix(P,${offset},[1,2,3,4,5,6,7,8,9][5,9][5,9][5,9][6,7,8])`;
          break;
        case "Q":
          expression_matrix =
            `Matrix(Q,${offset},[3,4,5,6,7][2,8][1,9][2,3,8][1,3,4,5,6,7])`;
          break;
        case "R":
          expression_matrix =
            `Matrix(R,${offset},[1,2,3,4,5,6,7,8,9][5,9][5,9][4,5,9][1,2,3,4,6,7,8])`;
          break;
        case "S":
          expression_matrix =
            `Matrix(S,${offset},[2,5,6,7,8][1,5,9][1,5,9][1,5,9][2,3,4,5,8])`;
          break;
        case "T":
          expression_matrix =
            `Matrix(T,${offset},[9][9][1,2,3,4,5,6,7,8,9][9][9])`;
          break;
        case "U":
          expression_matrix =
            `Matrix(U,${offset},[2,3,4,5,6,7,8,9][1,2][1][1,2][2,3,4,5,6,7,8,9])`;
          break;
        case "V":
          expression_matrix =
            `Matrix(V,${offset},[5,6,7,8,9][3,4,5][1,2][3,4,5][5,6,7,8,9])`;
          break;
        case "W":
          expression_matrix =
            `Matrix(W,${offset},[1,2,3,4,5,6,7,8,9][2][3,4,5][2][1,2,3,4,5,6,7,8,9])`;
          break;
        case "X":
          expression_matrix =
            `Matrix(X,${offset},[1,2,8,9][3,4,6,7][4,5,6][3,4,6,7][1,2,8,9])`;
          break;
        case "Y":
          expression_matrix =
            `Matrix(Y,${offset},[8,9][6,7][1,2,3,4,5,6][6,7][8,9])`;
          break;
        case "Z":
          expression_matrix =
            `Matrix(Z,${offset},[1,2,9][1,2,3,9][1,4,5,6,9][1,7,8,9][1,8,9])`;
          break;
        case "$":
          expression_matrix =
            `Matrix(${letter},${offset},[1,2,3,4,5,6,7,8,9][1,2,3,4,5,6,7,8,9][1,2,3,4,5,6,7,8,9][1,2,3,4,5,6,7,8,9][1,2,3,4,5,6,7,8,9])`;
          break;
        case " ":
        case "*":
        default:
          expression_matrix = `Matrix(*,${offset},[][][][])`;
          break;
      }
      return new Matrix(expression_matrix);
    });
  }
  toGrafanaSeriesList(startTime: number, endTime: number): timeSeriesResult[] {
    let result: timeSeriesResult[] = [];
    this.letters.forEach((letter) => {
      letter.toGrafanaSeriesList(startTime, endTime).forEach((v) => {
        result.push(v);
      });
    });
    return result;
  }
}
