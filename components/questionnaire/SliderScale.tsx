'use client';

import { useState, useEffect } from 'react';
import { replacePlaceholders } from '@/lib/utils';

interface SliderScaleProps {
  questionKey: string;
  leftLabel: string;
  rightLabel: string;
  min?: number;
  max?: number;
  defaultValue?: number;
  value: string | string[];
  onChange: (value: string | string[]) => void;
  error?: string;
  clientName: string;
  productName: string;
}

export function SliderScale({
  questionKey,
  leftLabel,
  rightLabel,
  min = 1,
  max = 10,
  defaultValue = 5,
  value,
  onChange,
  error,
  clientName,
  productName,
}: SliderScaleProps) {
  // Parse current value (format: "Casual ←→ Elegant = 6")
  const currentValue = typeof value === 'string' ? value : '';
  const [sliderValue, setSliderValue] = useState<number>(() => {
    if (currentValue) {
      const match = currentValue.match(/=\s*(\d+)/);
      if (match) {
        return parseInt(match[1], 10);
      }
    }
    return defaultValue;
  });

  // Update the formatted value whenever slider changes
  useEffect(() => {
    const formatted = `${replacePlaceholders(leftLabel, clientName, productName)} ←→ ${replacePlaceholders(rightLabel, clientName, productName)} = ${sliderValue}`;
    onChange(formatted);
  }, [sliderValue, leftLabel, rightLabel, clientName, productName, onChange]);

  const percentage = ((sliderValue - min) / (max - min)) * 100;

  return (
    <div className="space-y-2" data-question-key={questionKey}>
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm text-[#86868b]">{replacePlaceholders(leftLabel, clientName, productName)}</span>
        <span className="text-sm font-medium text-[#f5f5f7]">{sliderValue}</span>
        <span className="text-sm text-[#86868b]">{replacePlaceholders(rightLabel, clientName, productName)}</span>
      </div>
      <div className="relative">
        <input
          type="range"
          min={min}
          max={max}
          value={sliderValue}
          onChange={(e) => setSliderValue(parseInt(e.target.value, 10))}
          className="w-full h-2 bg-[#2a2a2a] rounded-lg appearance-none cursor-pointer"
          style={{
            background: `linear-gradient(to right, #6295ff 0%, #6295ff ${percentage}%, #2a2a2a ${percentage}%, #2a2a2a 100%)`,
          }}
        />
      </div>
      {error && <p className="text-sm text-red-600">{error}</p>}
    </div>
  );
}

