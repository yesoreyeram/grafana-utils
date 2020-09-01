export {
  getRandomWalkDataPoints,
  getRandomElementFromNumberArray,
} from "./utils.ts";
export { SERVERS } from "./servers.ts";
export { TEAMS } from "./teams.ts";
export { getCSVResults } from "./csv.ts";
import { LOREM } from "./lorem.ts";
export const DEFAULT_CSV_FILE_URL =
  `https://gist.githubusercontent.com/yesoreyeram/64a46b02f0bf87cb527d6270dd84ea47/raw/d6c70643a65a9f030210b8cea772037359a5dc83/tods.csv`;
export const RANDOM_WORDS = [
  ...new Set(
    LOREM.replace(/\n/g, "").split(" ").map((a) => a.trim().toLowerCase()),
  ),
];
