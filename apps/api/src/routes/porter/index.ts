import Elysia from "elysia";
import { translateRoute } from "./translate";

export const porterRoutes = new Elysia({ prefix: "/porter" }).use(translateRoute);
