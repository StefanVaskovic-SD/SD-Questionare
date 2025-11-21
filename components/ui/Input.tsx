import { InputHTMLAttributes, forwardRef } from 'react';
import { cn } from '@/lib/cn';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, error, type = 'text', ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          'w-full px-4 py-2 bg-[#1a1a1a] border rounded-lg text-[#f5f5f7] placeholder:text-[#86868b] focus:outline-none focus:ring-2 focus:ring-offset-0 transition-colors',
          error
            ? 'border-red-500 focus:ring-red-500'
            : 'border-[#2a2a2a] focus:border-[#6295ff] focus:ring-[#6295ff]',
          'disabled:bg-[#1a1a1a] disabled:cursor-not-allowed disabled:opacity-50',
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);

Input.displayName = 'Input';

export { Input };

