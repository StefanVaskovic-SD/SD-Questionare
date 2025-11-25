import type { SectionConfig, QuestionConfig } from '@/types/questionnaire';
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

// Helper function to check if conditional field should be shown
function shouldShowConditionalField(
  question: QuestionConfig,
  values: Record<string, string | string[]>
): boolean {
  if (!question.conditionalFields) return true;
  
  const { dependsOn, showIf } = question.conditionalFields;
  const dependentValue = values[dependsOn];
  
  if (Array.isArray(showIf)) {
    // Multiple values trigger showing
    if (Array.isArray(dependentValue)) {
      return dependentValue.some((v) => showIf.includes(v));
    }
    return showIf.includes(String(dependentValue));
  } else {
    // Single value triggers showing
    if (Array.isArray(dependentValue)) {
      return dependentValue.includes(showIf);
    }
    return String(dependentValue) === showIf;
  }
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
          
          // Hide file upload for existing brand materials if not rebrand
          if (question.key === 'existing_brand_materials' && question.type === 'file') {
            const isRebrand = questionnaireType?.includes('rebrand');
            if (!isRebrand) {
              return null;
            }
          }
          
          // Check conditional field display
          if (!shouldShowConditionalField(question, values)) {
            return null;
          }
          
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
              {/* Render conditional fields if this question has them */}
              {question.conditionalFields?.fields.map((conditionalQuestion) => {
                if (!shouldShowConditionalField(conditionalQuestion, values)) {
                  return null;
                }
                return (
                  <div key={conditionalQuestion.key} className="mt-4 ml-4 pl-4 border-l-2 border-[#2a2a2a]">
                    <QuestionField
                      question={conditionalQuestion}
                      value={values[conditionalQuestion.key] || ''}
                      onChange={(value) => onChange(conditionalQuestion.key, value)}
                      error={errors[conditionalQuestion.key]}
                      clientName={clientName}
                      productName={productName}
                      questionnaireType={questionnaireType}
                      questionnaireSlug={questionnaireSlug}
                    />
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
}

