// src/download-db.ts (完全版)
import axios from 'axios';
import { writeFileSync, mkdirSync, existsSync } from 'fs';
import path from 'path';

const DB_URL = 'https://github.com/1sKeiichiro/webapp/releases/download/aaa/sqlite.db';

const OUTPUT_DIR = path.join(process.cwd(), 'data');
const OUTPUT_PATH = path.join(OUTPUT_DIR, 'data.sqlite');

async function downloadDB() {
  if (!existsSync(OUTPUT_DIR)) mkdirSync(OUTPUT_DIR, { recursive: true });
  console.log('Downloading DB from GitHub Releases...');
  const res = await axios.get<ArrayBuffer>(DB_URL, { responseType: 'arraybuffer' });
  writeFileSync(OUTPUT_PATH, Buffer.from(res.data));
  console.log('✅ DB downloaded successfully!');
}

downloadDB().catch(console.error);
