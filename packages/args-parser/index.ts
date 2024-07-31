import {
	Logger,
	type Command as SeyfertCommand,
	type SubCommand,
} from "seyfert";
import { type OptionConfig, parser as _parser } from "./bindings";

type ParserOptions = {
	prefixes?: string[];
	separators?: string[];
	quotes?: [string, string][];
	debug?: boolean;
};

type Command = (SeyfertCommand | SubCommand) & {
	options: OptionConfig[];
	__parserConfig?: ParserOptions;
};

export const defaultConfig = (options?: ParserOptions) => {
	const _options = options ?? {};
	return {
		prefixes: _options.prefixes ?? ["--", "/"],
		separators: _options.separators ?? ["=", ":"],
		quotes: _options.quotes ?? [
			['"', '"'],
			["'", "'"],
		],
		debug: _options.debug ?? false,
	};
};

export function parser(config?: ParserOptions) {
	const _config = defaultConfig(config);

	return (content: string, command: SeyfertCommand | SubCommand) => {
		const commandConfig = (command as Command).__parserConfig;
		const finalConfig = commandConfig ? defaultConfig(commandConfig) : _config;
		const log = finalConfig.debug ? new Logger({ name: "KonkonParser" }) : null;

		if (log) {
			if (commandConfig) log.debug("Using custom command config...");
			log.debug("Config:", finalConfig);
		}

		const options = (command as Command).options.map(({ name }) => ({ name }));

		if (log) log.debug("Options:", options);

		const result = _parser(content, { options, ...finalConfig });

		if (log) log.debug("Parser result:", result);

		return result;
	};
}

export function ParserConfig(config: ParserOptions) {
	const defaultedConfig = defaultConfig(config);

	// biome-ignore lint/suspicious/noExplicitAny: :3
	// biome-ignore lint/complexity/noBannedTypes: :3
	return <T extends { new (...args: any[]): {} }>(target: T) => {
		return class extends target {
			__parserConfig = defaultedConfig;
		};
	};
}
