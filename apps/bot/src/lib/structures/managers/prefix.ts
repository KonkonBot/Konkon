import { db, dbClient, schemas } from "@konkon/db";
import { type Client, Collection } from "seyfert";

class PrefixManager {
	private RESERVERD_PREFIXES = ["kon"];
	private prefixes = new Collection<string, string[]>();
	private defaultPrefix = "k!";
	private client: Client;

	constructor(client: Client) {
		this.client = client;
	}

	public get(guildId: string) {
		return this.prefixes.get(guildId);
	}

	public async start() {
		dbClient.on("notification", (msg) => {
			const payload = JSON.parse(msg.payload ?? "");
			this.prefixes.set(payload.guild_id, payload.prefixes);
		});

		await this.loadPrefixes();
	}

	async loadPrefixes() {
		const data = await db
			.select({
				guild_id: schemas.guilds.guildId,
				prefixes: schemas.guilds.prefixes,
			})
			.from(schemas.guilds);
		for (const { guild_id, prefixes } of data) {
			this.prefixes.set(guild_id, prefixes);
		}
	}

	getPrefix(guildId: string | undefined) {
		const defaults = [`<@${this.client.botId}>`, this.defaultPrefix, ...this.RESERVERD_PREFIXES];

		if (!guildId) return defaults;

		const prefixes = this.get(guildId) || defaults;

		prefixes.push(...this.RESERVERD_PREFIXES);

		return prefixes;
	}
}

export default PrefixManager;
