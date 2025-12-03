'use client';

import { Input } from '@/components/ui/Input';
import type { QuestionConfig } from '@/types/questionnaire';

interface RadioGroupProps {
  questionKey: string;
  options: Array<{ value: string; label: string }>;
  value: string;
  onChange: (value: string) => void;
  allowOther?: boolean;
  error?: string;
  clientName: string;
  productName: string;
}

export function RadioGroup({
  questionKey,
  options,
  value,
  onChange,
  allowOther,
  error,
  clientName,
  productName,
}: RadioGroupProps) {
  const selectedValue = value || '';
  const isOtherSelected = allowOther && selectedValue === 'other';
  const otherValue = isOtherSelected ? value.replace(/^other:/, '') : '';

  const handleRadioChange = (optionValue: string) => {
    onChange(optionValue);
  };

  const handleOtherChange = (otherText: string) => {
    onChange(`other:${otherText}`);
  };

  return (
    <div className="space-y-3">
      {options.map((option) => (
        <label
          key={option.value}
          className="flex items-center cursor-pointer group"
        >
          <input
            type="radio"
            name={questionKey}
            value={option.value}
            checked={selectedValue === option.value}
            onChange={() => handleRadioChange(option.value)}
            className="w-4 h-4 text-[#6295ff] bg-[#1a1a1a] border-[#2a2a2a] focus:ring-[#6295ff] focus:ring-2"
          />
          <span className="ml-3 text-[#f5f5f7]">{option.label}</span>
        </label>
      ))}
      
      {allowOther && (
        <>
          <label className="flex items-center cursor-pointer group">
            <input
              type="radio"
              name={questionKey}
              value="other"
              checked={isOtherSelected}
              onChange={() => handleRadioChange('other')}
              className="w-4 h-4 text-[#6295ff] bg-[#1a1a1a] border-[#2a2a2a] focus:ring-[#6295ff] focus:ring-2"
            />
            <span className="ml-3 text-[#f5f5f7]">Other:</span>
          </label>
          {isOtherSelected && (
            <div className="ml-7 mt-2">
              <Input
                type="text"
                value={otherValue}
                onChange={(e) => handleOtherChange(e.target.value)}
                placeholder="Please specify"
                error={!!error}
                className="max-w-md"
              />
            </div>
          )}
        </>
      )}
      
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
}




