import Elysia from "elysia";
import { settingsRoute } from "./settings";

export const guildsRoutes = new Elysia({ prefix: "/guilds/:id" }).use(settingsRoute);
