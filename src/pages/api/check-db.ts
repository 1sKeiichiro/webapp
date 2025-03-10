import type { NextApiRequest, NextApiResponse } from 'next';
import dbPromise from '@/lib/db';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const db = await dbPromise;
    // SQLiteの基本情報取得クエリ
    const result = await db.all('SELECT name FROM sqlite_master WHERE type="table";');
    res.status(200).json({ success: true, tables: result });
  } catch (err: any) {
    console.error('🚨 詳細エラー情報:', err);
    res.status(500).json({ success: false, error: err.message || String(err) });
  }
};
