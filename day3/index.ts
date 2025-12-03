import { readFileSync } from "node:fs";

// each line of digits in your input corresponds to a single bank of batteries. Within each bank, you need to turn on exactly two batteries; the joltage that the bank produces is equal to the number formed by the digits on the batteries you've turned on.
// example input 987654321111111
// In 987654321111111, you can make the largest joltage possible, 98, by turning on the first two batteries.
// In 811111111111119, you can make the largest joltage possible by turning on the batteries labeled 8 and 9, producing 89 jolts.
// currentJoltage 98
// joltage 81 811111111111119
// joltage 11 811111111111119
// joltage 11 811111111111119
// joltage 11 811111111111119
// joltage 11 811111111111119
// joltage 11 811111111111119
// joltage 11 811111111111119
// joltage 11 811111111111119
// joltage 11 811111111111119
// joltage 11 811111111111119
// joltage 11 811111111111119
// joltage 11 811111111111119
// joltage 11 811111111111119
// joltage 19 811111111111119
// output needs to be 89 not 81...
const solveFirst = (lines: string[]) => {
    const batteries: number[] = [];
    for (const line of lines) {
        const digits = line.split("").map(Number);
        let leftHighest = 0;
        let leftIndex = 0;
        let rightHighest = 0;
        for (let i = 0; i < digits.length - 1; i++) {
            if (digits[i]! > leftHighest) {
                leftHighest = digits[i]!;
                leftIndex = i;
            }
        }
        for (let i = leftIndex + 1; i < digits.length; i++) {
            if (digits[i]! > rightHighest) {
                rightHighest = digits[i]!;
            }
        }
        batteries.push(leftHighest * 10 + rightHighest);
    }

    return batteries.reduce((acc, battery) => acc + battery, 0);
};

const solveSecond = (lines: string[]) => {
    let total = 0n;

    for (const line of lines) {
        const digits = line.split("").map(Number);
        let numberStr = "";
        let startIndex = 0;

        for (let position = 0; position < 12; position++) {
            const digitsStillNeeded = 12 - position;
            const searchUpTo = digits.length - digitsStillNeeded + 1;

            let maxDigit = -1;
            let maxDigitIndex = startIndex;

            for (let i = startIndex; i < searchUpTo; i++) {
                if (digits[i]! > maxDigit) {
                    maxDigit = digits[i]!;
                    maxDigitIndex = i;
                }
            }

            numberStr += maxDigit;
            startIndex = maxDigitIndex + 1;
        }

        total += BigInt(numberStr);
    }

    return total;
};

export const day3 = (fileToRead: "example" | "input" = "example") => {
    const inputFile = `${fileToRead}.txt`;
    const currentDirectory = import.meta.url
        .replace("file://", "")
        .replace("index.ts", inputFile);

    const input = readFileSync(currentDirectory, "utf8");
    const lines = input.split("\n").map((s) => s.trim());

    const first = solveFirst(lines);
    const second = solveSecond(lines);

    return { first, second };
};
