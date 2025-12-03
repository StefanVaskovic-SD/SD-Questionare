-- ========================================
-- MIGRATION: Update questionnaire types to support 7 types
-- ========================================
-- This migration updates the questionnaires table to support the new type structure:
-- - product-design-new
-- - product-design-redesign
-- - web-design-new
-- - web-design-redesign
-- - brand-design-new
-- - brand-design-rebrand
-- - motion

-- Step 1: Drop the old CHECK constraint
ALTER TABLE questionnaires DROP CONSTRAINT IF EXISTS questionnaires_type_check;

-- Step 2: Add new CHECK constraint with all 7 types
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

-- Note: If you have existing data, you may need to migrate it first:
-- UPDATE questionnaires SET type = 'product-design-new' WHERE type = 'product-design';
-- UPDATE questionnaires SET type = 'web-design-new' WHERE type = 'web-design';
-- UPDATE questionnaires SET type = 'brand-design-new' WHERE type = 'brand-design';




