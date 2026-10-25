// Builds public/downloads/grenzenlos-deutsch-e1-l1.zip from the local media so students can download it.
import { zipSync, strToU8 } from 'fflate';
import { readdirSync, readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { join } from 'node:path';

const root = 'public/assets/german';
const files = {};
for (const dir of ['audio', 'video', 'img']) {
  if (!existsSync(join(root, dir))) continue;
  for (const f of readdirSync(join(root, dir))) {
    if (f.startsWith('.')) continue;
    files[`${dir}/${f}`] = readFileSync(join(root, dir, f));
  }
}
if (!Object.keys(files).length) console.warn('make-german-pack: no media found yet; the pack will contain only the attribution file.');
files['ATTRIBUTION.txt'] = strToU8(
`Grenzenlos Deutsch: an open-access curriculum for beginning German
Einheit 1, Lektion 1: sich vorstellen
Source: https://grenzenlos-deutsch.com/familie/e1/l1/
License: Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International (CC BY-NC-SA 4.0)
         https://creativecommons.org/licenses/by-nc-sa/4.0/
Funding for the original was provided in part by the National Endowment for the Humanities
and the Mansergh-Stuessy Fund for College Innovation.
Shared by Ramzuna Languages. Files are the originals, unmodified. You may share them for
non-commercial use under the same license, with this attribution.
`);
mkdirSync('public/downloads', { recursive: true });
writeFileSync('public/downloads/grenzenlos-deutsch-e1-l1.zip', zipSync(files, { level: 0 }));
console.log('make-german-pack: wrote public/downloads/grenzenlos-deutsch-e1-l1.zip');
