'use client';

interface PurposeGoalSectionProps {
  purpose?: {
    title: string;
    content: string;
  };
  goal?: {
    title: string;
    content: string;
  };
}

export function PurposeGoalSection({ purpose, goal }: PurposeGoalSectionProps) {
  if (!purpose && !goal) return null;

  return (
    <div className="grid md:grid-cols-2 gap-6 mb-8">
      {purpose && (
        <div className="bg-[#1a1a1a] rounded-lg border border-[#2a2a2a] p-6">
          <h3 className="text-xl font-semibold text-[#f5f5f7] mb-4">{purpose.title}</h3>
          <p className="text-[#86868b] whitespace-pre-line">{purpose.content}</p>
        </div>
      )}
      {goal && (
        <div className="bg-[#1a1a1a] rounded-lg border border-[#2a2a2a] p-6">
          <h3 className="text-xl font-semibold text-[#f5f5f7] mb-4">{goal.title}</h3>
          <p className="text-[#86868b] whitespace-pre-line">{goal.content}</p>
        </div>
      )}
    </div>
  );
}

