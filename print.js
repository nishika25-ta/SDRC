import fs from 'fs';
const txt = fs.readFileSync('err.log', 'utf16le');
console.log(txt);
