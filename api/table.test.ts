import { getTableResults } from "./table.ts";
import { NAMESPACE } from "./../config/config.ts";
import { assertEquals } from "./../test_deps.ts";
import { tableResult } from "../types.d.ts";

Deno.test({
  name: `${NAMESPACE}.Table.Custom.Basic`,
  fn: () => {
    let scenario: tableResult[] = getTableResults(
      [],
      "Custom(1,Country,India,England ,United States Of America)",
    ).map((s) => s as tableResult);
    assertEquals(scenario.length, 1);
    assertEquals(scenario[0].columns.length, 1);
    assertEquals(scenario[0].columns[0].text, "Country");
    assertEquals(scenario[0].columns[0].type, "string");
    assertEquals(scenario[0].rows.length, 3);
    assertEquals(scenario[0].rows[0], ["India"]);
    assertEquals(scenario[0].rows[1], ["England"]);
    assertEquals(scenario[0].rows[2], ["United States Of America"]);
  },
});
Deno.test({
  name: `${NAMESPACE}.Table.Custom.MultiColumn`,
  fn: () => {
    let scenario: tableResult[] = getTableResults(
      [],
      "Custom(2,Country,City,India,Chennai,England,London,USA,New York,,Washington D.C.,Kenya)",
    ).map((s) => s as tableResult);
    assertEquals(scenario.length, 1);
    assertEquals(scenario[0].columns.length, 2);
    assertEquals(scenario[0].columns[0].text, "Country");
    assertEquals(scenario[0].columns[0].type, "string");
    assertEquals(scenario[0].columns[1].text, "City");
    assertEquals(scenario[0].columns[1].type, "string");
    assertEquals(scenario[0].rows.length, 5);
    assertEquals(scenario[0].rows[0], ["India", "Chennai"]);
    assertEquals(scenario[0].rows[1], ["England", "London"]);
    assertEquals(scenario[0].rows[2], ["USA", "New York"]);
    assertEquals(scenario[0].rows[3], ["", "Washington D.C."]);
    assertEquals(scenario[0].rows[4], ["Kenya"]);
  },
});
Deno.test({
  name: `${NAMESPACE}.Table.Custom.FormattedColumn`,
  fn: () => {
    let scenario: tableResult[] = getTableResults(
      [],
      "Custom(3,Country,Rank:number,City,India,1,Chennai,England,3,London)",
    ).map((s) => s as tableResult);
    assertEquals(scenario.length, 1);
    assertEquals(scenario[0].columns.length, 3);
    assertEquals(scenario[0].columns[0].text, "Country");
    assertEquals(scenario[0].columns[0].type, "string");
    assertEquals(scenario[0].columns[1].text, "Rank");
    assertEquals(scenario[0].columns[1].type, "number");
    assertEquals(scenario[0].columns[2].text, "City");
    assertEquals(scenario[0].columns[2].type, "string");
    assertEquals(scenario[0].rows.length, 2);
    assertEquals(scenario[0].rows[0], ["India", "1", "Chennai"]);
    assertEquals(scenario[0].rows[1], ["England", "3", "London"]);
  },
});
