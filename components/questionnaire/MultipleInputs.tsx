'use client';

import { useState, useEffect, useRef } from 'react';
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

  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Update the combined sentence whenever input values change
  useEffect(() => {
    const sentence = template.replace(/\{(\d+)\}/g, (match, index) => {
      const idx = parseInt(index, 10);
      return inputValues[idx] || '';
    });
    onChange(sentence);
  }, [inputValues, template, onChange]);

  // Auto-resize inputs based on content
  const resizeInput = (index: number) => {
    const ref = inputRefs.current[index];
    if (ref) {
      // Create a temporary span to measure text width
      const span = document.createElement('span');
      span.style.visibility = 'hidden';
      span.style.position = 'absolute';
      span.style.whiteSpace = 'pre';
      span.style.font = window.getComputedStyle(ref).font;
      span.textContent = inputValues[index] || ref.placeholder || 'M';
      document.body.appendChild(span);
      const width = span.offsetWidth;
      document.body.removeChild(span);
      
      // Set minimum width and expand based on content
      const minWidth = 120;
      ref.style.width = `${Math.max(minWidth, width + 30)}px`;
    }
  };

  useEffect(() => {
    inputRefs.current.forEach((_, index) => {
      resizeInput(index);
    });
  }, [inputValues]);

  const handleInputChange = (index: number, newValue: string) => {
    const newInputValues = [...inputValues];
    newInputValues[index] = newValue;
    setInputValues(newInputValues);
  };

  // Split template into parts (text and input placeholders)
  const templateParts: Array<{ type: 'text' | 'input'; content: string; index?: number }> = [];
  let lastIndex = 0;
  const regex = /\{(\d+)\}/g;
  let match;

  while ((match = regex.exec(template)) !== null) {
    // Add text before the placeholder
    if (match.index > lastIndex) {
      templateParts.push({
        type: 'text',
        content: template.substring(lastIndex, match.index),
      });
    }
    // Add input placeholder
    templateParts.push({
      type: 'input',
      content: match[0],
      index: parseInt(match[1], 10),
    });
    lastIndex = regex.lastIndex;
  }
  // Add remaining text
  if (lastIndex < template.length) {
    templateParts.push({
      type: 'text',
      content: template.substring(lastIndex),
    });
  }

  return (
    <div className="space-y-4 pb-4" data-question-key={questionKey}>
      <div className="flex flex-wrap items-center gap-2 text-base">
        {templateParts.map((part, partIndex) => {
          if (part.type === 'text') {
            return (
              <span key={partIndex} className="text-[#f5f5f7] whitespace-pre-wrap">
                {replacePlaceholders(part.content, clientName, productName)}
              </span>
            );
          } else {
            const inputIndex = part.index!;
            const input = inputs[inputIndex];
            const label = input.label.replace(/[\[\]]/g, ''); // Remove brackets from label
            
            return (
              <div key={partIndex} className="inline-flex flex-col items-center relative">
                <input
                  ref={(el) => {
                    inputRefs.current[inputIndex] = el;
                    if (el) {
                      // Resize on mount
                      setTimeout(() => resizeInput(inputIndex), 0);
                    }
                  }}
                  type="text"
                  value={inputValues[inputIndex] || ''}
                  onChange={(e) => {
                    handleInputChange(inputIndex, e.target.value);
                    // Resize after value change
                    setTimeout(() => resizeInput(inputIndex), 0);
                  }}
                  onFocus={() => resizeInput(inputIndex)}
                  placeholder={input.placeholder ? replacePlaceholders(input.placeholder, clientName, productName) : label}
                  className="min-w-[120px] px-2 py-1 bg-[#1a1a1a] border border-[#2a2a2a] rounded text-[#f5f5f7] placeholder:text-[#86868b] focus:outline-none focus:ring-2 focus:ring-offset-0 transition-colors focus:border-[#6295ff] focus:ring-[#6295ff]"
                  style={{ width: 'auto' }}
                />
                <span className="text-xs text-[#86868b] mt-1 absolute top-full">{label}</span>
              </div>
            );
          }
        })}
      </div>
      {error && <p className="text-sm text-red-600">{error}</p>}
    </div>
  );
}

