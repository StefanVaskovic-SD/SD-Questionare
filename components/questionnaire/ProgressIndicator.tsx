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
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-medium text-gray-700">Progress</span>
        <span className="text-sm font-medium text-gray-900">
          {answeredQuestions} / {totalQuestions} questions
        </span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div
          className="bg-blue-600 h-2 rounded-full transition-all duration-300"
          style={{ width: `${percentage}%` }}
        />
      </div>
      <p className="text-xs text-gray-500 mt-2">{percentage}% complete</p>
    </div>
  );
}

