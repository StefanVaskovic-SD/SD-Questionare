'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { CheckCircle } from 'lucide-react';
import Image from 'next/image';
import { getQuestionnaireConfig } from '@/config/questions';
import { replacePlaceholders } from '@/lib/utils';
import type { Questionnaire } from '@/types/questionnaire';

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
  const [questionnaire, setQuestionnaire] = useState<Questionnaire | null>(null);

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

        setQuestionnaire(data);
        setVerified(true);
      } catch (error) {
        router.push('/questionnaires');
      }
    }

    verifyAccess();
  }, [token, params.type, params.slug, router]);

  if (!verified) {
    return (
      <div className="min-h-screen bg-[#080808] flex items-center justify-center">
        <div className="text-center">
          <p className="text-[#86868b]">Verifying...</p>
        </div>
      </div>
    );
  }

  // Get custom thank you message from config
  const questionnaireConfig = questionnaire ? getQuestionnaireConfig(params.type) : null;
  const thankYouMessage = questionnaireConfig?.thankYouMessage 
    ? replacePlaceholders(
        questionnaireConfig.thankYouMessage,
        questionnaire?.client_name || '',
        questionnaire?.product_name || ''
      )
    : 'Your questionnaire has been submitted successfully. We\'ll review your responses and get back to you soon.';

  return (
    <div className="min-h-screen bg-[#080808] flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="mb-8 flex justify-center">
          <Image
            src="/sd-logo.svg"
            alt="StudioDirection"
            width={216}
            height={24}
          />
        </div>
        <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg p-8 text-center">
          <div className="flex justify-center mb-6">
            <CheckCircle className="w-16 h-16 text-[#6295ff]" />
          </div>
          <h1 className="text-3xl font-bold text-[#f5f5f7] mb-4">
            Thank You!
          </h1>
          <p className="text-[#86868b] whitespace-pre-line">
            {thankYouMessage}
          </p>
        </div>
      </div>
    </div>
  );
}

