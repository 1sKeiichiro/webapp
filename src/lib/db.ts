import { open } from 'sqlite';
import sqlite3 from 'sqlite3';
import path from 'path';
import fs from 'fs';

const DB_PATH = path.join(process.cwd(), 'data', 'data.sqlite');

if (!fs.existsSync(DB_PATH)) {
  throw new Error(`Database file not found at path: ${DB_PATH}`);
}

const dbPromise = open({
  filename: DB_PATH,
  driver: sqlite3.Database,
});

export default dbPromise;
