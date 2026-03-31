import * as esbuild from 'esbuild';
import fs from 'fs';

async function test() {
  try {
    const files = fs.readdirSync('src', { recursive: true })
      .filter(f => f.endsWith('.js') || f.endsWith('.jsx'))
      .map(f => `src/${f}`);
      
    await esbuild.build({
      entryPoints: files,
      bundle: false,
      outdir: 'dist_test',
      loader: { '.jsx': 'jsx', '.js': 'jsx' }
    });
  } catch (e) {
    console.log(JSON.stringify(e.errors, null, 2));
  }
}

test();
