import { join } from "node:path";
import { autoload } from "esbuild-plugin-autoload";

await Bun.build({
	entrypoints: [join(__dirname, "src/index.ts")],
	target: "bun",
	outdir: join(__dirname, "dist"),
	plugins: [autoload()],
}).then(console.log);
