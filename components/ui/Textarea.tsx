'use client';

import { TextareaHTMLAttributes, forwardRef, useEffect, useRef } from 'react';
import { cn } from '@/lib/cn';

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: boolean;
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, error, value, onChange, ...props }, ref) => {
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const isControlled = value !== undefined;

    // Combine refs
    const combinedRef = (node: HTMLTextAreaElement | null) => {
      textareaRef.current = node;
      if (typeof ref === 'function') {
        ref(node);
      } else if (ref) {
        ref.current = node;
      }
    };

    // Auto-resize function
    const adjustHeight = () => {
      const textarea = textareaRef.current;
      if (!textarea) return;

      // Reset height to auto to get the correct scrollHeight
      textarea.style.height = 'auto';
      // Set height to scrollHeight (content height)
      textarea.style.height = `${textarea.scrollHeight}px`;
    };

    // Adjust height on mount and when value changes
    useEffect(() => {
      adjustHeight();
    }, [value]);

    // Handle onChange with auto-resize
    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      adjustHeight();
      if (onChange) {
        onChange(e);
      }
    };

    return (
      <textarea
        ref={combinedRef}
        className={cn(
          'w-full px-4 py-2 bg-[#1a1a1a] border rounded-lg text-[#f5f5f7] placeholder:text-[#86868b] focus:outline-none focus:ring-2 focus:ring-offset-0 transition-colors resize-none overflow-hidden min-h-[100px]',
          error
            ? 'border-red-500 focus:ring-red-500'
            : 'border-[#2a2a2a] focus:border-[#6295ff] focus:ring-[#6295ff]',
          'disabled:bg-[#1a1a1a] disabled:cursor-not-allowed disabled:opacity-50',
          className
        )}
        value={value}
        onChange={handleChange}
        {...props}
      />
    );
  }
);

Textarea.displayName = 'Textarea';

export { Textarea };

