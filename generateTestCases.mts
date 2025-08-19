#!/usr/bin/env node

import { writeFile } from "fs/promises";


const TEST_CASES_URL = "https://raw.githubusercontent.com/llvm/llvm-project/refs/heads/main/libcxxabi/test/DemangleTestCases.inc";
const testCases = await (await fetch(TEST_CASES_URL)).text();

const f1 = testCases
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line !== "" && !line.startsWith("//"));

const f2: string[] = [];

for (let i = 0; i < f1.length; i++) {
    let line = f1[i];

    // c++ string concatenation
    // has to be before the rest so they also get processed
    while (line.endsWith('"')) {
        i++;
        line = line.slice(0, -1) + f1[i].slice(1);
    }

    const len = line.length;

    if (line.endsWith("},")) {
        line = `${line.slice(0, len - 2)}],`;
    }
    if (line.startsWith("{")) {
        line = `[${line.slice(1)}`;
    }
    f2.push(line);
}

const last = f2.length - 1;

if (f2[last].endsWith("],")) {
    f2[last] = f2[last].slice(0, -1);
}

const f3 = `[${f2.join("")}]`;
let lines: string;

try {
    const parsed = JSON.parse(f3);

    lines = JSON.stringify(parsed, null, 4);
} catch (error) {
    console.error("Invalid JSON:", error);
    console.log("writing raw data instead");
    lines = f3;
}


await writeFile("src/textCases.json", lines);
