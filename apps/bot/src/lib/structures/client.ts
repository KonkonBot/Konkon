import { client as dbClient } from "@seifato/db";
import { Client, Command, config, RuntimeConfig, SubCommand, type ParseClient, type ParseLocales, type ParseMiddlewares } from "seyfert";
import type defaultLang from "../../locales/en";
import { middlewares } from "../../middlewares";
import { SeifatoContext } from "./context";
import PrefixManager from "./managers/prefix";
import { HandleCommand } from "seyfert/lib/commands/handle";
import { loadConfig } from "c12";
import { ArgsParser } from "sslp";

export class SeifatoClient extends Client {
	prefixes: PrefixManager;

	constructor() {
		super({
			context: SeifatoContext,
			commands: {
				prefix: (m) => this.prefixes.getPrefix(m.guildId),
				reply: () => true,
			},
			allowedMentions: {
				parse: [],
			},
			async getRC() {
				const { config: seyfertConfig } = await loadConfig({
					configFile: "../seyfert.config.ts",
				});

				return config.bot(seyfertConfig as RuntimeConfig);
			},
		});

		this.prefixes = new PrefixManager(this);

		this.configureServices();
	}
	
	private configureServices() {
		this.setServices({
			handleCommand: class extends HandleCommand {
				argsParser = (c: string, m: SubCommand | Command) =>
					new ArgsParser({ debug: true, quotes: [["`", "`"]] }).runParser(c, m) as Record<
						string,
						string
					>
			},
			middlewares,
			cache: {
				// adapter: new SSCAdapter(),
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
