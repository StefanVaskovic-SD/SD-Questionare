'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { supabase } from '@/lib/supabase';
import { CheckCircle } from 'lucide-react';

interface PageProps {
  params: {
    type: string;
    slug: string;
  };
}

export default function SuccessPage({ params }: PageProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get('token');
  const [verified, setVerified] = useState(false);

  useEffect(() => {
    async function verifyAccess() {
      if (!token) {
        router.push('/questionnaires');
        return;
      }

      try {
        const { data, error } = await supabase
          .from('questionnaires')
          .select('*')
          .eq('type', params.type)
          .eq('slug', params.slug)
          .eq('access_token', token)
          .single();

        if (error || !data || data.status !== 'submitted') {
          router.push('/questionnaires');
          return;
        }

        setVerified(true);
      } catch (error) {
        router.push('/questionnaires');
      }
    }

    verifyAccess();
  }, [token, params.type, params.slug, router]);

  if (!verified) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">Verifying...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-md p-8 max-w-md w-full text-center">
        <div className="flex justify-center mb-6">
          <CheckCircle className="w-16 h-16 text-green-600" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Thank You!
        </h1>
        <p className="text-gray-600 mb-8">
          Your questionnaire has been submitted successfully. We&apos;ll review your responses and get back to you soon.
        </p>
        <Button onClick={() => router.push('/questionnaires')}>
          Return to Home
        </Button>
      </div>
    </div>
  );
}

