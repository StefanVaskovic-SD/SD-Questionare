'use client';

import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { FileUpload } from './FileUpload';
import { MultipleInputs } from './MultipleInputs';
import { SliderScale } from './SliderScale';
import { replacePlaceholders } from '@/lib/utils';
import type { QuestionConfig } from '@/types/questionnaire';

interface QuestionFieldProps {
  question: QuestionConfig;
  value: string | string[];
  onChange: (value: string | string[]) => void;
  error?: string;
  clientName: string;
  productName: string;
  questionnaireType?: string;
  questionnaireSlug?: string;
}

export function QuestionField({
  question,
  value,
  onChange,
  error,
  clientName,
  productName,
  questionnaireType,
  questionnaireSlug,
}: QuestionFieldProps) {
  const label = replacePlaceholders(question.label, clientName, productName);
  const placeholder = question.placeholder
    ? replacePlaceholders(question.placeholder, clientName, productName)
    : undefined;
  const helper = question.helper
    ? replacePlaceholders(question.helper, clientName, productName)
    : undefined;

  // Handle subfields (Primary/Secondary)
  if (question.type === 'subfields' && question.subfields) {
    const primaryValue = Array.isArray(value) ? value[0] || '' : '';
    const secondaryValue = Array.isArray(value) ? value[1] || '' : '';

    return (
      <div className="space-y-4" data-question-key={question.key}>
        <div>
          <label className="block text-sm font-medium text-[#f5f5f7] mb-2">
            {label}
            {question.required && <span className="text-red-500 ml-1">*</span>}
          </label>
          {helper && (
            <p className="text-sm text-[#86868b] italic mb-3">{helper}</p>
          )}
          
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-[#86868b] mb-1">
                {question.subfields.primary.label}
              </label>
              <Textarea
                data-key={question.key}
                value={primaryValue}
                onChange={(e) => {
                  const newValue = [e.target.value, secondaryValue];
                  onChange(newValue);
                }}
                placeholder={placeholder}
                error={!!error}
                className="min-h-[100px]"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-[#86868b] mb-1">
                {question.subfields.secondary.label}
              </label>
              <Textarea
                data-key={question.key}
                value={secondaryValue}
                onChange={(e) => {
                  const newValue = [primaryValue, e.target.value];
                  onChange(newValue);
                }}
                placeholder={placeholder}
                error={!!error}
                className="min-h-[100px]"
              />
            </div>
          </div>
        </div>
        {error && <p className="text-sm text-red-600">{error}</p>}
      </div>
    );
  }

  // Handle multiple inputs (sentence builder)
  if (question.type === 'multiple-inputs' && question.multipleInputs) {
    return (
      <div data-question-key={question.key}>
        <label className="block text-sm font-medium text-[#f5f5f7] mb-2">
          {label}
          {question.required && <span className="text-red-500 ml-1">*</span>}
        </label>
        {helper && (
          <p className="text-sm text-[#86868b] italic mb-3">{helper}</p>
        )}
        <MultipleInputs
          questionKey={question.key}
          template={question.multipleInputs.template}
          inputs={question.multipleInputs.inputs}
          value={value}
          onChange={onChange}
          error={error}
          clientName={clientName}
          productName={productName}
        />
      </div>
    );
  }

  // Handle slider scale
  if (question.type === 'slider' && question.sliderOptions) {
    return (
      <div data-question-key={question.key}>
        {label && (
          <label className="block text-sm font-medium text-[#f5f5f7] mb-2">
            {label}
            {question.required && <span className="text-red-500 ml-1">*</span>}
          </label>
        )}
        {helper && (
          <p className="text-sm text-[#86868b] italic mb-3">{helper}</p>
        )}
        <SliderScale
          questionKey={question.key}
          leftLabel={question.sliderOptions.leftLabel}
          rightLabel={question.sliderOptions.rightLabel}
          min={question.sliderOptions.min}
          max={question.sliderOptions.max}
          defaultValue={question.sliderOptions.defaultValue}
          value={value}
          onChange={onChange}
          error={error}
          clientName={clientName}
          productName={productName}
        />
      </div>
    );
  }

  // Handle file upload
  if (question.type === 'file') {
    const fileUrls = Array.isArray(value) ? value : [];
    
    return (
      <div data-question-key={question.key}>
        <label className="block text-sm font-medium text-[#f5f5f7] mb-2">
          {label}
          {question.required && <span className="text-red-500 ml-1">*</span>}
        </label>
        {helper && (
          <p className="text-sm text-[#86868b] italic mb-3">{helper}</p>
        )}
        <FileUpload
          questionKey={question.key}
          value={fileUrls}
          onChange={(urls) => onChange(urls)}
          error={error}
          questionnaireType={questionnaireType as any}
          questionnaireSlug={questionnaireSlug}
        />
        {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
      </div>
    );
  }

  // Handle regular text inputs
  const isTextarea = question.type === 'textarea';
  const inputValue = Array.isArray(value) ? value.join(', ') : value;

  return (
    <div data-question-key={question.key}>
      <label className="block text-sm font-medium text-[#f5f5f7] mb-2">
        {label}
        {question.required && <span className="text-red-500 ml-1">*</span>}
      </label>
      {helper && (
        <p className="text-sm text-[#86868b] italic mb-3">{helper}</p>
      )}
      
      {isTextarea ? (
        <Textarea
          data-key={question.key}
          value={inputValue}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          error={!!error}
        />
      ) : (
        <Input
          data-key={question.key}
          type={question.type}
          value={inputValue}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          error={!!error}
        />
      )}
      
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
}

