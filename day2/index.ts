import { readFileSync } from "node:fs";

const isRepeatedPattern = (s: string) => {
    // check if the string is a sequence repeated twice (e.g., "55", "6464", "123123")
    if (s.length % 2 !== 0) return false;
    const mid = s.length / 2;
    return s.slice(0, mid) === s.slice(mid);
};

const isRepeatedMulti = (s: string) => {
    const len = s.length;
    // try all possible pattern lengths from 1 up to len/2
    for (let l = 1; l <= len / 2; l++) {
        // the total length must be divisible by the pattern length
        if (len % l === 0) {
            const pattern = s.slice(0, l);
            const repeats = len / l;
            // repeats will be >= 2 because l <= len/2
            if (pattern.repeat(repeats) === s) return true;
        }
    }
    return false;
};

const solveFirst = (lines: string[]) => {
    const invalidIds: number[] = [];
    for (const line of lines) {
        const [firstStr, lastStr] = line.split("-");
        if (!firstStr || !lastStr) continue;

        const start = parseInt(firstStr, 10);
        const end = parseInt(lastStr, 10);

        if (Number.isNaN(start) || Number.isNaN(end)) continue;

        for (let id = start; id <= end; id++) {
            const s = id.toString();
            if (isRepeatedPattern(s)) {
                invalidIds.push(id);
            }
        }
    }

    const uniqueInvalidIds = [...new Set(invalidIds)];
    return uniqueInvalidIds.reduce((acc, id) => acc + id, 0);
};

const solveSecond = (lines: string[]) => {
    const invalidIds: number[] = [];
    for (const line of lines) {
        const [firstStr, lastStr] = line.split("-");
        if (!firstStr || !lastStr) continue;

        const start = parseInt(firstStr, 10);
        const end = parseInt(lastStr, 10);

        if (Number.isNaN(start) || Number.isNaN(end)) continue;

        for (let id = start; id <= end; id++) {
            const s = id.toString();
            if (isRepeatedMulti(s)) {
                invalidIds.push(id);
            }
        }
    }

    const uniqueInvalidIds = [...new Set(invalidIds)];
    return uniqueInvalidIds.reduce((acc, id) => acc + id, 0);
};

export const day2 = (fileToRead: "example" | "input" = "example") => {
    const inputFile = `${fileToRead}.txt`;
    const currentDirectory = import.meta.url
        .replace("file://", "")
        .replace("index.ts", inputFile);

    const input = readFileSync(currentDirectory, "utf8");
    const lines = input.split(",").map((s) => s.trim());

    const first = solveFirst(lines);
    const second = solveSecond(lines);

    return { first, second };
};
