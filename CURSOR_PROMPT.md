# Client Questionnaire System - Implementation Guide

## Project Overview
Build a Next.js 14 application for creating and managing client questionnaires. The system allows admins to create questionnaires for clients, generate unique links, and collect responses.

## Tech Stack
- Next.js 14 (App Router)
- TypeScript (strict mode)
- Tailwind CSS
- Supabase (PostgreSQL + Storage)
- React Hook Form + Zod
- React Hot Toast
- Lucide React (icons)

## Implementation Steps

### STEP 1: Project Setup
```bash
npx create-next-app@latest client-questionnaire-system --typescript --tailwind --app --eslint
cd client-questionnaire-system
npm install @supabase/supabase-js react-hook-form zod @hookform/resolvers react-hot-toast lucide-react uuid
npm install @types/uuid --save-dev
```

### STEP 2: Environment Variables
Create `.env.local`:
```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
NEXT_PUBLIC_N8N_WEBHOOK_URL=your_n8n_webhook_url
```

### STEP 3: Database Schema (Run in Supabase SQL Editor)
[See DATABASE_SCHEMA.sql file]

### STEP 4: Folder Structure
```
src/
├── app/
│   ├── questionnaires/
│   │   ├── page.tsx                 # Homepage with 3 buttons
│   │   ├── [type]/
│   │   │   ├── page.tsx            # Create form (2 fields)
│   │   │   └── [slug]/
│   │   │       └── page.tsx        # Client questionnaire
│   │   └── layout.tsx
│   ├── layout.tsx
│   └── globals.css
├── components/
│   ├── ui/
│   │   ├── Button.tsx
│   │   ├── Input.tsx
│   │   ├── Textarea.tsx
│   │   └── Toast.tsx
│   └── questionnaire/
│       ├── QuestionSection.tsx
│       ├── FileUpload.tsx
│       ├── QuestionField.tsx
│       └── ProgressIndicator.tsx
├── lib/
│   ├── supabase.ts                 # Supabase client
│   ├── utils.ts                    # Helper functions
│   └── validations.ts              # Zod schemas
├── types/
│   └── questionnaire.ts            # TypeScript types
├── config/
│   └── questions.ts                # All questions configuration
└── .cursorrules                    # Cursor rules file
```

### STEP 5: Implementation Order
1. Setup Supabase client (`lib/supabase.ts`)
2. Create TypeScript types (`types/questionnaire.ts`)
3. Create questions config (`config/questions.ts`) - USE PROVIDED QUESTIONS FILE
4. Create utility functions (`lib/utils.ts`)
5. Build homepage (`app/questionnaires/page.tsx`)
6. Build create form page (`app/questionnaires/[type]/page.tsx`)
7. Build client questionnaire page (`app/questionnaires/[type]/[slug]/page.tsx`)
8. Create UI components
9. Implement file upload
10. Add validation and error handling
11. Integrate n8n webhook
12. Test thoroughly

### STEP 6: Key Features to Implement

#### Homepage (`/questionnaires`)
- Display heading: "StudioDirection Questionnaires"
- 3 large buttons for questionnaire types
- Clean, centered layout
- Responsive design

#### Create Form (`/questionnaires/[type]`)
- Validate questionnaire type
- Form with Client Name and Product Name inputs
- Generate unique slug from client name
- Check database for existing slugs
- If exists, append -2, -3, etc.
- Generate random access token (UUID v4)
- Insert into database
- Show modal with shareable link
- Copy link to clipboard functionality

#### Client Questionnaire (`/questionnaires/[type]/[slug]?token=xxx`)
- Verify access token
- Load questionnaire metadata
- Load existing responses (if any)
- Load latest draft (if exists)
- Replace [client] and {{client}} placeholders
- Replace data-client-name and data-product-name attributes
- Render all questions from config
- File upload for specific questions
- "Save Draft" button (manual only, NO auto-save)
- "Submit" button with validation
- Show last saved timestamp
- Success page after submission
- Trigger n8n webhook on submit

### STEP 7: Database Operations

#### Creating Questionnaire
```typescript
INSERT INTO questionnaires (type, client_name, product_name, slug, access_token, status)
VALUES ('product-design', 'Nike', 'Air Max', 'nike', 'uuid-token', 'not-started')
```

#### Saving Draft
```typescript
INSERT INTO draft_saves (questionnaire_id, draft_data)
VALUES ('uuid', '{"question_key": "answer"}')
ON CONFLICT (questionnaire_id) DO UPDATE SET draft_data = EXCLUDED.draft_data
```

#### Saving Responses
```typescript
INSERT INTO questionnaire_responses (questionnaire_id, question_key, question_text, answer_text, answer_files)
VALUES ('uuid', 'product_name_meaning', 'What is...', 'Answer text', '[]')
ON CONFLICT (questionnaire_id, question_key) DO UPDATE SET answer_text = EXCLUDED.answer_text
```

### STEP 8: File Upload Flow
1. User drops/selects file(s)
2. Upload to Supabase Storage bucket: `questionnaire-files`
3. Path: `/[type]/[slug]/[filename]`
4. Get public URL
5. Store URL array in `answer_files` JSONB column

### STEP 9: n8n Webhook Payload
```json
{
  "questionnaire_id": "uuid",
  "type": "product-design",
  "client_name": "Nike",
  "product_name": "Air Max",
  "submitted_at": "2025-11-20T15:00:00Z",
  "link": "https://site.com/questionnaires/product-design/nike?token=xxx",
  "responses": [
    {
      "section": "About the company",
      "question": "What is the meaning behind the product name?",
      "answer": "Air Max represents...",
      "files": []
    }
  ]
}
```

### STEP 10: Security Requirements
- Always verify access_token before showing questionnaire
- Never expose tokens in logs
- Validate all user inputs
- Sanitize file uploads
- Use server-side validation

### STEP 11: UX Requirements
- Show progress indicator (X of Y questions answered)
- Clear required field indicators (*)
- Helpful placeholder text
- Section grouping
- Mobile responsive
- Loading states
- Toast notifications for feedback
- Confirmation before leaving with unsaved changes

### STEP 12: Error Handling
- 403 page for invalid/expired tokens
- 404 page for non-existent questionnaires
- Form validation errors
- File upload errors with retry
- Network error handling
- Toast notifications for errors

## Testing Checklist
- [ ] Create questionnaire with unique name
- [ ] Create questionnaire with duplicate name (should get -2)
- [ ] Open link with valid token
- [ ] Open link with invalid token (should show error)
- [ ] Fill form and save draft
- [ ] Reload page - draft should load
- [ ] Submit with missing required fields (should show errors)
- [ ] Submit with all fields filled
- [ ] Verify webhook triggered
- [ ] Upload files successfully
- [ ] Mobile responsive
- [ ] All placeholder replacements work
```

