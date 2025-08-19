import { expect, test } from "vitest";

type TestCase = [mangled: string, demangled: string];

const entries = (await import("../textCases.json", {
    with: {
        type: "json",
    },
})).default as TestCase[];

const { demangler } = await import(".");

for (const [mangled, demangled] of entries) {
    test(`demangle "${mangled}"`, () => {
        expect(demangler.demangle(mangled), `expected: "${demangled}"`)
            .toBe(demangled);
    });
}
export { };
