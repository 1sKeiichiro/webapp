// lib/db.ts
import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import fs from 'fs';
import path from 'path';

const DB_PATH = path.join(process.cwd(), 'public', 'data.sqlite');

if (!fs.existsSync(DB_PATH)) {
  throw new Error(`Database file not found at path: ${DB_PATH}`);
}

const dbPromise = open({
  filename: DB_PATH,
  driver: sqlite3.Database
});

export default dbPromise;
