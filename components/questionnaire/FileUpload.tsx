'use client';

import { useState, useRef } from 'react';
import { Button } from '@/components/ui/Button';
import { Upload, X, File } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import toast from 'react-hot-toast';
import type { QuestionnaireType } from '@/types/questionnaire';

interface FileUploadProps {
  questionKey: string;
  value: string[];
  onChange: (urls: string[]) => void;
  error?: string;
  questionnaireType?: QuestionnaireType;
  questionnaireSlug?: string;
}

export function FileUpload({
  questionKey,
  value,
  onChange,
  error,
  questionnaireType = 'product-design-new',
  questionnaireSlug = 'default',
}: FileUploadProps) {
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setUploading(true);

    try {
      const uploadPromises = Array.from(files).map(async (file) => {
        // Validate file type and size
        const maxSize = 10 * 1024 * 1024; // 10MB
        if (file.size > maxSize) {
          throw new Error(`File ${file.name} is too large. Maximum size is 10MB.`);
        }

        // Generate unique filename
        const fileExt = file.name.split('.').pop();
        const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
        const filePath = `${questionnaireType}/${questionnaireSlug}/${fileName}`;

        // Upload to Supabase Storage
        const { data, error: uploadError } = await supabase.storage
          .from('questionnaire-files')
          .upload(filePath, file, {
            cacheControl: '3600',
            upsert: false,
          });

        if (uploadError) {
          throw uploadError;
        }

        // Get public URL
        const { data: urlData } = supabase.storage
          .from('questionnaire-files')
          .getPublicUrl(filePath);

        return urlData.publicUrl;
      });

      const urls = await Promise.all(uploadPromises);
      onChange([...value, ...urls]);
      toast.success('Files uploaded successfully!');
    } catch (error) {
      console.error('Upload error:', error);
      toast.error(
        error instanceof Error
          ? error.message
          : 'Failed to upload files. Please try again.'
      );
    } finally {
      setUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const removeFile = (index: number) => {
    const newUrls = value.filter((_, i) => i !== index);
    onChange(newUrls);
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <input
          ref={fileInputRef}
          type="file"
          multiple
          onChange={handleFileSelect}
          disabled={uploading}
          className="hidden"
          id={`file-upload-${questionKey}`}
        />
        <Button
          type="button"
          variant="outline"
          onClick={() => fileInputRef.current?.click()}
          disabled={uploading}
          className="flex items-center gap-2"
        >
          <Upload className="w-4 h-4" />
          {uploading ? 'Uploading...' : 'Upload Files'}
        </Button>
      </div>

      {value.length > 0 && (
        <div className="space-y-2">
          {value.map((url, index) => {
            const fileName = url.split('/').pop() || `File ${index + 1}`;
            return (
              <div
                key={index}
                className="flex items-center justify-between p-3 bg-[#1a1a1a] rounded-lg border border-[#2a2a2a]"
              >
                <div className="flex items-center gap-2 flex-1 min-w-0">
                  <File className="w-4 h-4 text-[#86868b] flex-shrink-0" />
                  <a
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-[#6295ff] hover:underline truncate"
                  >
                    {fileName}
                  </a>
                </div>
                <button
                  type="button"
                  onClick={() => removeFile(index)}
                  className="p-1 text-red-500 hover:text-red-400 flex-shrink-0"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

