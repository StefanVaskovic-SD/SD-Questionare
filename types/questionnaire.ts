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
export type QuestionType = 'text' | 'textarea' | 'url' | 'email' | 'file' | 'subfields' | 'multiple-inputs' | 'slider' | 'radio' | 'checkbox' | 'multiselect';

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
  multipleInputs?: {
    // For multiple inputs that combine into one sentence
    template: string; // e.g., "We help {0} to {1} by {2}."
    inputs: Array<{ key: string; label: string; placeholder?: string }>;
  };
  sliderOptions?: {
    // For slider scale questions
    leftLabel: string;
    rightLabel: string;
    min?: number; // default 1
    max?: number; // default 10
    defaultValue?: number; // default 5
  };
  radioOptions?: {
    // For radio button questions
    options: Array<{ value: string; label: string }>;
    allowOther?: boolean; // If true, shows "Other: ______" input field
  };
  checkboxOptions?: {
    // For checkbox/multiselect questions
    options: Array<{ value: string; label: string }>;
    allowOther?: boolean; // If true, shows "Other: ______" input field
  };
  conditionalFields?: {
    // For conditional field display
    dependsOn: string; // Key of the question this depends on
    showIf: string | string[]; // Value(s) that trigger showing this question
    fields: QuestionConfig[]; // Fields to show conditionally
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

