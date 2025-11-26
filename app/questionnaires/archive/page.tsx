'use client';

import { useEffect, useState } from 'react';
import { PasswordProtection } from '@/components/auth/PasswordProtection';
import { supabase } from '@/lib/supabase';
import { getQuestionnaireUrl } from '@/lib/utils';
import type { Questionnaire, QuestionnaireType, QuestionnaireCategory } from '@/types/questionnaire';
import Image from 'next/image';
import { Button } from '@/components/ui/Button';
import { useRouter } from 'next/navigation';
import { ExternalLink, Calendar, User, Package, CheckCircle, Clock, FileText } from 'lucide-react';

interface GroupedQuestionnaires {
  category: QuestionnaireCategory;
  displayName: string;
  types: {
    type: QuestionnaireType;
    displayName: string;
    questionnaires: Questionnaire[];
  }[];
}

function ArchivePageContent() {
  const router = useRouter();
  const [questionnaires, setQuestionnaires] = useState<Questionnaire[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadQuestionnaires() {
      try {
        const { data, error } = await supabase
          .from('questionnaires')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) {
          console.error('Error loading questionnaires:', error);
          return;
        }

        setQuestionnaires(data || []);
      } catch (error) {
        console.error('Error loading questionnaires:', error);
      } finally {
        setLoading(false);
      }
    }

    loadQuestionnaires();
  }, []);

  // Group questionnaires by category and type
  const groupedQuestionnaires: GroupedQuestionnaires[] = [
    {
      category: 'product-design',
      displayName: 'Product Design',
      types: [
        {
          type: 'product-design-new',
          displayName: 'New Product',
          questionnaires: questionnaires.filter(q => q.type === 'product-design-new'),
        },
        {
          type: 'product-design-redesign',
          displayName: 'Redesign',
          questionnaires: questionnaires.filter(q => q.type === 'product-design-redesign'),
        },
      ],
    },
    {
      category: 'web-design',
      displayName: 'Web Design',
      types: [
        {
          type: 'web-design-new',
          displayName: 'New Website',
          questionnaires: questionnaires.filter(q => q.type === 'web-design-new'),
        },
        {
          type: 'web-design-redesign',
          displayName: 'Redesign',
          questionnaires: questionnaires.filter(q => q.type === 'web-design-redesign'),
        },
      ],
    },
    {
      category: 'brand-design',
      displayName: 'Brand Design',
      types: [
        {
          type: 'brand-design-new',
          displayName: 'New Brand Identity',
          questionnaires: questionnaires.filter(q => q.type === 'brand-design-new'),
        },
        {
          type: 'brand-design-rebrand',
          displayName: 'Rebrand',
          questionnaires: questionnaires.filter(q => q.type === 'brand-design-rebrand'),
        },
      ],
    },
    {
      category: 'motion',
      displayName: 'Motion',
      types: [
        {
          type: 'motion',
          displayName: 'Motion',
          questionnaires: questionnaires.filter(q => q.type === 'motion'),
        },
      ],
    },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'submitted':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-green-500/20 text-green-400 border border-green-500/30">
            <CheckCircle className="w-3 h-3" />
            Submitted
          </span>
        );
      case 'in-progress':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-yellow-500/20 text-yellow-400 border border-yellow-500/30">
            <Clock className="w-3 h-3" />
            In Progress
          </span>
        );
      case 'not-started':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-gray-500/20 text-gray-400 border border-gray-500/30">
            <FileText className="w-3 h-3" />
            Not Started
          </span>
        );
      default:
        return null;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#080808] flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-[#6295ff] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-[#86868b]">Loading archive...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#080808] p-4 py-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 flex justify-center">
          <Image
            src="/sd-logo.svg"
            alt="StudioDirection"
            width={216}
            height={24}
            className="mb-8"
          />
        </div>

        <div className="flex items-center justify-between mb-8">
          <h1 className="text-4xl font-bold text-[#f5f5f7]">Questionnaire Archive</h1>
          <Button
            variant="outline"
            onClick={() => router.push('/questionnaires')}
          >
            Back to Home
          </Button>
        </div>

        {/* Grouped Questionnaires */}
        <div className="space-y-12">
          {groupedQuestionnaires.map((categoryGroup) => (
            <div key={categoryGroup.category} className="space-y-6">
              <h2 className="text-2xl font-semibold text-[#f5f5f7] border-b border-[#2a2a2a] pb-2">
                {categoryGroup.displayName}
              </h2>

              {categoryGroup.types.map((typeGroup) => {
                if (typeGroup.questionnaires.length === 0) return null;

                return (
                  <div key={typeGroup.type} className="space-y-4">
                    <h3 className="text-xl font-medium text-[#86868b] ml-4">
                      {typeGroup.displayName}:
                    </h3>

                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                      {typeGroup.questionnaires.map((questionnaire) => (
                        <div
                          key={questionnaire.id}
                          className="bg-[#1a1a1a] rounded-lg border border-[#2a2a2a] p-6 hover:border-[#6295ff] transition-colors"
                        >
                          <div className="space-y-4">
                            {/* Client and Product Name */}
                            <div>
                              <div className="flex items-start gap-2 mb-2">
                                <User className="w-4 h-4 text-[#86868b] mt-0.5 flex-shrink-0" />
                                <div className="flex-1 min-w-0">
                                  <p className="text-sm text-[#86868b]">Client</p>
                                  <p className="text-[#f5f5f7] font-medium truncate">
                                    {questionnaire.client_name}
                                  </p>
                                </div>
                              </div>
                              <div className="flex items-start gap-2">
                                <Package className="w-4 h-4 text-[#86868b] mt-0.5 flex-shrink-0" />
                                <div className="flex-1 min-w-0">
                                  <p className="text-sm text-[#86868b]">Product</p>
                                  <p className="text-[#f5f5f7] font-medium truncate">
                                    {questionnaire.product_name}
                                  </p>
                                </div>
                              </div>
                            </div>

                            {/* Status */}
                            <div className="flex items-center justify-between">
                              <span className="text-sm text-[#86868b]">Status</span>
                              {getStatusBadge(questionnaire.status)}
                            </div>

                            {/* Created Date */}
                            <div className="flex items-start gap-2">
                              <Calendar className="w-4 h-4 text-[#86868b] mt-0.5 flex-shrink-0" />
                              <div className="flex-1 min-w-0">
                                <p className="text-sm text-[#86868b]">Created</p>
                                <p className="text-[#f5f5f7] text-sm">
                                  {formatDate(questionnaire.created_at)}
                                </p>
                              </div>
                            </div>

                            {/* Link */}
                            <div className="pt-2 border-t border-[#2a2a2a]">
                              <a
                                href={getQuestionnaireUrl(
                                  questionnaire.type,
                                  questionnaire.slug,
                                  questionnaire.access_token
                                )}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 text-[#6295ff] hover:text-[#7aa5ff] transition-colors text-sm font-medium"
                              >
                                <ExternalLink className="w-4 h-4" />
                                View Questionnaire
                              </a>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          ))}
        </div>

        {questionnaires.length === 0 && (
          <div className="text-center py-12">
            <p className="text-[#86868b] text-lg">No questionnaires found in archive.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default function ArchivePage() {
  return (
    <PasswordProtection>
      <ArchivePageContent />
    </PasswordProtection>
  );
}

