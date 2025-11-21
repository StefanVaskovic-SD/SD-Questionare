import type { SectionConfig } from '@/types/questionnaire';

interface ProgressIndicatorProps {
  sections: SectionConfig[];
  values: Record<string, string | string[]>;
}

export function ProgressIndicator({ sections, values }: ProgressIndicatorProps) {
  const allQuestions = sections.flatMap((section) => section.questions);
  const totalQuestions = allQuestions.length;
  const answeredQuestions = allQuestions.filter((question) => {
    const value = values[question.key];
    if (Array.isArray(value)) {
      return value.some((v) => v && v.trim() !== '');
    }
    return value && value.toString().trim() !== '';
  }).length;

  const percentage = totalQuestions > 0 ? Math.round((answeredQuestions / totalQuestions) * 100) : 0;

  return (
    <div className="bg-[#1a1a1a] rounded-lg border border-[#2a2a2a] p-4 mb-6">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-medium text-[#f5f5f7]">Progress</span>
        <span className="text-sm font-medium text-[#f5f5f7]">
          {answeredQuestions} / {totalQuestions} questions
        </span>
      </div>
      <div className="w-full bg-[#2a2a2a] rounded-full h-2">
        <div
          className="bg-[#6295ff] h-2 rounded-full transition-all duration-300"
          style={{ width: `${percentage}%` }}
        />
      </div>
      <p className="text-xs text-[#86868b] mt-2">{percentage}% complete</p>
    </div>
  );
}

