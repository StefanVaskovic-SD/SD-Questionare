-- ========================================
-- MIGRATION: Add DELETE policy for questionnaires
-- ========================================
-- This migration adds the missing DELETE policy for the questionnaires table
-- which is required for the archive delete functionality.

-- Add DELETE policy for questionnaires
CREATE POLICY "Allow delete on questionnaires"
  ON questionnaires FOR DELETE
  USING (true);

-- Add DELETE policy for responses (if needed for manual cleanup)
CREATE POLICY "Allow delete on responses"
  ON questionnaire_responses FOR DELETE
  USING (true);

-- Add DELETE policy for drafts (if needed for manual cleanup)
CREATE POLICY "Allow delete on drafts"
  ON draft_saves FOR DELETE
  USING (true);


