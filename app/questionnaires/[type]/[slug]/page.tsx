'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/Button';
import { QuestionSection } from '@/components/questionnaire/QuestionSection';
import { ProgressIndicator } from '@/components/questionnaire/ProgressIndicator';
import { supabase } from '@/lib/supabase';
import { getQuestionsByType, getAllQuestions } from '@/config/questions';
import { triggerWebhook } from '@/lib/webhook';
import type { Questionnaire, QuestionnaireType, QuestionConfig } from '@/types/questionnaire';
import toast from 'react-hot-toast';
import { Save, Send, Loader2, Download } from 'lucide-react';
import { generateCsvFromResponses, generateCsvFilename } from '@/lib/csv';
import Image from 'next/image';

interface PageProps {
  params: {
    type: string;
    slug: string;
  };
}

export default function QuestionnairePage({ params }: PageProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get('token');

  const [questionnaire, setQuestionnaire] = useState<Questionnaire | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [lastSavedAt, setLastSavedAt] = useState<string | null>(null);

  const type = params.type as QuestionnaireType;
  const sections = getQuestionsByType(type);
  const allQuestions = getAllQuestions(sections);

  // Create dynamic Zod schema based on questions
  const createValidationSchema = () => {
    const schemaFields: Record<string, z.ZodTypeAny> = {};
    
    allQuestions.forEach((question) => {
      if (question.type === 'subfields' && question.subfields) {
        // For subfields, validate as array (but allow empty strings)
        schemaFields[question.key] = question.required
          ? z.array(z.string()).refine(
              (arr) => arr && arr.length === 2 && (arr[0]?.trim() || arr[1]?.trim()),
              'At least one field is required'
            )
          : z.array(z.string()).length(2).optional();
      } else if (question.type === 'file') {
        // For files, validate as array of strings (URLs)
        schemaFields[question.key] = question.required
          ? z.array(z.string()).min(1, 'At least one file is required')
          : z.array(z.string()).optional();
      } else {
        // For regular fields
        schemaFields[question.key] = question.required
          ? z.string().min(1, 'This field is required')
          : z.string().optional();
      }
    });

    return z.object(schemaFields);
  };

  const formSchema = createValidationSchema();
  type FormData = z.infer<typeof formSchema>;

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    reset,
    trigger,
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {},
  });

  const formValues = watch();

  // Verify token and load questionnaire
  useEffect(() => {
    async function loadQuestionnaire() {
      if (!token) {
        toast.error('Missing access token');
        router.push('/questionnaires');
        return;
      }

      try {
        // Verify token and get questionnaire
        const { data, error } = await supabase
          .from('questionnaires')
          .select('*')
          .eq('type', type)
          .eq('slug', params.slug)
          .eq('access_token', token)
          .single();

        if (error || !data) {
          toast.error('Invalid or expired access token');
          router.push('/questionnaires');
          return;
        }

        setQuestionnaire(data);

        // Load existing responses
        const { data: responses } = await supabase
          .from('questionnaire_responses')
          .select('*')
          .eq('questionnaire_id', data.id);

        // Load draft if exists
        const { data: draft } = await supabase
          .from('draft_saves')
          .select('*')
          .eq('questionnaire_id', data.id)
          .single();

        // Populate form with existing data (draft takes priority)
        const formData: Record<string, string | string[]> = {};

        if (draft?.draft_data) {
          // Use draft data
          Object.entries(draft.draft_data).forEach(([key, value]) => {
            formData[key] = value as string | string[];
          });
          setLastSavedAt(draft.saved_at);
        } else if (responses) {
          // Use saved responses
          responses.forEach((response) => {
            if (response.answer_files && response.answer_files.length > 0) {
              formData[response.question_key] = response.answer_files;
            } else if (response.answer_text) {
              // Check if this is a subfield question
              const question = allQuestions.find((q) => q.key === response.question_key);
              if (question?.type === 'subfields') {
                // Try to parse as array, or split by newline
                try {
                  const parsed = JSON.parse(response.answer_text);
                  if (Array.isArray(parsed)) {
                    formData[response.question_key] = parsed;
                  } else {
                    formData[response.question_key] = ['', ''];
                  }
                } catch {
                  formData[response.question_key] = ['', ''];
                }
              } else {
                formData[response.question_key] = response.answer_text;
              }
            }
          });
        }

        // Initialize empty values for all questions
        allQuestions.forEach((question) => {
          if (!formData[question.key]) {
            if (question.type === 'subfields' || question.type === 'file') {
              formData[question.key] = [];
            } else {
              formData[question.key] = '';
            }
          }
        });

        // Set form values
        Object.entries(formData).forEach(([key, value]) => {
          setValue(key as keyof FormData, value as any);
        });

        // Update status if needed
        if (data.status === 'not-started' && Object.keys(formData).length > 0) {
          await supabase
            .from('questionnaires')
            .update({ status: 'in-progress' })
            .eq('id', data.id);
        }
      } catch (error) {
        console.error('Error loading questionnaire:', error);
        toast.error('Failed to load questionnaire');
        router.push('/questionnaires');
      } finally {
        setLoading(false);
      }
    }

    loadQuestionnaire();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token, type, params.slug, router, setValue]);

  const saveDraft = async () => {
    if (!questionnaire) return;

    setSaving(true);
    try {
      // Get current form values without validation
      const currentValues = watch();
      
      const { error } = await supabase
        .from('draft_saves')
        .upsert(
          {
            questionnaire_id: questionnaire.id,
            draft_data: currentValues as Record<string, string | string[]>,
          },
          {
            onConflict: 'questionnaire_id',
          }
        );

      if (error) throw error;

      // Update last_saved_at
      await supabase
        .from('questionnaires')
        .update({ last_saved_at: new Date().toISOString() })
        .eq('id', questionnaire.id);

      setLastSavedAt(new Date().toISOString());
      toast.success('Draft saved successfully!');
    } catch (error) {
      console.error('Error saving draft:', error);
      toast.error('Failed to save draft');
    } finally {
      setSaving(false);
    }
  };

  const scrollToFirstError = (errorFields?: typeof errors) => {
    // Wait a bit for errors to be rendered
    setTimeout(() => {
      // Use provided errors or fallback to state errors
      const errorsToUse = errorFields || errors;
      const errorKeys = Object.keys(errorsToUse);
      
      if (errorKeys.length > 0) {
        const firstErrorKey = errorKeys[0];
        
        // Try multiple selectors to find the error element
        const errorElement = 
          document.querySelector(`input[data-key="${firstErrorKey}"]`) ||
          document.querySelector(`textarea[data-key="${firstErrorKey}"]`) ||
          document.querySelector(`[data-question-key="${firstErrorKey}"]`) ||
          document.querySelector(`[name="${firstErrorKey}"]`) ||
          document.querySelector(`[id="${firstErrorKey}"]`);
        
        if (errorElement) {
          errorElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
          // Focus on the element if it's an input
          if (errorElement instanceof HTMLElement && (errorElement.tagName === 'INPUT' || errorElement.tagName === 'TEXTAREA')) {
            errorElement.focus();
          }
        } else {
          // Fallback: scroll to the question container
          const questionContainer = document.querySelector(`[data-question-key="${firstErrorKey}"]`);
          if (questionContainer) {
            questionContainer.scrollIntoView({ behavior: 'smooth', block: 'center' });
          }
        }
      }
    }, 100);
  };

  const downloadCsv = () => {
    if (!questionnaire) return;

    // Prepare responses for CSV (same format as webhook)
    const csvResponses = sections.flatMap((section) =>
      section.questions.map((question) => {
        const value = formValues[question.key as keyof FormData];
        let answer = '';
        let files: string[] = [];

        if (question.type === 'file') {
          files = Array.isArray(value) ? value : [];
          answer = files.length > 0 ? `${files.length} file(s) uploaded` : '';
        } else if (question.type === 'subfields') {
          const arr = Array.isArray(value) ? value : [];
          answer = arr
            .map((v, i) => {
              const label =
                i === 0
                  ? question.subfields?.primary.label || 'Primary'
                  : question.subfields?.secondary.label || 'Secondary';
              return `${label}: ${v || '(empty)'}`;
            })
            .join('\n');
        } else {
          // Ensure value is string
          if (Array.isArray(value)) {
            answer = value.join('\n\n');
          } else if (typeof value === 'string') {
            answer = value || '';
          } else {
            answer = '';
          }
        }

        return {
          section: section.title,
          question: question.label.replace(/\[client\]/g, questionnaire.client_name).replace(/\{\{client\}\}/g, questionnaire.client_name),
          answer,
          files,
        };
      })
    );

    // Generate CSV content
    const submittedAt = questionnaire.submitted_at || new Date().toISOString();
    const csvContent = generateCsvFromResponses(
      questionnaire.client_name,
      questionnaire.product_name,
      type,
      submittedAt,
      csvResponses
    );

    // Generate filename
    const filename = generateCsvFilename(
      questionnaire.client_name,
      questionnaire.product_name,
      submittedAt
    );

    // Create blob and download
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    
    link.setAttribute('href', url);
    link.setAttribute('download', filename);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    toast.success('CSV downloaded successfully!');
  };

  const onSubmit = async (data: FormData) => {
    if (!questionnaire) return;

    setSubmitting(true);
    try {
      // Save all responses
      const responsePromises = allQuestions.map(async (question) => {
        const value = data[question.key as keyof FormData];
        
        let answerText: string | null = null;
        let answerFiles: string[] = [];

        if (question.type === 'file') {
          answerFiles = Array.isArray(value) ? value : [];
        } else if (question.type === 'subfields') {
          // For subfields, store as JSON array
          answerText = Array.isArray(value) ? JSON.stringify(value) : null;
        } else {
          // Ensure value is string or null
          if (Array.isArray(value)) {
            answerText = value.join('\n\n');
          } else if (typeof value === 'string') {
            answerText = value || null;
          } else {
            answerText = null;
          }
        }

        return supabase
          .from('questionnaire_responses')
          .upsert({
            questionnaire_id: questionnaire.id,
            question_key: question.key,
            question_text: question.label,
            answer_text: answerText,
            answer_files: answerFiles,
          });
      });

      await Promise.all(responsePromises);

      // Update questionnaire status
      await supabase
        .from('questionnaires')
        .update({
          status: 'submitted',
          submitted_at: new Date().toISOString(),
        })
        .eq('id', questionnaire.id);

      // Update draft with final submitted data (so user can see what they submitted)
      await supabase
        .from('draft_saves')
        .upsert(
          {
            questionnaire_id: questionnaire.id,
            draft_data: data as Record<string, string | string[]>,
          },
          {
            onConflict: 'questionnaire_id',
          }
        );

      // Prepare responses for webhook
      const webhookResponses = sections.flatMap((section) =>
        section.questions.map((question) => {
          const value = data[question.key as keyof FormData];
          let answer = '';
          let files: string[] = [];

          if (question.type === 'file') {
            files = Array.isArray(value) ? value : [];
            answer = files.length > 0 ? `${files.length} file(s) uploaded` : '';
          } else if (question.type === 'subfields') {
            const arr = Array.isArray(value) ? value : [];
            answer = arr
              .map((v, i) => {
                const label =
                  i === 0
                    ? question.subfields?.primary.label || 'Primary'
                    : question.subfields?.secondary.label || 'Secondary';
                return `${label}: ${v || '(empty)'}`;
              })
              .join('\n');
          } else {
            // Ensure value is string
            if (Array.isArray(value)) {
              answer = value.join('\n\n');
            } else if (typeof value === 'string') {
              answer = value || '';
            } else {
              answer = '';
            }
          }

          return {
            section: section.title,
            question: question.label.replace(/\[client\]/g, questionnaire.client_name).replace(/\{\{client\}\}/g, questionnaire.client_name),
            answer,
            files,
          };
        })
      );

      // Trigger webhook (non-blocking - don't wait for it)
      const submittedAt = new Date().toISOString();
      triggerWebhook(
        questionnaire.id,
        type,
        questionnaire.client_name,
        questionnaire.product_name,
        params.slug,
        token || '',
        submittedAt,
        webhookResponses
      ).catch((error) => {
        // Already handled in triggerWebhook, but log here too
        console.error('Webhook error (non-blocking):', error);
      });

      toast.success('Questionnaire submitted successfully!');
      
      // Redirect to success page
      router.push(`/questionnaires/${type}/${params.slug}/success?token=${token}`);
    } catch (error) {
      console.error('Error submitting questionnaire:', error);
      toast.error('Failed to submit questionnaire');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#080808] flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-[#6295ff]" />
      </div>
    );
  }

  if (!questionnaire) {
    return null;
  }

  return (
    <div className="min-h-screen bg-[#080808] py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Logo */}
        <div className="mb-8">
          <Image
            src="/sd-logo.svg"
            alt="StudioDirection"
            width={216}
            height={24}
          />
        </div>

        {/* Header */}
        <div className="bg-[#1a1a1a] rounded-lg border border-[#2a2a2a] p-6 mb-6">
          <h1 className="text-3xl font-bold text-[#f5f5f7] mb-2">
            {questionnaire.client_name} - {questionnaire.product_name}
          </h1>
          <p className="text-[#86868b]">
            {getQuestionsByType(type)[0]?.title || 'Questionnaire'}
          </p>
          {lastSavedAt && (
            <p className="text-sm text-[#86868b] mt-2">
              Last saved: {new Date(lastSavedAt).toLocaleString()}
            </p>
          )}
        </div>

        {/* Progress Indicator */}
        <ProgressIndicator sections={sections} values={formValues as Record<string, string | string[]>} />

        {/* Form */}
        <form 
          onSubmit={handleSubmit(onSubmit, (validationErrors) => {
            // Scroll to first error on validation failure
            scrollToFirstError(validationErrors);
          })} 
          className="space-y-8"
        >
          {sections.map((section, index) => (
            <QuestionSection
              key={index}
              section={section}
              values={formValues as Record<string, string | string[]>}
              onChange={(key, value) => setValue(key as keyof FormData, value as any)}
              errors={Object.fromEntries(
                Object.entries(errors).map(([key, error]) => [
                  key,
                  error?.message as string | undefined,
                ])
              )}
              clientName={questionnaire.client_name}
              productName={questionnaire.product_name}
              questionnaireType={type}
              questionnaireSlug={params.slug}
            />
          ))}

          {/* Action Buttons */}
          <div className="bg-[#1a1a1a] rounded-lg border border-[#2a2a2a] p-6 sticky bottom-0">
            <div className="flex gap-4">
              <Button
                type="button"
                variant="outline"
                onClick={saveDraft}
                disabled={saving || submitting || questionnaire.status === 'submitted'}
                className="flex items-center gap-2"
              >
                {saving ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Save className="w-4 h-4" />
                )}
                {saving ? 'Saving...' : 'Save Draft'}
              </Button>
              <Button
                type="submit"
                disabled={saving || submitting || questionnaire.status === 'submitted'}
                className="flex items-center gap-2 flex-1"
              >
                {submitting ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : questionnaire.status === 'submitted' ? (
                  'Already Submitted'
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    Submit Questionnaire
                  </>
                )}
              </Button>
              {questionnaire.status === 'submitted' && (
                <Button
                  type="button"
                  variant="secondary"
                  onClick={downloadCsv}
                  className="flex items-center gap-2"
                >
                  <Download className="w-4 h-4" />
                  Download CSV
                </Button>
              )}
            </div>
            {questionnaire.status === 'submitted' && (
              <p className="text-sm text-[#86868b] mt-3 text-center">
                This questionnaire has already been submitted on{' '}
                {questionnaire.submitted_at
                  ? new Date(questionnaire.submitted_at).toLocaleString()
                  : 'previously'}
              </p>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

