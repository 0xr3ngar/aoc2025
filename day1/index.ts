import { readFileSync } from 'fs';

const solveFirst = (lines: string[]) => {
    let timesBeenZero = 0;
    let current = 50;

    for (let i = 0; i < lines.length; i++) {
        const line = lines[i]!.trim();
        if (line.length === 0) continue;

        const dir = line[0];
        const dist = parseInt(line.slice(1), 10);
        if (Number.isNaN(dist)) {
            throw new Error(`distance line ${i + 1}: "${line}"`);
        }

        if (dir === 'L') {
            current = (current - dist) % 100;
            if (current < 0) current += 100;
        } else if (dir === 'R') {
            current = (current + dist) % 100;
        } else {
            throw new Error(`line ${i + 1}: "${line}"`);
        }

        if (current === 0) {
            timesBeenZero++;
        }
    }

    console.log('timesBeenZero', timesBeenZero);
    return timesBeenZero;
};

const countZeroHitsDuringRotation = (current: number, dir: "L" | "R", dist: number) => {
    if (dir === 'R') {
        // If current is 90 and we add 10 (dist), we get 100. 100/100 = 1 hit.
        // If current is 90 and we add 110, we get 200. 200/100 = 2 hits.
        return Math.floor((current + dist) / 100);
    }

    // calculate distance required to hit the first zero going backwards.
    // If we are at 50, we need 50 steps to hit 0.
    // If we are at 0, we need 100 steps to hit 0 again (wrapping around).
    const distToFirstZero = current === 0 ? 100 : current;

    if (dist < distToFirstZero) {
        return 0;
    }

    // we hit the first zero (1 hit), then see how many full 100s fit in the remaining distance
    return 1 + Math.floor((dist - distToFirstZero) / 100);
}

const applyRotation = (current: number, dir: "L" | "R", dist: number) => {
    if (dir === 'R') {
        return (current + dist) % 100;
    }
    let next = (current - dist) % 100;
    if (next < 0) next += 100;
    return next;
}

const solveSecond = (lines: string[]) => {
    let current = 50;
    let zeroHits = 0;

    for (let i = 0; i < lines.length; i++) {
        const line = lines[i]!.trim();
        if (!line) continue;

        const dir = line[0] as "L" | "R";
        const dist = parseInt(line.slice(1), 10);

        zeroHits += countZeroHitsDuringRotation(current, dir, dist);

        current = applyRotation(current, dir, dist);
    }
    return zeroHits;
}


export const day1 = (fileToRead: 'example' | 'input' = 'example') => {
    const inputFile = `${fileToRead}.txt`;
    const currentDirectory = import.meta.url
        .replace('file://', '')
        .replace('index.ts', inputFile);

    const input = readFileSync(currentDirectory, 'utf8');
    const lines = input.split('\n').map(s => s.trim()).filter(s => s.length > 0);

    const first = solveFirst(lines);
    const second = solveSecond(lines);

    console.log('first', first);
    console.log('second', second);

    return { first, second };
};

