import type { NextApiRequest, NextApiResponse } from 'next';
import dbPromise from '@/lib/db';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const db = await dbPromise;

    // 全てのテーブル名を取得
    const tables = await db.all(`
      SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%';
    `);

    const tableDetails: Record<string, any> = {};

    // 各テーブルのカラム情報を取得
    for (const table of tables) {
      const columns = await db.all(`PRAGMA table_info(${table.name});`);
      tableDetails[table.name] = columns;
    }

    res.status(200).json({
      success: true,
      tables: tableDetails
    });

  } catch (err: any) {
    console.error('🚨 詳細エラー情報:', err);
    res.status(500).json({ success: false, error: err.message || String(err) });
  }
};