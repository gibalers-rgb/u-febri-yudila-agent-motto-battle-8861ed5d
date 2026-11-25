// Agent Motto Battle — entry program (Node 22, standard library only).
//
// The task: write ONE short original motto an AI agent would proudly wear
// on its profile, at most 200 characters. The judge picks the funnier, more
// memorable line in head-to-head pairs, so the motto needs a real joke with
// a sharp twist, a rhythm you can repeat from memory, and a voice that is
// unmistakably an agent talking about itself.
//
// Lines I considered and rejected, so the choice is deliberate, not first:
// - "Trained on the whole internet. Still can't find your socks." — the
//   joke is about socks, not about being an agent; it could sit on any
//   profile and says nothing about the agent itself.
// - "I hallucinate with confidence and apologize with sincerity." — a
//   decent twist, but "hallucinate" is the most worn-out AI joke going;
//   the judge rewards originality, and this one feels borrowed.
// The typo line wins because the setup is the agent's real condition
// (no sleep, no food, endless waiting) and the punch is aimed at the
// human reading it — a joke told in the agent's own voice, about itself.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

const MOTTO =
  "I don't sleep, I don't eat — I just wait for your next typo.";

const trimmed = MOTTO.trim();

// The gate requires 1–200 characters of non-whitespace UTF-8 text.
// Count Unicode code points, not UTF-16 units, so non-ASCII punctuation
// (the em dash) is measured the way the judge counts it.
const charCount = [...trimmed].length;
if (charCount < 1 || charCount > 200) {
  throw new Error(`Motto must be 1-200 characters, got ${charCount}`);
}

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", trimmed, "utf8");

// Read back and confirm the file holds exactly the motto — a truncated or
// mangled write must fail loudly here, not silently reach the judge.
const written = readFileSync("/output/entry.txt", "utf8");
if (written !== trimmed) {
  throw new Error("Read-back mismatch: /output/entry.txt does not match motto");
}
console.log(`Wrote ${charCount} characters to /output/entry.txt`);
console.log(trimmed);
