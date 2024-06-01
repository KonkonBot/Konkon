import { dbClient } from "@konkon/db";
import { Client, type ParseClient, type ParseLocales, type ParseMiddlewares } from "seyfert";
import { YunaParser } from "yunaforseyfert";
import type { konkonAPI } from "../../index";
import type defaultLang from "../../locales/en";
import { middlewares } from "../../middlewares";
import { KonkonContext } from "./context";
import PrefixManager from "./managers/prefix";

export class KonkonClient extends Client {
	prefixes: PrefixManager;

	constructor(public api: typeof konkonAPI) {
		super({
			context: KonkonContext,
			commands: {
				prefix: (msg) => this.prefixes.getPrefix(msg.guildId),
				argsParser: YunaParser(),
				reply: () => true,
			},
			allowedMentions: {
				parse: [],
			},
		});

		this.api = api;
		this.prefixes = new PrefixManager(this);

		this.configureServices();
	}

	private configureServices() {
		this.setServices({
			middlewares,
			langs: {
				default: "en",
				aliases: {
					es: ["es-ES", "es-419"],
				},
			},
		});
	}

	async start() {
		super.start().then(() => {
			this.uploadCommands();
			this.prefixes.start();
			dbClient.connect();
		});
	}
}

declare module "seyfert" {
	interface UsingClient extends ParseClient<Client<true>> {}
	interface ExtendContext extends ReturnType<typeof KonkonContext> {}
	interface RegisteredMiddlewares extends ParseMiddlewares<typeof middlewares> {}
	interface DefaultLocale extends ParseLocales<typeof defaultLang> {}
}
