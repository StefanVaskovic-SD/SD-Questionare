'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Radio } from '@/components/ui/Radio';
import { supabase } from '@/lib/supabase';
import { generateUniqueSlug, generateAccessToken, getQuestionnaireUrl } from '@/lib/utils';
import type { QuestionnaireType, QuestionnaireCategory } from '@/types/questionnaire';
import toast from 'react-hot-toast';
import { Copy, Check } from 'lucide-react';
import Image from 'next/image';

const createQuestionnaireSchema = z.object({
  client_name: z.string().min(2, 'Client name must be at least 2 characters'),
  product_name: z.string().min(2, 'Product name must be at least 2 characters'),
  sub_type: z.enum(['new', 'redesign', 'rebrand']),
});

type CreateQuestionnaireForm = z.infer<typeof createQuestionnaireSchema>;

interface PageProps {
  params: {
    type: string;
  };
}

export default function CreateQuestionnairePage({ params }: PageProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [createdLink, setCreatedLink] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const category = params.type as QuestionnaireCategory;

  // Initialize form hook before any conditional returns
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<CreateQuestionnaireForm>({
    resolver: zodResolver(createQuestionnaireSchema),
    defaultValues: {
      sub_type: category === 'brand-design' ? 'new' : 'new',
    },
  });

  // Get sub-type options based on category
  const getSubTypeOptions = (cat: QuestionnaireCategory) => {
    switch (cat) {
      case 'product-design':
        return [
          { value: 'new', label: 'New Product' },
          { value: 'redesign', label: 'Redesign of the existing product' },
        ];
      case 'web-design':
        return [
          { value: 'new', label: 'New Website' },
          { value: 'redesign', label: 'Redesign' },
        ];
      case 'brand-design':
        return [
          { value: 'new', label: 'New Brand Identity' },
          { value: 'rebrand', label: 'Rebrand' },
        ];
      case 'motion':
        return []; // Motion doesn't have sub-types
      default:
        return [];
    }
  };

  // Validate questionnaire category
  const validCategories: QuestionnaireCategory[] = ['product-design', 'web-design', 'brand-design', 'motion'];
  if (!validCategories.includes(category)) {
    return (
      <div className="min-h-screen bg-[#080808] flex items-center justify-center p-4">
        <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg p-8 max-w-md w-full text-center">
          <h1 className="text-2xl font-bold text-[#f5f5f7] mb-4">Invalid Questionnaire Category</h1>
          <p className="text-[#86868b] mb-6">
            The questionnaire category &quot;{category}&quot; is not valid.
          </p>
          <Button onClick={() => router.push('/questionnaires')}>
            Go Back
          </Button>
        </div>
      </div>
    );
  }

  const onSubmit = async (data: CreateQuestionnaireForm) => {
    setIsLoading(true);
    try {
      // Build full type from category and sub-type
      let fullType: QuestionnaireType;
      if (category === 'motion') {
        fullType = 'motion';
      } else {
        fullType = `${category}-${data.sub_type}` as QuestionnaireType;
      }
      
      // Generate unique slug
      const slug = await generateUniqueSlug(data.client_name, fullType);
      
      // Generate access token
      const accessToken = generateAccessToken();

      // Insert into database
      const { data: questionnaire, error } = await supabase
        .from('questionnaires')
        .insert({
          type: fullType,
          client_name: data.client_name,
          product_name: data.product_name,
          slug,
          access_token: accessToken,
          status: 'not-started',
        })
        .select()
        .single();

      if (error) {
        throw new Error(error.message);
      }

      // Generate shareable link
      const link = getQuestionnaireUrl(fullType, slug, accessToken);
      setCreatedLink(link);
      toast.success('Questionnaire created successfully!');
    } catch (error) {
      console.error('Error creating questionnaire:', error);
      toast.error(
        error instanceof Error
          ? error.message
          : 'Failed to create questionnaire. Please try again.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = async () => {
    if (!createdLink) return;
    
    try {
      await navigator.clipboard.writeText(createdLink);
      setCopied(true);
      toast.success('Link copied to clipboard!');
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      toast.error('Failed to copy link');
    }
  };

  const getCategoryDisplayName = (cat: QuestionnaireCategory): string => {
    return cat
      .split('-')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  const subTypeOptions = getSubTypeOptions(category);
  const selectedSubType = watch('sub_type');

  if (createdLink) {
    return (
      <div className="min-h-screen bg-[#080808] flex items-center justify-center p-4">
        <div className="max-w-[52rem] w-full">
          <div className="mb-8 flex justify-center">
            <Image
              src="/sd-logo.svg"
              alt="StudioDirection"
              width={216}
              height={24}
            />
          </div>
          <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg p-8">
            <h1 className="text-3xl font-bold text-[#f5f5f7] mb-6 text-center">
              Questionnaire Created!
            </h1>
            
            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-[#f5f5f7] mb-2">
                  Shareable Link
                </label>
                <div className="flex gap-2">
                  <Input
                    value={createdLink}
                    readOnly
                    className="flex-1 font-mono text-sm"
                  />
                  <Button
                    onClick={copyToClipboard}
                    variant="outline"
                    className="px-4"
                  >
                    {copied ? (
                      <Check className="w-5 h-5 text-[#6295ff]" />
                    ) : (
                      <Copy className="w-5 h-5" />
                    )}
                  </Button>
                </div>
              </div>
            </div>

            <div className="flex gap-4">
              <Button
                onClick={() => router.push('/questionnaires')}
                variant="outline"
                className="flex-1"
              >
                Create Another
              </Button>
              <Button
                onClick={() => window.open(createdLink, '_blank')}
                className="flex-1"
              >
                Open Questionnaire
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

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
        <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg p-8">
          <h1 className="text-3xl font-bold text-[#f5f5f7] mb-2 text-center">
            Create {getCategoryDisplayName(category)} Questionnaire
          </h1>
          <p className="text-[#86868b] text-center mb-8">
            Fill in the details to create a new questionnaire
          </p>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <label htmlFor="client_name" className="block text-sm font-medium text-[#f5f5f7] mb-2">
                Client Name <span className="text-red-500">*</span>
              </label>
              <Input
                id="client_name"
                {...register('client_name')}
                placeholder="e.g., Nike"
                error={!!errors.client_name}
              />
              {errors.client_name && (
                <p className="mt-1 text-sm text-red-600">{errors.client_name.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="product_name" className="block text-sm font-medium text-[#f5f5f7] mb-2">
                Product Name <span className="text-red-500">*</span>
              </label>
              <Input
                id="product_name"
                {...register('product_name')}
                placeholder="e.g., Air Max"
                error={!!errors.product_name}
              />
              {errors.product_name && (
                <p className="mt-1 text-sm text-red-600">{errors.product_name.message}</p>
              )}
            </div>

            {subTypeOptions.length > 0 && (
              <div>
                <label className="block text-sm font-medium text-[#f5f5f7] mb-3">
                  Type <span className="text-red-500">*</span>
                </label>
                <div className="space-y-3">
                  {subTypeOptions.map((option) => (
                    <Radio
                      key={option.value}
                      {...register('sub_type')}
                      value={option.value}
                      label={option.label}
                      error={!!errors.sub_type}
                      checked={selectedSubType === option.value}
                    />
                  ))}
                </div>
                {errors.sub_type && (
                  <p className="mt-1 text-sm text-red-600">{errors.sub_type.message}</p>
                )}
              </div>
            )}

            <div className="flex gap-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => router.push('/questionnaires')}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isLoading} className="flex-1">
                {isLoading ? 'Creating...' : 'Create Questionnaire'}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

