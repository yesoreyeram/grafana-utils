import { NAMESPACE } from "./../../config/config.ts";
import { assertEquals } from "./../../test_deps.ts";
import CustomQuery from "./Custom.ts";

Deno.test({
  name: `${NAMESPACE}.Table.Custom.Basic`,
  fn: () => {
    const query = new CustomQuery(
      "custom(1,Country,India,England ,United States Of America)"
    );
    const scenario = query.toGrafanaTable();
    assertEquals(scenario.columns.length, 1);
    assertEquals(scenario.columns[0].text, "Country");
    assertEquals(scenario.columns[0].type, "string");
    assertEquals(scenario.rows.length, 3);
    assertEquals(scenario.rows[0], ["India"]);
    assertEquals(scenario.rows[1], ["England"]);
    assertEquals(scenario.rows[2], ["United States Of America"]);
  },
});
Deno.test({
  name: `${NAMESPACE}.Table.Custom.MultiColumn`,
  fn: () => {
    const query = new CustomQuery(
      "Custom(2,Country,City,India,Chennai,England,London,USA,New York,,Washington D.C.,Kenya)"
    );
    const scenario = query.toGrafanaTable();
    assertEquals(scenario.columns.length, 2);
    assertEquals(scenario.columns[0].text, "Country");
    assertEquals(scenario.columns[0].type, "string");
    assertEquals(scenario.columns[1].text, "City");
    assertEquals(scenario.columns[1].type, "string");
    assertEquals(scenario.rows.length, 5);
    assertEquals(scenario.rows[0], ["India", "Chennai"]);
    assertEquals(scenario.rows[1], ["England", "London"]);
    assertEquals(scenario.rows[2], ["USA", "New York"]);
    assertEquals(scenario.rows[3], ["", "Washington D.C."]);
    assertEquals(scenario.rows[4], ["Kenya"]);
  },
});
Deno.test({
  name: `${NAMESPACE}.Table.Custom.FormattedColumn`,
  fn: () => {
    const query = new CustomQuery(
      "Custom(3,Country,Rank:number,City,India,1,Chennai,England,3,London)"
    );
    const scenario = query.toGrafanaTable();
    assertEquals(scenario.columns.length, 3);
    assertEquals(scenario.columns[0].text, "Country");
    assertEquals(scenario.columns[0].type, "string");
    assertEquals(scenario.columns[1].text, "Rank");
    assertEquals(scenario.columns[1].type, "number");
    assertEquals(scenario.columns[2].text, "City");
    assertEquals(scenario.columns[2].type, "string");
    assertEquals(scenario.rows.length, 2);
    assertEquals(scenario.rows[0], ["India", "1", "Chennai"]);
    assertEquals(scenario.rows[1], ["England", "3", "London"]);
  },
});
