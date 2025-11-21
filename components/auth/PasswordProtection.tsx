'use client';

import { useEffect, useState, Suspense } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { PasswordModal } from './PasswordModal';
import { isAdminAuthenticated, isPublicQuestionnairePath } from '@/lib/auth';

interface PasswordProtectionProps {
  children: React.ReactNode;
}

function PasswordProtectionContent({ children }: PasswordProtectionProps) {
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
      <div className="min-h-screen bg-[#080808] flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-[#6295ff] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-[#86868b]">Loading...</p>
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

function LoadingFallback() {
  return (
    <div className="min-h-screen bg-[#080808] flex items-center justify-center">
      <div className="text-center">
        <div className="w-8 h-8 border-4 border-[#6295ff] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-[#86868b]">Loading...</p>
      </div>
    </div>
  );
}

export function PasswordProtection({ children }: PasswordProtectionProps) {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <PasswordProtectionContent>{children}</PasswordProtectionContent>
    </Suspense>
  );
}

