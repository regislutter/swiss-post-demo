#!/usr/bin/env node
/**
 * Token contrast guard (WCAG 2.2), dependency-free.
 *
 * Resolves the semantic --post-feedback-* tokens from src/global/tokens.css (default theme) and
 * src/global/tokens.alt.css ([data-theme='alt'], layered over the default), then checks:
 *   - text      foreground on background  >= 4.5:1 (AA). 7:1 (AAA) is reported, not enforced.
 *   - non-text  accent on background      >= 3:1   (WCAG 1.4.11)
 *   - focus     focus ring on background  >= 3:1, and on white >= 3:1 (the page behind the banner)
 * It also checks that the hard-coded fallbacks in banner.css match the default tokens, so the
 * component renders the same with or without the token stylesheet loaded.
 *
 * Exit code 1 on any failure. This does not replace checking hover/focus states and real content.
 */
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const read = (file) => readFileSync(path.join(root, file), 'utf8');

const VARIANTS = ['info', 'warning', 'success', 'error'];
const AA_TEXT = 4.5;
const AAA_TEXT = 7;
const NON_TEXT = 3;

/** Collects `--name: value` declarations from every rule block in a stylesheet. */
const parseTokens = (css) => {
  const tokens = new Map();
  const stripped = css.replace(/\/\*[\s\S]*?\*\//g, '');
  for (const [, , body] of stripped.matchAll(/([^{}]+)\{([^{}]*)\}/g)) {
    for (const [, name, value] of body.matchAll(/(--[\w-]+)\s*:\s*([^;]+);/g)) tokens.set(name, value.trim());
  }
  return tokens;
};

const resolve = (tokens, name, seen = new Set()) => {
  if (seen.has(name)) throw new Error(`Circular token reference: ${name}`);
  seen.add(name);
  const value = tokens.get(name);
  if (value === undefined) throw new Error(`Unknown token: ${name}`);
  const ref = value.match(/^var\(\s*(--[\w-]+)\s*\)$/);
  return ref ? resolve(tokens, ref[1], seen) : value.toLowerCase();
};

const toRgb = (hex) => {
  const match = /^#([0-9a-f]{6})$/.exec(hex);
  if (!match) throw new Error(`Expected a #rrggbb colour, got "${hex}"`);
  return [0, 2, 4].map((i) => parseInt(match[1].slice(i, i + 2), 16) / 255);
};

const luminance = (hex) => {
  const [r, g, b] = toRgb(hex).map((c) => (c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4));
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
};

const ratio = (a, b) => {
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (hi + 0.05) / (lo + 0.05);
};

const defaults = parseTokens(read('src/global/tokens.css'));
const themes = {
  default: defaults,
  alt: new Map([...defaults, ...parseTokens(read('src/global/tokens.alt.css'))]),
};

let failures = 0;
const rows = [];
const check = (theme, subject, fg, bg, min, label) => {
  const value = ratio(fg, bg);
  const ok = value >= min;
  if (!ok) failures += 1;
  rows.push({ theme, subject, pair: `${fg} on ${bg}`, ratio: value.toFixed(2), need: `>= ${min}`, label, result: ok ? 'ok' : 'FAIL' });
};

for (const [theme, tokens] of Object.entries(themes)) {
  const focus = resolve(tokens, '--post-focus-ring');
  for (const variant of VARIANTS) {
    const get = (part) => resolve(tokens, `--post-feedback-${variant}-${part}`);
    const [fg, bg, accent] = [get('foreground'), get('background'), get('accent')];
    check(theme, variant, fg, bg, AA_TEXT, 'text AA');
    check(theme, variant, accent, bg, NON_TEXT, 'accent 1.4.11');
    check(theme, variant, focus, bg, NON_TEXT, 'focus on banner');
    check(theme, variant, focus, '#ffffff', NON_TEXT, 'focus on page');
    if (ratio(fg, bg) < AAA_TEXT) rows.push({ theme, subject: variant, pair: `${fg} on ${bg}`, ratio: ratio(fg, bg).toFixed(2), need: `>= ${AAA_TEXT}`, label: 'text AAA (target)', result: 'warn' });
  }
}

// Drift guard: the fallbacks baked into banner.css must equal the default tokens.
const bannerCss = read('src/components/post-banner/banner.css');
for (const [, name, fallback] of bannerCss.matchAll(/var\(\s*(--post-feedback-[\w-]+)\s*,\s*(#[0-9a-fA-F]{6})\s*\)/g)) {
  const expected = resolve(defaults, name);
  const ok = expected === fallback.toLowerCase();
  if (!ok) failures += 1;
  rows.push({ theme: 'default', subject: name, pair: `fallback ${fallback}`, ratio: '-', need: `= ${expected}`, label: 'fallback drift', result: ok ? 'ok' : 'FAIL' });
}

const columns = ['theme', 'subject', 'label', 'pair', 'ratio', 'need', 'result'];
const widths = columns.map((c) => Math.max(c.length, ...rows.map((r) => String(r[c]).length)));
const line = (r) => columns.map((c, i) => String(r[c]).padEnd(widths[i])).join('  ');
console.log(line(Object.fromEntries(columns.map((c) => [c, c]))));
for (const row of rows) console.log(line(row));

const warns = rows.filter((r) => r.result === 'warn').length;
console.log(`\n${rows.length - warns} checks, ${failures} failed, ${warns} AAA target(s) not met (informational).`);
process.exit(failures === 0 ? 0 : 1);
