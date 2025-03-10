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
    SELECT * FROM transmission_data
    WHERE g = ? AND l_1 = ? AND l_2 = ? AND l_q = ?
    LIMIT 1
  `);

  const record = await stmt.get(gVal, l1Val, l2Val, lqVal);

  if (!record) {
    return res.status(404).json({ error: 'No data found' });
  }

  try {
    console.log("DB Record:", record); // ✅ デバッグ用ログ

    // JSONパースし、適切なデータ構造に変換
    const parsedCorrect = record.correct_graph_data ? JSON.parse(record.correct_graph_data).map((item: any) => ({
      FREQ: item.freq / 1e9, // GHz単位に変換
      S11_correct: 20 * Math.log10(item.s11), // dB変換
      S12_correct: 20 * Math.log10(item.s21)  // dB変換
    })) : [];

    const parsedPredict = record.predicted_graph_data ? JSON.parse(record.predicted_graph_data).map((item: any) => ({
      FREQ: item.freq / 1e9, // GHz単位に変換
      S11_predict: 20 * Math.log10(item.s11), // dB変換
      S12_predict: 20 * Math.log10(item.s21)  // dB変換
    })) : [];

    const responseData = {
      correct: {
        shape: record.correct_shape_data ? JSON.parse(record.correct_shape_data) : "", // ✅ JSONパース
        data: parsedCorrect
      },
      predict: {
        shape: record.predicted_shape_data ? JSON.parse(record.predicted_shape_data) : "", // ✅ JSONパース
        data: parsedPredict
      }
    };

    console.log("API Response:", responseData); // ✅ APIレスポンスを確認
    return res.status(200).json(responseData);

  } catch (error) {
    console.error('JSON Parsing Error:', error);
    return res.status(500).json({ error: 'Invalid JSON in database' });
  }
}
