export type QuestionnaireType = 
  | 'product-design-new' 
  | 'product-design-redesign'
  | 'web-design-new'
  | 'web-design-redesign'
  | 'brand-design-new'
  | 'brand-design-rebrand'
  | 'motion';

export type QuestionnaireCategory = 'product-design' | 'web-design' | 'brand-design' | 'motion';
export type QuestionnaireSubType = 'new' | 'redesign' | 'rebrand';
export type QuestionnaireStatus = 'not-started' | 'in-progress' | 'submitted';
export type QuestionType = 'text' | 'textarea' | 'url' | 'email' | 'file' | 'subfields';

export interface Questionnaire {
  id: string;
  type: QuestionnaireType;
  client_name: string;
  product_name: string;
  slug: string;
  access_token: string;
  status: QuestionnaireStatus;
  created_at: string;
  last_saved_at: string | null;
  submitted_at: string | null;
}

export interface QuestionnaireResponse {
  id: string;
  questionnaire_id: string;
  question_key: string;
  question_text: string;
  answer_text: string | null;
  answer_files: string[];
  updated_at: string;
}

export interface DraftSave {
  id: string;
  questionnaire_id: string;
  draft_data: Record<string, string | string[]>;
  saved_at: string;
}

export interface QuestionConfig {
  key: string;
  label: string;
  type: QuestionType;
  required: boolean;
  placeholder?: string;
  helper?: string;
  groupTitle?: string; // For {fields small title} - small title for a group of fields
  subfields?: {
    primary: { key: string; label: string };
    secondary: { key: string; label: string };
  };
}

export interface SectionConfig {
  title: string;
  intro?: string;
  description?: string; // For {desc paragraph}
  questions: QuestionConfig[];
}

export interface QuestionnaireConfig {
  title: string;
  subtitle?: string;
  purpose?: {
    title: string;
    content: string;
  };
  goal?: {
    title: string;
    content: string;
  };
  sections: SectionConfig[];
  thankYouMessage?: string;
}

export interface WebhookPayload {
  questionnaire_id: string;
  type: QuestionnaireType;
  client_name: string;
  product_name: string;
  submitted_at: string;
  link: string;
  responses: Array<{
    section: string;
    question: string;
    answer: string;
    files: string[];
  }>;
}

