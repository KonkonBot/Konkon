import { JavaScriptTranspiler } from "akore/common";

export const transpiler = new JavaScriptTranspiler();

const code = `
$declare[test;$call[someFunc];$call[process.cwd]]
@print[$get[test]]
`;

transpiler.logger.info(`Transpiling:\n${code}`);

const result = transpiler.toCode(code);
transpiler.logger.debug(`Result:\n${result}`);
