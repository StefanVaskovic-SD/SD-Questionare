'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/Button';
import { isAdminAuthenticated, logoutAdmin } from '@/lib/auth';
import { LogOut } from 'lucide-react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

export default function QuestionnairesPage() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    setIsAuthenticated(isAdminAuthenticated());
  }, []);

  const handleLogout = () => {
    logoutAdmin();
    toast.success('Logged out successfully');
    // Redirect to home to trigger password modal
    window.location.href = '/';
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        <div className="flex justify-between items-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900">
            StudioDirection Questionnaires
          </h1>
          {isAuthenticated && (
            <Button
              variant="outline"
              size="sm"
              onClick={handleLogout}
              className="flex items-center gap-2"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </Button>
          )}
        </div>
        
        <div className="grid gap-6 md:grid-cols-3">
          <Link
            href="/questionnaires/product-design"
            className="bg-white rounded-lg shadow-md p-8 hover:shadow-lg transition-shadow text-center group"
          >
            <h2 className="text-2xl font-semibold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors">
              Product Design
            </h2>
            <p className="text-gray-600">
              Create a product design questionnaire
            </p>
          </Link>

          <Link
            href="/questionnaires/web-design"
            className="bg-white rounded-lg shadow-md p-8 hover:shadow-lg transition-shadow text-center group"
          >
            <h2 className="text-2xl font-semibold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors">
              Web Design
            </h2>
            <p className="text-gray-600">
              Create a web design questionnaire
            </p>
          </Link>

          <Link
            href="/questionnaires/brand-design"
            className="bg-white rounded-lg shadow-md p-8 hover:shadow-lg transition-shadow text-center group"
          >
            <h2 className="text-2xl font-semibold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors">
              Brand Design
            </h2>
            <p className="text-gray-600">
              Create a brand design questionnaire
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
}

