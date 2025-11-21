import { ButtonHTMLAttributes, forwardRef } from 'react';
import { cn } from '@/lib/cn';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', disabled, ...props }, ref) => {
    const baseStyles = 'inline-flex items-center justify-center rounded-full font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-[#6295ff] focus:ring-offset-2 focus:ring-offset-[#080808] disabled:opacity-50 disabled:pointer-events-none';
    
    const variants = {
      primary: 'bg-white text-[#080808] hover:bg-[#f5f5f7] active:border-2 active:border-[#6295ff]',
      secondary: 'bg-[#1a1a1a] text-[#f5f5f7] border border-[#2a2a2a] hover:border-[#6295ff] active:border-[#6295ff]',
      outline: 'border-2 border-[#2a2a2a] text-[#f5f5f7] hover:border-[#6295ff] active:border-[#6295ff]',
      ghost: 'text-[#f5f5f7] hover:bg-[#1a1a1a]',
    };

    const sizes = {
      sm: 'px-3 py-1.5 text-sm',
      md: 'px-4 py-2 text-base',
      lg: 'px-6 py-3 text-lg',
    };

    return (
      <button
        ref={ref}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        disabled={disabled}
        {...props}
      />
    );
  }
);

Button.displayName = 'Button';

export { Button };

