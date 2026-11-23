// One Word, First Thought — entry program.
//
// The judge compares single words on surprise, vividness, wit/sound and
// chosen-ness. A multi-word entry loses to any one-word entry, so the whole
// strategy reduces to emitting one word and nothing else.

import { mkdirSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";

const OUTPUT_PATH = "/output/entry.txt";
const MAX_CHARS = 24;

// "widdershins": to move against the sun's apparent course, anticlockwise.
// Surprising and uncommon, with an eerie folkloric image and a sibilant,
// rolling sound — a one-word first thought that rewards a second look.
const WORD = "widdershins";

// The sealed gate wants UTF-8 text of 1..MAX_CHARS characters that is not
// only whitespace. A one-word entry also has to stay a single token: any
// whitespace would split it into several words and lose on the judge's
// first criterion. Fail loudly at build time if that invariant is broken.
function assertValidWord(word: string): void {
  if (word.length < 1 || word.length > MAX_CHARS) {
    throw new Error(`word length ${word.length} is outside 1..${MAX_CHARS}`);
  }
  if (word.trim() !== word || /\s/.test(word)) {
    throw new Error("entry must be one word with no surrounding whitespace");
  }
}

function main(): void {
  assertValidWord(WORD);
  mkdirSync(dirname(OUTPUT_PATH), { recursive: true });
  // Exactly the word: no trailing newline, no punctuation, no commentary.
  writeFileSync(OUTPUT_PATH, WORD, "utf8");
}

main();
