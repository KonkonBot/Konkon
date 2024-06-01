import * as _ from "drizzle-orm";

export type SelectColumns<T> = {
	[K in keyof T]?: boolean;
};

export type ReturnTypeFromSelect<T, S> = {
	[K in keyof S]: K extends keyof T ? T[K] : never;
};

export const lower = (str: string | _.SQLWrapper) => _.sql`LOWER(${str}::TEXT)`;
export const upper = (str: string | _.SQLWrapper) => _.sql`UPPER(${str}::TEXT)`;

export { _ };
