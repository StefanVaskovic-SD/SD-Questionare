import type { SectionConfig } from '@/types/questionnaire';
import { QuestionField } from './QuestionField';

interface QuestionSectionProps {
  section: SectionConfig;
  values: Record<string, string | string[]>;
  onChange: (key: string, value: string | string[]) => void;
  errors: Record<string, string | undefined>;
  clientName: string;
  productName: string;
  questionnaireType?: string;
  questionnaireSlug?: string;
}

export function QuestionSection({
  section,
  values,
  onChange,
  errors,
  clientName,
  productName,
  questionnaireType,
  questionnaireSlug,
}: QuestionSectionProps) {
  return (
    <div className="bg-[#1a1a1a] rounded-lg border border-[#2a2a2a] p-6 md:p-8">
      <h2 className="text-2xl font-bold text-[#f5f5f7] mb-2">{section.title}</h2>
      {section.intro && (
        <p className="text-[#86868b] mb-6 italic">{section.intro}</p>
      )}
      
      <div className="space-y-6">
        {section.questions.map((question) => (
          <QuestionField
            key={question.key}
            question={question}
            value={values[question.key] || ''}
            onChange={(value) => onChange(question.key, value)}
            error={errors[question.key]}
            clientName={clientName}
            productName={productName}
            questionnaireType={questionnaireType}
            questionnaireSlug={questionnaireSlug}
          />
        ))}
      </div>
    </div>
  );
}

