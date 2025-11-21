'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { authenticateAdmin } from '@/lib/auth';
import toast from 'react-hot-toast';
import { Lock, X } from 'lucide-react';

interface PasswordModalProps {
  onSuccess: () => void;
}

export function PasswordModal({ onSuccess }: PasswordModalProps) {
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!password.trim()) {
      toast.error('Please enter a password');
      return;
    }

    setIsSubmitting(true);
    
    // Small delay to show loading state
    await new Promise(resolve => setTimeout(resolve, 300));
    
    if (authenticateAdmin(password)) {
      toast.success('Access granted');
      onSuccess();
    } else {
      toast.error('Incorrect password');
      setPassword('');
    }
    
    setIsSubmitting(false);
  };

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50">
      <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg shadow-xl max-w-md w-full p-8 relative">
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 bg-[#2a2a2a] rounded-full flex items-center justify-center">
            <Lock className="w-8 h-8 text-[#6295ff]" />
          </div>
        </div>
        
        <h2 className="text-2xl font-bold text-[#f5f5f7] text-center mb-2">
          Access Denied
        </h2>
        
        <p className="text-[#86868b] text-center mb-6">
          This page is password protected
        </p>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Input
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={isSubmitting}
              className="w-full"
              autoFocus
            />
          </div>
          
          <Button
            type="submit"
            disabled={isSubmitting || !password.trim()}
            className="w-full"
          >
            {isSubmitting ? 'Verifying...' : 'Access'}
          </Button>
        </form>
      </div>
    </div>
  );
}

