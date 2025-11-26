'use client';

import { Input } from '@/components/ui/Input';
import type { QuestionConfig } from '@/types/questionnaire';

interface CheckboxGroupProps {
  questionKey: string;
  options: Array<{ value: string; label: string }>;
  value: string | string[];
  onChange: (value: string | string[]) => void;
  allowOther?: boolean;
  error?: string;
  clientName: string;
  productName: string;
}

export function CheckboxGroup({
  questionKey,
  options,
  value,
  onChange,
  allowOther,
  error,
  clientName,
  productName,
}: CheckboxGroupProps) {
  const selectedValues = Array.isArray(value) ? value : value ? [value] : [];
  const otherValue = selectedValues.find((v) => v.startsWith('other:'))?.replace(/^other:/, '') || '';
  const isOtherSelected = allowOther && selectedValues.some((v) => v.startsWith('other:'));

  const handleCheckboxChange = (optionValue: string, checked: boolean) => {
    if (checked) {
      const newValues = [...selectedValues.filter((v) => !v.startsWith('other:')), optionValue];
      onChange(newValues);
    } else {
      const newValues = selectedValues.filter((v) => v !== optionValue);
      onChange(newValues);
    }
  };

  const handleOtherToggle = (checked: boolean) => {
    if (checked) {
      const newValues = [...selectedValues.filter((v) => !v.startsWith('other:')), 'other:'];
      onChange(newValues);
    } else {
      const newValues = selectedValues.filter((v) => !v.startsWith('other:'));
      onChange(newValues);
    }
  };

  const handleOtherChange = (otherText: string) => {
    const newValues = selectedValues.map((v) => 
      v.startsWith('other:') ? `other:${otherText}` : v
    );
    onChange(newValues);
  };

  return (
    <div className="space-y-3">
      {options.map((option) => {
        const isChecked = selectedValues.includes(option.value);
        return (
          <label
            key={option.value}
            className="flex items-center cursor-pointer group"
          >
            <input
              type="checkbox"
              checked={isChecked}
              onChange={(e) => handleCheckboxChange(option.value, e.target.checked)}
              className="w-4 h-4 text-[#6295ff] bg-[#1a1a1a] border-[#2a2a2a] rounded focus:ring-[#6295ff] focus:ring-2"
            />
            <span className="ml-3 text-[#f5f5f7]">{option.label}</span>
          </label>
        );
      })}
      
      {allowOther && (
        <>
          <label className="flex items-center cursor-pointer group">
            <input
              type="checkbox"
              checked={isOtherSelected}
              onChange={(e) => handleOtherToggle(e.target.checked)}
              className="w-4 h-4 text-[#6295ff] bg-[#1a1a1a] border-[#2a2a2a] rounded focus:ring-[#6295ff] focus:ring-2"
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


