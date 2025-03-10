// d:\10-code\00-100pro-7\webapp\src\components\CompareShapes.tsx
import React, { useEffect, useRef } from "react";

type Props = {
  correctShape: Record<string, string>;
  predictShape: Record<string, string>;
};

const CompareShapes: React.FC<Props> = ({ correctShape, predictShape }) => {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const adjustViewBox = () => {
      if (svgRef.current) {
        const paths = svgRef.current.querySelectorAll("path");
        let minX = Infinity,
          minY = Infinity,
          maxX = -Infinity,
          maxY = -Infinity;

        paths.forEach((path) => {
          const bbox = path.getBBox();
          minX = Math.min(minX, bbox.x);
          minY = Math.min(minY, bbox.y);
          maxX = Math.max(maxX, bbox.x + bbox.width);
          maxY = Math.max(maxY, bbox.y + bbox.height);
        });

        const padding = 5; // パディングを調整
        const width = maxX - minX + padding * 2;
        const height = maxY - minY + padding * 2;
        const centerX = (minX + maxX) / 2;
        const centerY = (minY + maxY) / 2;

        svgRef.current.setAttribute(
          "viewBox",
          `${centerX - width / 2} ${centerY - height / 2} ${width} ${height}`
        );
      }
    };

    adjustViewBox();
  }, [correctShape, predictShape]);

  return (
    <div className="flex justify-center items-center w-full h-full p-4 max-w-4xl"> {/* 調整 */}
      <svg
        ref={svgRef}
        width="100%"
        height="100%"
        preserveAspectRatio="xMidYMid meet"
        className="max-w-full max-h-full"
      >
        {Object.keys(correctShape).map((key) => (
          <path
            key={`correct-${key}`}
            d={correctShape[key]}
            fill="orange"
          />
        ))}
        {Object.keys(predictShape).map((key) => (
          <path
            key={`predict-${key}`}
            d={predictShape[key]}
            fill="blue"
            fillOpacity={0.35}
          />
        ))}
      </svg>
    </div>
  );
};

export default CompareShapes;
