import type { NextApiRequest, NextApiResponse } from 'next';
import dbPromise from '@/lib/db';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { g, l1, l2, lq } = req.query;

  const gVal  = parseFloat(g as string);
  const l1Val = parseFloat(l1 as string);
  const l2Val = parseFloat(l2 as string);
  const lqVal = parseFloat(lq as string);

  // DB接続をawaitして取得
  const db = await dbPromise;

  const stmt = await db.prepare(`
    SELECT * FROM your_table
    WHERE g = ? AND l1 = ? AND l2 = ? AND lq = ?
    LIMIT 1
  `);

  const record = await stmt.get(gVal, l1Val, l2Val, lqVal);

  if (!record) {
    return res.status(404).json({ error: 'No data found' });
  }

  try {
    const parsedCorrect = record.correct_shape_data ? JSON.parse(record.correct_shape_data) : null;
    const parsedPredict = record.predict_shape_data ? JSON.parse(record.predict_shape_data) : null;

    res.status(200).json({
      correct: parsedCorrect,
      predict: parsedPredict,
    });
  } catch (error) {
    console.error('JSON Parsing Error:', error);
    res.status(500).json({ error: 'Invalid JSON in database' });
  } finally {
    await stmt.finalize();
  }
}
