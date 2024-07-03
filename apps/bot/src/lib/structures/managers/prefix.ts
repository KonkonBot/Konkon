import { db, client as dbClient, schema } from "@seifato/db";
import type { Client } from "seyfert";
import { Collection } from "seyfert";

class PrefixManager {
	DEFAULT_PREFIXES = ["kon", "konkon"];
	private prefixes = new Collection<string, string[]>();

	constructor(private client: Client) {}

	public get(guildId: string) {
		return this.prefixes.get(guildId);
	}

	public async start() {
		dbClient.on("notification", (msg) => {
			if (msg.channel !== "guilds") return;
			if (!msg.payload) return;
			const payload = JSON.parse(msg.payload);
			this.prefixes.set(payload.guild_id, payload.prefixes);
		});

		await this.loadPrefixes();
	}

	async loadPrefixes() {
		const data = await db
			.select({
				guild_id: schema.guilds.guildId,
				prefixes: schema.guilds.prefixes,
			})
			.from(schema.guilds);
		for (const { guild_id, prefixes } of data) {
			this.prefixes.set(guild_id, prefixes);
		}
	}

	async getPrefix(guildId: string | undefined): Promise<string[]> {
		if (!guildId) return this.DEFAULT_PREFIXES;

		const prefixes = this.prefixes.get(guildId);

		if (!prefixes) return this.DEFAULT_PREFIXES;

		return [...prefixes, ...this.DEFAULT_PREFIXES];
	}
}

export default PrefixManager;
