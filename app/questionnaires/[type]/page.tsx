'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { supabase } from '@/lib/supabase';
import { generateUniqueSlug, generateAccessToken, getQuestionnaireUrl } from '@/lib/utils';
import type { QuestionnaireType } from '@/types/questionnaire';
import toast from 'react-hot-toast';
import { Copy, Check } from 'lucide-react';

const createQuestionnaireSchema = z.object({
  client_name: z.string().min(2, 'Client name must be at least 2 characters'),
  product_name: z.string().min(2, 'Product name must be at least 2 characters'),
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

  const type = params.type as QuestionnaireType;

  // Initialize form hook before any conditional returns
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateQuestionnaireForm>({
    resolver: zodResolver(createQuestionnaireSchema),
  });

  // Validate questionnaire type
  const validTypes: QuestionnaireType[] = ['product-design', 'web-design', 'brand-design'];
  if (!validTypes.includes(type)) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-md p-8 max-w-md w-full text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Invalid Questionnaire Type</h1>
          <p className="text-gray-600 mb-6">
            The questionnaire type &quot;{type}&quot; is not valid.
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
      // Generate unique slug
      const slug = await generateUniqueSlug(data.client_name, type);
      
      // Generate access token
      const accessToken = generateAccessToken();

      // Insert into database
      const { data: questionnaire, error } = await supabase
        .from('questionnaires')
        .insert({
          type,
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
      const link = getQuestionnaireUrl(type, slug, accessToken);
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

  const getTypeDisplayName = (type: QuestionnaireType): string => {
    return type
      .split('-')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  if (createdLink) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-md p-8 max-w-2xl w-full">
          <h1 className="text-3xl font-bold text-gray-900 mb-6 text-center">
            Questionnaire Created!
          </h1>
          
          <div className="space-y-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
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
                    <Check className="w-5 h-5 text-green-600" />
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
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-md p-8 max-w-md w-full">
        <h1 className="text-3xl font-bold text-gray-900 mb-2 text-center">
          Create {getTypeDisplayName(type)} Questionnaire
        </h1>
        <p className="text-gray-600 text-center mb-8">
          Fill in the details to create a new questionnaire
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label htmlFor="client_name" className="block text-sm font-medium text-gray-700 mb-2">
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
            <label htmlFor="product_name" className="block text-sm font-medium text-gray-700 mb-2">
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
  );
}

