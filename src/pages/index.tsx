// d:\10-code\00-100pro-7\webapp\src\pages\index.tsx
import React, { useState } from "react";
import { Slider, Button, Typography } from "@mui/material";
import CompareShapes from "@/components/CompareShapes";
import CompareGraph from "@/components/CompareGraph";
import CustomSlider from "@/components/Slider"; // 追加

type GraphData = {
  FREQ: number;
  S11_correct: number;
  S12_correct: number;
  S11_predict: number;
  S12_predict: number;
};

type ResponseData = {
  correct: {
    shape: Record<string, string>;
    data: GraphData[];
  };
  predict: {
    shape: Record<string, string>;
    data: GraphData[];
  };
};

const IndexPage: React.FC = () => {
  const [g, setG] = useState(0.5);
  const [l1, setL1] = useState(32.5);
  const [l2, setL2] = useState(32.5);
  const [lq, setLq] = useState(11.0);
  const [data, setData] = useState<ResponseData | null>(null);

  const handleUpdate = async () => {
    const queryParams = new URLSearchParams({
      g: g.toString(),
      l1: l1.toString(),
      l2: l2.toString(),
      lq: lq.toString(),
    });
    const res = await fetch(`/api/getData?${queryParams}`);
    if (res.ok) {
      const json = await res.json();
      setData(json);
    } else {
      console.error("No data found");
      setData(null);
    }
  };

  return (
    <div className="min-h-screen flex flex-col p-6 max-w-screen-xl mx-auto">
      <Typography variant="h4" component="h1" align="center" gutterBottom>
        Transmission Line Simulation
      </Typography>

      {/* 2カラムレイアウト (スライダー : プロット = 1:2) */}
      <div className="grid grid-cols-3 gap-4 flex-1">
        {/* 左カラム (スライダー) */}
        <div className="col-span-1 flex flex-col justify-center items-center w-full h-full max-h-[80vh] overflow-auto">
          {/* スライダー部分 */}
          <div className="w-full max-w-xs">
            {/* スライダーをCustomSliderに変更 */}
            <CustomSlider label="g" state={g} setState={setG} min={0.5} max={4.5} step={0.5} />
            <CustomSlider
                label="l1"
                state={l1}
                setState={setL1}
                min={32.5}
                max={35.5}
                step={0.5}
            />
            <CustomSlider
                label="l2"
                state={l2}
                setState={setL2}
                min={32.5}
                max={35.5}
                step={0.5}
            />
            <CustomSlider label="lq" state={lq} setState={setLq} min={11.0} max={15.0} step={0.5} />
            <Button
                variant="contained"
                color="primary"
                onClick={handleUpdate}
                fullWidth
                sx={{ mt: 2 }}
            >
                Update
            </Button>
          </div>
        </div>

        {/* 右カラム (画像とグラフ, 縦2分割) */}
        <div className="col-span-2 flex flex-col gap-4 h-full max-h-[80vh] overflow-hidden">
          {/* 形状比較 */}
          <div className="flex items-center justify-center flex-grow min-h-[40vh] max-h-[50vh]">
            {data ? (
              <CompareShapes correctShape={data.correct.shape} predictShape={data.predict.shape} />
            ) : (
              <Typography variant="body1" align="center" color="textSecondary">
                No shape data yet
              </Typography>
            )}
          </div>

          {/* グラフ比較 */}
          <div className="flex items-center justify-center flex-grow min-h-[40vh] max-h-[50vh] overflow-hidden">
            {data ? (
              <CompareGraph correctData={data.correct.data} predictData={data.predict.data} />
            ) : (
              <Typography variant="body1" align="center" color="textSecondary">
                No graph data yet
              </Typography>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default IndexPage;
