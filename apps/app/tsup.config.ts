import { type Options, defineConfig } from "tsup";

export default defineConfig((options: Options) => ({
	entry: ["src/**/*.ts"],
	clean: true,
	...options,
}));
