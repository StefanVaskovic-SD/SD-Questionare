'use client';

import { useEffect, useState } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { PasswordModal } from './PasswordModal';
import { isAdminAuthenticated, isPublicQuestionnairePath } from '@/lib/auth';

interface PasswordProtectionProps {
  children: React.ReactNode;
}

export function PasswordProtection({ children }: PasswordProtectionProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    // Check if this is a public questionnaire path (with token)
    const isPublic = isPublicQuestionnairePath(pathname, searchParams);
    
    if (isPublic) {
      // Public path - no password needed
      setIsAuthenticated(true);
      setIsChecking(false);
      return;
    }

    // Check if admin is already authenticated
    const authenticated = isAdminAuthenticated();
    setIsAuthenticated(authenticated);
    setIsChecking(false);
  }, [pathname, searchParams]);

  const handleAuthSuccess = () => {
    setIsAuthenticated(true);
  };

  // Show loading state while checking
  if (isChecking) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  // Show password modal if not authenticated
  if (!isAuthenticated) {
    return <PasswordModal onSuccess={handleAuthSuccess} />;
  }

  // Show protected content
  return <>{children}</>;
}

