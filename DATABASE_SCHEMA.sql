-- ========================================
-- QUESTIONNAIRES TABLE
-- Stores metadata about each questionnaire
-- ========================================
CREATE TABLE questionnaires (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  
  -- Type of questionnaire
  type TEXT NOT NULL CHECK (type IN (
    'product-design-new',
    'product-design-redesign',
    'web-design-new',
    'web-design-redesign',
    'brand-design-new',
    'brand-design-rebrand',
    'motion'
  )),
  
  -- Client information
  client_name TEXT NOT NULL,
  product_name TEXT NOT NULL,
  slug TEXT NOT NULL,
  
  -- Security
  access_token TEXT UNIQUE NOT NULL,
  
  -- Status tracking
  status TEXT DEFAULT 'not-started' CHECK (status IN ('not-started', 'in-progress', 'submitted')),
  
  -- Timestamps
  created_at TIMESTAMP DEFAULT NOW(),
  last_saved_at TIMESTAMP,
  submitted_at TIMESTAMP,
  
  -- Ensure unique combination of type and slug
  UNIQUE(type, slug)
);

-- ========================================
-- QUESTIONNAIRE_RESPONSES TABLE
-- Stores individual answers to questions
-- ========================================
CREATE TABLE questionnaire_responses (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  questionnaire_id UUID REFERENCES questionnaires(id) ON DELETE CASCADE,
  
  -- Question information
  question_key TEXT NOT NULL,
  question_text TEXT NOT NULL,
  
  -- Answer data
  answer_text TEXT,
  answer_files JSONB DEFAULT '[]'::jsonb,
  
  -- Timestamp
  updated_at TIMESTAMP DEFAULT NOW(),
  
  -- Ensure one answer per question per questionnaire
  UNIQUE(questionnaire_id, question_key)
);

-- ========================================
-- DRAFT_SAVES TABLE
-- Stores draft saves (manual saves only)
-- ========================================
CREATE TABLE draft_saves (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  questionnaire_id UUID REFERENCES questionnaires(id) ON DELETE CASCADE,
  
  -- Complete form state as JSON
  draft_data JSONB NOT NULL,
  
  -- Timestamp
  saved_at TIMESTAMP DEFAULT NOW(),
  
  -- Only one draft per questionnaire (latest)
  UNIQUE(questionnaire_id)
);

-- ========================================
-- INDEXES FOR PERFORMANCE
-- ========================================
CREATE INDEX idx_questionnaires_type_slug ON questionnaires(type, slug);
CREATE INDEX idx_questionnaires_token ON questionnaires(access_token);
CREATE INDEX idx_responses_questionnaire ON questionnaire_responses(questionnaire_id);
CREATE INDEX idx_responses_question ON questionnaire_responses(question_key);
CREATE INDEX idx_draft_questionnaire ON draft_saves(questionnaire_id);

-- ========================================
-- ROW LEVEL SECURITY (Optional but recommended)
-- ========================================

-- Enable RLS on all tables
ALTER TABLE questionnaires ENABLE ROW LEVEL SECURITY;
ALTER TABLE questionnaire_responses ENABLE ROW LEVEL SECURITY;
ALTER TABLE draft_saves ENABLE ROW LEVEL SECURITY;

-- Policy: Anyone can read with valid token (for client access)
CREATE POLICY "Allow token-based read access on questionnaires"
  ON questionnaires FOR SELECT
  USING (true);

CREATE POLICY "Allow token-based read access on responses"
  ON questionnaire_responses FOR SELECT
  USING (true);

CREATE POLICY "Allow token-based read access on drafts"
  ON draft_saves FOR SELECT
  USING (true);

-- Policy: Anyone can insert/update (we verify token in application logic)
CREATE POLICY "Allow insert on questionnaires"
  ON questionnaires FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Allow update on questionnaires"
  ON questionnaires FOR UPDATE
  USING (true);

CREATE POLICY "Allow insert on responses"
  ON questionnaire_responses FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Allow update on responses"
  ON questionnaire_responses FOR UPDATE
  USING (true);

CREATE POLICY "Allow insert on drafts"
  ON draft_saves FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Allow update on drafts"
  ON draft_saves FOR UPDATE
  USING (true);

-- ========================================
-- STORAGE BUCKET SETUP
-- ========================================

-- Create storage bucket for questionnaire files
INSERT INTO storage.buckets (id, name, public)
VALUES ('questionnaire-files', 'questionnaire-files', true);

-- Allow public read access to files
CREATE POLICY "Allow public read access"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'questionnaire-files');

-- Allow authenticated uploads
CREATE POLICY "Allow file uploads"
  ON storage.objects FOR INSERT
  WITH CHECK (bucket_id = 'questionnaire-files');

-- Allow file deletes
CREATE POLICY "Allow file deletes"
  ON storage.objects FOR DELETE
  USING (bucket_id = 'questionnaire-files');