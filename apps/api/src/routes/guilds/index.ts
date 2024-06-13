import Elysia from "elysia";
import { settingsRoute } from "./prefixes";

export const guildsController = new Elysia({ prefix: "/guilds" }).use(settingsRoute);
