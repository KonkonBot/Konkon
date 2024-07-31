import {expect, test} from "bun:test";

import {parser} from '../index'
import {Command, CommandOption} from "seyfert";

test("parse", () => {
        const content = 'aaron man "some description" --age=10 --flag';

        const testOptions: Pick<CommandOption, "name">[] = [
            {
                name: "name",
            },
            {
                name: "gender",
            },
            {
                name: "description",
            },
            {
                name: "age",
            },
            {
                name: "flag",
            },
        ]

        const result = parser({
            quotes: [
                ['"', '"'],
            ],
            prefixes: ["--"],
            separators: ["=", ":"],
        })(content, {
            options: testOptions
        } as Command);

        expect(result).toEqual({
            name: "aaron",
            gender: "man",
            description: "some description",
            age: "10",
            flag: "true",
        });
    }
)
;