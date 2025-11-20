import { v4 as uuidv4 } from 'uuid';
import { supabase } from './supabase';
import type { QuestionnaireType } from '@/types/questionnaire';

/**
 * Generate a URL-friendly slug from a string
 */
export function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '') // Remove special characters
    .replace(/[\s_-]+/g, '-') // Replace spaces and underscores with hyphens
    .replace(/^-+|-+$/g, ''); // Remove leading/trailing hyphens
}

/**
 * Check if a slug exists for a given type
 */
export async function slugExists(slug: string, type: QuestionnaireType): Promise<boolean> {
  const { data, error } = await supabase
    .from('questionnaires')
    .select('id')
    .eq('type', type)
    .eq('slug', slug)
    .maybeSingle();

  if (error) {
    console.error('Error checking slug:', error);
    throw new Error('Failed to check slug availability');
  }

  return data !== null;
}

/**
 * Generate a unique slug by appending numbers if needed
 */
export async function generateUniqueSlug(
  clientName: string,
  type: QuestionnaireType
): Promise<string> {
  let baseSlug = generateSlug(clientName);
  let slug = baseSlug;
  let counter = 1;

  while (await slugExists(slug, type)) {
    counter++;
    slug = `${baseSlug}-${counter}`;
  }

  return slug;
}

/**
 * Generate a random access token (UUID v4)
 */
export function generateAccessToken(): string {
  return uuidv4();
}

/**
 * Replace placeholders in text with actual values
 */
export function replacePlaceholders(
  text: string,
  clientName: string,
  productName: string
): string {
  return text
    .replace(/\[client\]/g, clientName)
    .replace(/\{\{client\}\}/g, clientName)
    .replace(/\[product\]/g, productName)
    .replace(/\{\{product\}\}/g, productName);
}

/**
 * Replace placeholders in HTML attributes
 */
export function replaceAttributePlaceholders(
  element: HTMLElement,
  clientName: string,
  productName: string
): void {
  // Replace data-client-name attribute
  if (element.hasAttribute('data-client-name')) {
    element.textContent = clientName;
  }

  // Replace data-product-name attribute
  if (element.hasAttribute('data-product-name')) {
    element.textContent = productName;
  }
}

/**
 * Get questionnaire URL
 */
export function getQuestionnaireUrl(
  type: QuestionnaireType,
  slug: string,
  token: string,
  baseUrl?: string
): string {
  const base = baseUrl || (typeof window !== 'undefined' ? window.location.origin : '');
  return `${base}/questionnaires/${type}/${slug}?token=${token}`;
}

