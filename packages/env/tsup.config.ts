import { type Options, defineConfig } from "tsup";

export default defineConfig((options: Options) => ({
	entry: ["src/env.ts"],
	clean: true,
	dts: true,
	format: ["cjs"],
	...options,
}));
