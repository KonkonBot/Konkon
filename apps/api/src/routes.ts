import type { ElysiaWithBaseUrl } from "elysia-autoload";
import type Route2 from "./routes/guilds/prefixes";
import type Route1 from "./routes/images/user/userinfo";
import type Route0 from "./routes/porter/translate";

export type Routes = ElysiaWithBaseUrl<"/porter/translate", ReturnType<typeof Route0>> &
	ElysiaWithBaseUrl<"/images/user/userinfo", ReturnType<typeof Route1>> &
	ElysiaWithBaseUrl<"/guilds/prefixes", ReturnType<typeof Route2>>;
