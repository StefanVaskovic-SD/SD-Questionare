import { InputHTMLAttributes, forwardRef } from 'react';
import { cn } from '@/lib/cn';

export interface RadioProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label: string;
  error?: boolean;
}

const Radio = forwardRef<HTMLInputElement, RadioProps>(
  ({ className, label, error, id, ...props }, ref) => {
    const radioId = id || `radio-${Math.random().toString(36).substring(7)}`;
    
    return (
      <label
        htmlFor={radioId}
        className={cn(
          'flex items-center gap-3 cursor-pointer group',
          'hover:text-[#f5f5f7] transition-colors',
          className
        )}
      >
        <input
          type="radio"
          id={radioId}
          ref={ref}
          className={cn(
            'w-4 h-4 appearance-none rounded-full border-2 transition-colors',
            'bg-[#1a1a1a] border-[#2a2a2a]',
            'checked:border-[#6295ff] checked:bg-[#6295ff]',
            'checked:ring-2 checked:ring-[#6295ff] checked:ring-offset-2 checked:ring-offset-[#080808]',
            'focus:outline-none focus:ring-2 focus:ring-[#6295ff] focus:ring-offset-2 focus:ring-offset-[#080808]',
            'disabled:opacity-50 disabled:cursor-not-allowed',
            error && 'border-red-500',
            'relative',
            'before:content-[""] before:absolute before:inset-0 before:rounded-full',
            'checked:before:bg-[#6295ff] checked:before:scale-50'
          )}
          {...props}
        />
        <span className={cn(
          'text-[#86868b] group-hover:text-[#f5f5f7] transition-colors',
          props.checked && 'text-[#f5f5f7]'
        )}>
          {label}
        </span>
      </label>
    );
  }
);

Radio.displayName = 'Radio';

export { Radio };





