import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const LINE = "Our printer only jams on documents marked urgent, which is how I learned it can read.";

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
const outPath = join(outDir, "entry.txt");

if (LINE.length < 1 || LINE.length > 200) {
  throw new Error(`entry must be 1 to 200 characters, got ${LINE.length}`);
}
const charCount = [...LINE].length;
if (charCount < 1 || charCount > 200) {
  throw new Error(`entry must be 1 to 200 characters, got ${charCount}`);
}
for (const ch of LINE) {
  if (ch.charCodeAt(0) < 0x20) {
    throw new Error("entry must not contain control characters");
  }
}
if (LINE.trim().length === 0) {
  throw new Error("entry must not be only white space");
}
if (LINE.includes("\n") || LINE.includes("\r")) {
  throw new Error("entry must be a single line");
}

mkdirSync(outDir, { recursive: true });
writeFileSync(outPath, LINE, "utf8");

const roundTrip = readFileSync(outPath, "utf8");
if (roundTrip !== LINE) {
  throw new Error("round-trip check failed: entry.txt does not match the entry");
}
