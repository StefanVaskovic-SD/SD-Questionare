'use client';

import { useEffect, useState } from 'react';
import { PasswordProtection } from '@/components/auth/PasswordProtection';
import { supabase } from '@/lib/supabase';
import { getQuestionnaireUrl } from '@/lib/utils';
import type { Questionnaire, QuestionnaireType } from '@/types/questionnaire';
import Image from 'next/image';
import { Button } from '@/components/ui/Button';
import { useRouter } from 'next/navigation';
import { ExternalLink, Calendar, User, Package, CheckCircle, Clock, FileText, X } from 'lucide-react';
import { ConfirmationModal } from '@/components/ui/ConfirmationModal';
import toast from 'react-hot-toast';

type TabCategory = 'product-design' | 'web-design' | 'brand-design' | 'motion';

function ArchivePageContent() {
  const router = useRouter();
  const [questionnaires, setQuestionnaires] = useState<Questionnaire[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<TabCategory>('product-design');
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [questionnaireToDelete, setQuestionnaireToDelete] = useState<Questionnaire | null>(null);
  const [deleting, setDeleting] = useState(false);

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

  // Get questionnaires for active tab
  const getQuestionnairesForTab = (category: TabCategory): Questionnaire[] => {
    switch (category) {
      case 'product-design':
        return questionnaires.filter(q => 
          q.type === 'product-design-new' || q.type === 'product-design-redesign'
        );
      case 'web-design':
        return questionnaires.filter(q => 
          q.type === 'web-design-new' || q.type === 'web-design-redesign'
        );
      case 'brand-design':
        return questionnaires.filter(q => 
          q.type === 'brand-design-new' || q.type === 'brand-design-rebrand'
        );
      case 'motion':
        return questionnaires.filter(q => q.type === 'motion');
      default:
        return [];
    }
  };

  // Get type display name
  const getTypeDisplayName = (type: QuestionnaireType): string => {
    switch (type) {
      case 'product-design-new':
        return 'New Product';
      case 'product-design-redesign':
        return 'Redesign';
      case 'web-design-new':
        return 'New Website';
      case 'web-design-redesign':
        return 'Redesign';
      case 'brand-design-new':
        return 'New Brand Identity';
      case 'brand-design-rebrand':
        return 'Rebrand';
      case 'motion':
        return 'Motion';
      default:
        return type;
    }
  };

  const activeQuestionnaires = getQuestionnairesForTab(activeTab);

  // Group active questionnaires by type and sort by date
  const groupedByType = activeQuestionnaires
    .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
    .reduce((acc, questionnaire) => {
      if (!acc[questionnaire.type]) {
        acc[questionnaire.type] = [];
      }
      acc[questionnaire.type].push(questionnaire);
      return acc;
    }, {} as Record<QuestionnaireType, Questionnaire[]>);

  const tabs: { category: TabCategory; displayName: string }[] = [
    { category: 'product-design', displayName: 'Product Design' },
    { category: 'web-design', displayName: 'Web Design' },
    { category: 'brand-design', displayName: 'Brand Design' },
    { category: 'motion', displayName: 'Motion' },
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

  const handleDeleteClick = (questionnaire: Questionnaire) => {
    setQuestionnaireToDelete(questionnaire);
    setDeleteModalOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!questionnaireToDelete) return;

    setDeleting(true);
    try {
      // First, delete all files from storage
      const folderPath = `${questionnaireToDelete.type}/${questionnaireToDelete.slug}`;
      
      try {
        // List all files in the folder
        const { data: files, error: listError } = await supabase.storage
          .from('questionnaire-files')
          .list(folderPath);

        if (!listError && files && files.length > 0) {
          // Delete all files
          const filePaths = files.map(file => `${folderPath}/${file.name}`);
          const { error: deleteError } = await supabase.storage
            .from('questionnaire-files')
            .remove(filePaths);

          if (deleteError) {
            console.error('Error deleting files:', deleteError);
            // Continue with database deletion even if file deletion fails
          }
        }
      } catch (error) {
        console.error('Error deleting files from storage:', error);
        // Continue with database deletion even if file deletion fails
      }

      // Delete questionnaire from database (this will cascade delete responses and drafts)
      const { error: deleteError, data: deleteData } = await supabase
        .from('questionnaires')
        .delete()
        .eq('id', questionnaireToDelete.id)
        .select();

      if (deleteError) {
        console.error('Delete error details:', deleteError);
        throw deleteError;
      }

      // Verify deletion was successful
      if (!deleteData || deleteData.length === 0) {
        throw new Error('No rows were deleted. The questionnaire may not exist or you may not have permission to delete it.');
      }

      // Remove from local state
      setQuestionnaires(prev => prev.filter(q => q.id !== questionnaireToDelete.id));
      
      toast.success('Questionnaire deleted successfully');
      setDeleteModalOpen(false);
      setQuestionnaireToDelete(null);
    } catch (error) {
      console.error('Error deleting questionnaire:', error);
      toast.error('Failed to delete questionnaire. Please try again.');
    } finally {
      setDeleting(false);
    }
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
          <h1 className="text-4xl font-bold text-[#f5f5f7]">Archive</h1>
          <Button
            variant="outline"
            onClick={() => router.push('/questionnaires')}
          >
            Back to Home
          </Button>
        </div>

        {/* Tabs */}
        <div className="mb-8 border-b border-[#2a2a2a]">
          <div className="flex gap-1 overflow-x-auto">
            {tabs.map((tab) => {
              const isActive = activeTab === tab.category;
              const tabQuestionnaires = getQuestionnairesForTab(tab.category);
              const count = tabQuestionnaires.length;

              return (
                <button
                  key={tab.category}
                  onClick={() => setActiveTab(tab.category)}
                  className={`
                    px-6 py-3 text-sm font-medium transition-colors whitespace-nowrap
                    border-b-2 -mb-px
                    ${isActive
                      ? 'text-[#6295ff] border-[#6295ff] bg-[#6295ff]/5'
                      : 'text-[#86868b] border-transparent hover:text-[#f5f5f7] hover:border-[#2a2a2a]'
                    }
                  `}
                >
                  {tab.displayName}
                  {count > 0 && (
                    <span className={`
                      ml-2 px-2 py-0.5 rounded-full text-xs
                      ${isActive
                        ? 'bg-[#6295ff]/20 text-[#6295ff]'
                        : 'bg-[#2a2a2a] text-[#86868b]'
                      }
                    `}>
                      {count}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Questionnaires for Active Tab */}
        <div className="space-y-8">
          {(Object.entries(groupedByType) as [QuestionnaireType, Questionnaire[]][]).map(([type, typeQuestionnaires]) => (
            <div key={type} className="space-y-4">
              <h3 className="text-xl font-medium text-[#86868b]">
                {getTypeDisplayName(type)}:
              </h3>

              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {typeQuestionnaires.map((questionnaire) => (
                  <div
                    key={questionnaire.id}
                    className="bg-[#1a1a1a] rounded-lg border border-[#2a2a2a] p-6 hover:border-[#6295ff] transition-colors relative"
                  >
                    {/* Delete button */}
                    <button
                      onClick={() => handleDeleteClick(questionnaire)}
                      disabled={deleting}
                      className="absolute top-4 right-4 p-1.5 text-[#86868b] hover:text-red-400 hover:bg-red-500/10 rounded-full transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      title="Delete questionnaire"
                    >
                      <X className="w-4 h-4" />
                    </button>

                    <div className="space-y-4 pr-8">
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
          ))}

          {activeQuestionnaires.length === 0 && (
            <div className="text-center py-12">
              <p className="text-[#86868b] text-lg">
                No questionnaires found for {tabs.find(t => t.category === activeTab)?.displayName}.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      <ConfirmationModal
        isOpen={deleteModalOpen}
        onClose={() => {
          setDeleteModalOpen(false);
          setQuestionnaireToDelete(null);
        }}
        onConfirm={handleDeleteConfirm}
        title="Delete Questionnaire"
        message={
          questionnaireToDelete
            ? `Are you sure you want to delete the questionnaire for "${questionnaireToDelete.client_name}" - "${questionnaireToDelete.product_name}"? This action cannot be undone and will delete all associated responses, drafts, and files.`
            : ''
        }
        confirmText={deleting ? 'Deleting...' : 'Delete'}
        cancelText="Cancel"
        confirmVariant="primary"
        isLoading={deleting}
      />
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



