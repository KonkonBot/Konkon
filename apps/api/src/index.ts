import { Elysia } from "elysia";
import { guildsRoutes } from "./routes/guilds";
import { porterRoutes } from "./routes/porter";

// export const konkonRoutes = (app: Elysia) => app.use(guildsRoutes).use(porterRoutes);

export const apiApp = () => new Elysia().use(guildsRoutes).use(porterRoutes).listen(3080);

export default apiApp;
