import dotenv from "dotenv";

dotenv.config({
	path: `${__dirname}/.env`,
});

export const env: { [key: string]: string } = {
	BOT_TOKEN: process.env.BOT_TOKEN as string,
	DATABASE_URL: process.env.DATABASE_URL as string,
};

for (const key in env) {
	console.log(key, env[key]);
	if (!env[key]) {
		throw new Error(`Missing env variable: ${key}`);
	}
}
