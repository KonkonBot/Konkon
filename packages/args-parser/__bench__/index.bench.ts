import {bench, group, run} from "mitata";
import {YunaParser} from "yunaforseyfert";
import {parser} from "../index";
import {ArgsParser} from "sslp";

const konkonParser = parser;
const yuna = YunaParser();
const sslp = new ArgsParser();

const commandOptions = {
    options: [
        {
            name: "name",
            type: 3,
        },
    ],
};

const content = "!hello --name=world";

group("Simple parsing", () => {
    // @ts-expect-error
    bench("YunaParser", () => yuna(content, commandOptions));
    // @ts-expect-error
    bench("SSLP", () => sslp.runParser(content, commandOptions));
    // @ts-expect-error
    bench("KonkonParser", () => konkonParser(content, commandOptions));
});

// @ts-expect-error
await run({
    silent: false, // enable/disable stdout output
    avg: true, // enable/disable avg column (default: true)
    json: false, // enable/disable json output (default: false)
    colors: true, // enable/disable colors (default: true)
    min_max: true, // enable/disable min/max column (default: true)
    percentiles: false,
});