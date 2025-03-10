import type { NextApiRequest, NextApiResponse } from 'next';
import path from 'path';
import { existsSync } from 'fs';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const dbPath = path.join(process.cwd(), 'public', 'data.sqlite');
  
  if (existsSync(dbPath)) {
    res.status(200).json({ exists: true, path: dbPath });
  } else {
    res.status(500).json({ exists: false, path: dbPath });
  }
};
