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
      {section.description && (
        <p className="text-[#86868b] mb-6">{section.description}</p>
      )}
      
      <div className="space-y-6">
        {section.questions.map((question, index) => {
          // Check if this question has a groupTitle and if previous question doesn't
          const showGroupTitle = question.groupTitle && 
            (index === 0 || !section.questions[index - 1]?.groupTitle || 
             section.questions[index - 1]?.groupTitle !== question.groupTitle);
          
          return (
            <div key={question.key}>
              {showGroupTitle && question.groupTitle && (
                <h3 className="text-lg font-semibold text-[#f5f5f7] mb-4 mt-2">
                  {question.groupTitle}
                </h3>
              )}
              <QuestionField
                question={question}
                value={values[question.key] || ''}
                onChange={(value) => onChange(question.key, value)}
                error={errors[question.key]}
                clientName={clientName}
                productName={productName}
                questionnaireType={questionnaireType}
                questionnaireSlug={questionnaireSlug}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}

