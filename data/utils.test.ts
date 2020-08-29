import { assertEquals } from "./../test_deps.ts";
import {
  getRandomElementFromNumberArray,
  getRandomWalkDataPoints,
} from "./utils.ts";
import { NAMESPACE } from "./../config/config.ts";

Deno.test({
  name: `${NAMESPACE}.Utils.getRandomElementFromNumberArray`,
  fn: () => {
    assertEquals(
      [30, 20, -10].indexOf(getRandomElementFromNumberArray([30, 20, -10])) >
        -1,
      true,
    );
  },
});

Deno.test({
  name: `${NAMESPACE}.Mock.RandomWalk`,
  fn: () => {
    const randomWalk = getRandomWalkDataPoints(
      new Date("2020-12-20 10:20:0").getTime(),
      new Date("2020-12-20 12:20:0").getTime(),
    );
    assertEquals(randomWalk.length, 120);
    assertEquals(randomWalk[0].length, 2);
    assertEquals(randomWalk[0][1], 1608459600000);
    assertEquals(typeof randomWalk[0][0], "number");
  },
});
