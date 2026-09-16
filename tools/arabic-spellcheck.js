const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..', 'src');
const ARABIC_REGEX = /[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF]+/g;

// small colloquial -> suggestion map
const suggestions = {
  'أكتر': 'أكثر',
  'بالظبط': 'بالضبط',
  'جروب': 'مجموعة',
  'إحنا': 'نحن',
  'عايز': 'أريد',
  'كام': 'كم',
  'دلوقتي': 'الآن',
  'رسايل': 'رسائل',
  'كرونة': 'كرونة تشيكية',
  'أكتر من': 'أكثر من',
};

function walk(dir, filelist = []) {
  const files = fs.readdirSync(dir);
  files.forEach(file => {
    const full = path.join(dir, file);
    const stat = fs.statSync(full);
    if (stat.isDirectory()) walk(full, filelist);
    else if (/\.(ts|tsx|js|jsx|md)$/.test(file)) filelist.push(full);
  });
  return filelist;
}

function extractArabicLines(file) {
  const content = fs.readFileSync(file, 'utf8');
  const lines = content.split(/\r?\n/);
  const results = [];
  lines.forEach((ln, idx) => {
    const matches = ln.match(ARABIC_REGEX);
    if (matches) results.push({ line: idx + 1, text: ln.trim(), matches });
  });
  return results;
}

const files = walk(root);
const report = [];
files.forEach(f => {
  const hits = extractArabicLines(f);
  if (hits.length) {
    hits.forEach(h => {
      const found = h.matches.filter(m => Object.keys(suggestions).some(k => m.includes(k)));
      const suggested = [];
      found.forEach(tok => {
        Object.keys(suggestions).forEach(k => {
          if (tok.includes(k)) suggested.push({ token: k, suggestion: suggestions[k] });
        });
      });
      report.push({ file: path.relative(process.cwd(), f), line: h.line, text: h.text, found: found, suggested });
    });
  }
});

const out = { generatedAt: new Date().toISOString(), results: report };
fs.writeFileSync('arabic-spellcheck-report.json', JSON.stringify(out, null, 2));
console.log('Report written to arabic-spellcheck-report.json —', report.length, 'matches found');
