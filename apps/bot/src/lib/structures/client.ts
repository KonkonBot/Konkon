import { dbClient } from "@seifato/db";
import { Client, type ParseClient, type ParseLocales, type ParseMiddlewares } from "seyfert";
import { SSCAdapter } from "ssca";
import { ArgsParser } from "sslp";
import type defaultLang from "../../locales/en";
import { middlewares } from "../../middlewares";
import { SeifatoContext } from "./context";
import PrefixManager from "./managers/prefix";

export class SeifatoClient extends Client {
	prefixes: PrefixManager;

	constructor() {
		super({
			context: SeifatoContext,
			commands: {
				prefix: (m) => this.prefixes.getPrefix(m.guildId),
				argsParser: (c, m, _) =>
					new ArgsParser({ debug: true, quotes: [["`", "`"]] }).runParser(c, m) as Record<
						string,
						string
					>,
				reply: () => true,
			},
			allowedMentions: {
				parse: [],
			},
		});

		this.prefixes = new PrefixManager(this);

		this.configureServices();
	}

	private configureServices() {
		this.setServices({
			middlewares,
			cache: {
				adapter: new SSCAdapter(),
			},
			langs: {
				default: "en",
				aliases: {
					es: ["es-ES", "es-419"],
				},
			},
		});
	}

	private async load() {
		Promise.all([
			await this.uploadCommands(),
			await this.prefixes.start(),
			await dbClient.connect(),
		]);
	}

	async start() {
		super.start().then(() => {
			this.load();
		});
	}
}

declare module "seyfert" {
	interface UsingClient extends ParseClient<Client<true>> {}
	interface ExtendContext extends ReturnType<typeof SeifatoContext> {}
	interface RegisteredMiddlewares extends ParseMiddlewares<typeof middlewares> {}
	interface DefaultLocale extends ParseLocales<typeof defaultLang> {}
	interface InternalOptions {
		asyncCache: true;
	}
}
