import Elysia from "elysia";
import { translateRoute } from "./translate";

export const porterController = new Elysia({ prefix: "/porter" }).use(translateRoute);
