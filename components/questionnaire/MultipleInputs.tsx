'use client';

import { useState, useEffect } from 'react';
import { Input } from '@/components/ui/Input';
import { replacePlaceholders } from '@/lib/utils';

interface MultipleInputsProps {
  questionKey: string;
  template: string; // e.g., "We help {0} to {1} by {2}."
  inputs: Array<{ key: string; label: string; placeholder?: string }>;
  value: string | string[];
  onChange: (value: string | string[]) => void;
  error?: string;
  clientName: string;
  productName: string;
}

export function MultipleInputs({
  questionKey,
  template,
  inputs,
  value,
  onChange,
  error,
  clientName,
  productName,
}: MultipleInputsProps) {
  // Parse current value or initialize with empty strings
  const currentValue = typeof value === 'string' ? value : '';
  const [inputValues, setInputValues] = useState<string[]>(() => {
    // Try to extract values from the current sentence if it exists
    if (currentValue) {
      // Simple extraction - try to match the template pattern
      const parts = currentValue.match(/We help (.+?) to (.+?) by (.+?)\./);
      if (parts && parts.length === 4) {
        return [parts[1], parts[2], parts[3]];
      }
    }
    return inputs.map(() => '');
  });

  // Update the combined sentence whenever input values change
  useEffect(() => {
    const sentence = template.replace(/\{(\d+)\}/g, (match, index) => {
      const idx = parseInt(index, 10);
      return inputValues[idx] || '';
    });
    onChange(sentence);
  }, [inputValues, template, onChange]);

  const handleInputChange = (index: number, newValue: string) => {
    const newInputValues = [...inputValues];
    newInputValues[index] = newValue;
    setInputValues(newInputValues);
  };

  return (
    <div className="space-y-4" data-question-key={questionKey}>
      <div className="text-sm text-[#86868b] mb-4 italic">
        {replacePlaceholders(template, clientName, productName)}
      </div>
      {inputs.map((input, index) => (
        <div key={input.key}>
          <label className="block text-xs font-medium text-[#86868b] mb-1">
            {replacePlaceholders(input.label, clientName, productName)}
          </label>
          <Input
            value={inputValues[index] || ''}
            onChange={(e) => handleInputChange(index, e.target.value)}
            placeholder={input.placeholder ? replacePlaceholders(input.placeholder, clientName, productName) : undefined}
            error={!!error}
          />
        </div>
      ))}
      {error && <p className="text-sm text-red-600">{error}</p>}
    </div>
  );
}

