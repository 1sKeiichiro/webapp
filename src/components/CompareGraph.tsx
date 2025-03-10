// d:\10-code\00-100pro-7\webapp\src\components\CompareGraph.tsx
import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

type GraphData = {
  FREQ: number;
  S11_correct: number;
  S12_correct: number;
  S11_predict: number;
  S12_predict: number;
};

type Props = {
  correctData: GraphData[];
  predictData: GraphData[];
};

const CompareGraph: React.FC<Props> = ({ correctData, predictData }) => {
  // 正解データと予測データを周波数ごとにマージする
  const mergedData = correctData.map((item, index) => ({
    FREQ: item.FREQ,
    S11_correct: item.S11_correct,
    S12_correct: item.S12_correct,
    S11_predict: predictData[index]?.S11_predict ?? null,
    S12_predict: predictData[index]?.S12_predict ?? null,
  }));

  return (
    <div className="w-full h-[350px] flex items-center justify-center max-w-2xl">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={mergedData}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#ccc" />
          <XAxis
            dataKey="FREQ"
            label={{ value: "Frequency (GHz)", position: "insideBottomRight", offset: -10 }}
          />
          <YAxis
            label={{ value: "S-parameters (dB)", angle: -90, position: "insideLeft" }}
          />
          <Tooltip
            formatter={(value: any) =>
              typeof value === "number" ? value.toFixed(2) + " dB" : value
            }
          />
          <Legend />
          <Line
            type="monotone"
            dataKey="S11_correct"
            stroke="#FF7300"
            strokeWidth={2}
            dot={false}
            name="S11 Correct"
          />
          <Line
            type="monotone"
            dataKey="S12_correct"
            stroke="#FF7300"
            strokeWidth={2}
            strokeDasharray="5 5"
            dot={false}
            name="S12 Correct"
          />
          <Line
            type="monotone"
            dataKey="S11_predict"
            stroke="blue"
            strokeWidth={2}
            dot={false}
            name="S11 Predict"
          />
          <Line
            type="monotone"
            dataKey="S12_predict"
            stroke="blue"
            strokeWidth={2}
            strokeDasharray="5 5"
            dot={false}
            name="S12 Predict"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CompareGraph;
