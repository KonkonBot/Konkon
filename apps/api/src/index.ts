import type { Elysia } from "elysia";
import { guildsRoutes } from "./routes/guilds";
import { porterRoutes } from "./routes/porter";

export const konkonRoutes = (app: Elysia) => app.use(guildsRoutes).use(porterRoutes);
