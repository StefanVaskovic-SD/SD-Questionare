'use client';

import { replacePlaceholders } from '@/lib/utils';

interface PurposeGoalSectionProps {
  purpose?: {
    title: string;
    content: string;
  };
  goal?: {
    title: string;
    content: string;
  };
  clientName: string;
  productName: string;
}

export function PurposeGoalSection({ purpose, goal, clientName, productName }: PurposeGoalSectionProps) {
  if (!purpose && !goal) return null;

  // If only one box exists, use single column; otherwise use two columns
  const gridCols = purpose && goal ? 'md:grid-cols-2' : 'md:grid-cols-1';

  return (
    <div className={`grid ${gridCols} gap-6 mb-8`}>
      {purpose && (
        <div className="bg-[#1a1a1a] rounded-lg border border-[#2a2a2a] p-6">
          <h3 className="text-xl font-semibold text-[#f5f5f7] mb-4">{purpose.title}</h3>
          <p className="text-[#86868b] whitespace-pre-line">
            {replacePlaceholders(purpose.content, clientName, productName)}
          </p>
        </div>
      )}
      {goal && (
        <div className="bg-[#1a1a1a] rounded-lg border border-[#2a2a2a] p-6">
          <h3 className="text-xl font-semibold text-[#f5f5f7] mb-4">{goal.title}</h3>
          <ul className="text-[#86868b] space-y-2 list-disc list-inside">
            {replacePlaceholders(goal.content, clientName, productName)
              .split('\n\n')
              .filter(item => item.trim() !== '')
              .map((item, index) => (
                <li key={index} className="text-[#86868b]">
                  {item.trim()}
                </li>
              ))}
          </ul>
        </div>
      )}
    </div>
  );
}

