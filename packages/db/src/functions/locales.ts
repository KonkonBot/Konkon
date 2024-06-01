import { sql } from "drizzle-orm";
import type { BaseClientOptions } from "seyfert/lib/client/base";
import { db } from "..";

export const getLocale = (ctx: Parameters<NonNullable<BaseClientOptions["context"]>>[0]) => {
	
	const func = async () => {
		const result = await db.query.locales.findFirst({
			where: (t, { isNull, and, or, eq, isNotNull }) => {
				return and(
					or(
						and(
							isNull(t.guildId),
							eq(t.userId, ctx.user.id || sql`null`),
							eq(t.guildId, ctx.guildId || sql`null`),
						),
						isNotNull(t.locale),
					),
				);
			},
		});

		return result?.locale || "en";
	};
	return func;
};
