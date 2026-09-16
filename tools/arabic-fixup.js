const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..', 'src');
const TOKENS = {
  'أكتر': 'أكثر',
  'بالظبط': 'بالضبط',
  'جروب': 'مجموعة',
  'إحنا': 'نحن',
  'عايز': 'أريد',
  'كام': 'كم',
  'دلوقتي': 'الآن',
  'رسايل': 'رسائل',
  'كرونة": "كرونة تشيكية': 'كرونة تشيكية',
  'كرونة': 'كرونة تشيكية'
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

const files = walk(root);
let changes = 0;
files.forEach(f => {
  let content = fs.readFileSync(f, 'utf8');
  let original = content;
  Object.keys(TOKENS).forEach(token => {
    // escape token for regex
    const esc = token.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const re = new RegExp(esc, 'g');
    content = content.replace(re, TOKENS[token]);
  });
  if (content !== original) {
    fs.writeFileSync(f, content, 'utf8');
    console.log('Patched', f);
    changes++;
  }
});
console.log('Done. Files changed:', changes);
