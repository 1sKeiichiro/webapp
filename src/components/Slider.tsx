// d:\10-code\00-100pro-7\webapp\src\components\CustomSlider.tsx
import React from 'react';
import { Slider, Typography } from '@mui/material';

type Props = {
    label: string;
    state: number;
    setState: (value: number) => void;
    min: number;
    max: number;
    step: number;
    marks?: { value: number; label: string }[];
};

const CustomSlider: React.FC<Props> = ({ label, state, setState, min, max, step, marks }) => {
    return (
        <div className="flex flex-col w-full mb-4">
            <Typography id={`slider-${label}`} gutterBottom align="center">
                {label}: {state}
            </Typography>
            <Slider
                aria-labelledby={`slider-${label}`}
                value={state}
                onChange={(_, value) => setState(value as number)}
                min={min}
                max={max}
                step={step}
                marks={marks}
                valueLabelDisplay="auto"
            />
        </div>
    );
};

export default CustomSlider;
