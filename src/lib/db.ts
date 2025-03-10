// src/lib/db.ts
import { open } from 'sqlite';
import sqlite3 from 'sqlite3';
import path from 'path';
import fs from 'fs';

// Lambda環境の一時書き込み可能フォルダを利用
const tmpDbPath = '/tmp/data.sqlite';
const originalDbPath = path.join(process.cwd(), 'data', 'data.sqlite');

// Lambda関数内で毎回実行されるため、一度だけコピーする
if (!fs.existsSync(tmpDbPath)) {
  console.log('📂 DB file copying to tmp...');
  fs.copyFileSync(originalDbPath, tmpDbPath);
}

const dbPromise = open({
  filename: tmpDbPath,
  driver: sqlite3.Database,
});

export default dbPromise;
