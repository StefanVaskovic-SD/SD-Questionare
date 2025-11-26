-- ========================================
-- STEP 1: DELETE ALL TEST DATA
-- ========================================
-- ⚠️ WARNING: This will delete ALL questionnaires, responses, and drafts!
-- Only run this if you want to start fresh with test data.

-- Delete in correct order (respecting foreign key constraints)
DELETE FROM questionnaire_responses;
DELETE FROM draft_saves;
DELETE FROM questionnaires;

-- Verify deletion (optional - you can check if tables are empty)
-- SELECT COUNT(*) FROM questionnaires;
-- SELECT COUNT(*) FROM questionnaire_responses;
-- SELECT COUNT(*) FROM draft_saves;

-- ========================================
-- STEP 2: UPDATE DATABASE SCHEMA
-- ========================================
-- This updates the questionnaires table to support the new type structure:
-- - product-design-new
-- - product-design-redesign
-- - web-design-new
-- - web-design-redesign
-- - brand-design-new
-- - brand-design-rebrand
-- - motion

-- Drop the old CHECK constraint
ALTER TABLE questionnaires DROP CONSTRAINT IF EXISTS questionnaires_type_check;

-- Add new CHECK constraint with all 7 types
ALTER TABLE questionnaires 
ADD CONSTRAINT questionnaires_type_check 
CHECK (type IN (
  'product-design-new',
  'product-design-redesign',
  'web-design-new',
  'web-design-redesign',
  'brand-design-new',
  'brand-design-rebrand',
  'motion'
));

-- ========================================
-- DONE! ✅
-- ========================================
-- Your database is now ready for the new 7-type structure.



