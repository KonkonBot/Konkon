import * as _ from "drizzle-orm";

export const lower = (str: _.SQLWrapper) => _.sql`LOWER(${str}::TEXT)`;
export const upper = (str: _.SQLWrapper) => _.sql`UPPER(${str}::TEXT)`;

export { _ };
