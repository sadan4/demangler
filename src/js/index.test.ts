import { expect, test } from "vitest";

type TestCase = [mangled: string, demangled: string];

const entries = (await import("../textCases.json", {
    with: {
        type: "json",
    },
})).default as TestCase[];

const { makeDemangler } = await import(".");
const demangler = await makeDemangler();

for (const [mangled, demangled] of entries) {
    test(`demangle "${mangled}"`, () => {
        expect(demangler.demangle(mangled), `expected: "${demangled}"`)
            .toBe(demangled);
    });
}
export { };
