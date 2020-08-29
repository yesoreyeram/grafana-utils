export {
  getRandomWalkDataPoints,
  getRandomElementFromNumberArray,
  getRandomElementFromStringArray,
} from "./utils.ts";
export { SERVERS } from "./servers.ts";
export { TEAMS } from "./teams.ts";
import { LOREM } from "./lorem.ts";
export const RANDOM_WORDS = [...new Set(LOREM.split(" "))];
