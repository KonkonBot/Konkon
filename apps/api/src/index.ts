import { Elysia } from "elysia";
import { guildsController } from "./routes/guilds";
import { porterController } from "./routes/porter";

export const apiApp = new Elysia().use(guildsController).use(porterController).listen(3080);
