import type { QuestionConfig, SectionConfig, QuestionnaireConfig } from '@/types/questionnaire';

// Motion Questionnaire Configuration
export const MOTION_CONFIG: QuestionnaireConfig = {
  title: 'Motion Questionnaire',
  sections: [
    // ========================================
    // SECTION 1: PROJECT & OBJECTIVES
    // ========================================
    {
      title: 'PROJECT & OBJECTIVES',
      questions: [
        {
          key: 'main_idea_message',
          label: 'What is the main idea/message this video should communicate?',
          type: 'textarea',
          required: false,
        },
        {
          key: 'primary_purpose',
          label: 'What is the primary purpose of the video?',
          type: 'radio',
          required: false,
          radioOptions: {
            options: [
              { value: 'brand-awareness', label: 'Brand awareness' },
              { value: 'product-education', label: 'Product education' },
              { value: 'user-onboarding', label: 'User onboarding' },
              { value: 'sales-conversion', label: 'Sales/conversion' },
              { value: 'social-engagement', label: 'Social engagement' },
            ],
            allowOther: true,
          },
        },
        {
          key: 'target_audience',
          label: 'Who is the target audience?',
          type: 'textarea',
          required: false,
          helper: 'Demographics (age, profession, tech-savviness)\nPain points they\'re experiencing\nLevel of familiarity with the product',
        },
        {
          key: 'key_takeaways',
          label: 'What are the key takeaways the audience should remember after watching?',
          type: 'textarea',
          required: false,
        },
      ],
    },

    // ========================================
    // SECTION 2: VISUAL MATERIALS & CONTENT
    // ========================================
    {
      title: 'VISUAL MATERIALS & CONTENT',
      questions: [
        {
          key: 'materials_to_use',
          label: 'What materials should be used?',
          type: 'textarea',
          required: false,
          helper: 'For ex. app screens / UI mockups, Product screenshots, Existing brand assets (logos, icons, illustrations), Photography / video footage, 3D assets',
        },
        {
          key: 'screens_features_order',
          label: 'Which screens/features should be shown and in what order?',
          type: 'textarea',
          required: false,
        },
        {
          key: 'existing_storyboard',
          label: 'Is there an existing storyboard or wireframe?',
          type: 'textarea',
          required: false,
        },
        {
          key: 'reference_videos',
          label: 'Do you have reference videos you like? (style, pacing, animations) Please share links or describe what you liked about them.',
          type: 'textarea',
          required: false,
        },
        {
          key: 'animation_style',
          label: 'What animation style(s) do you prefer?',
          type: 'multiselect',
          required: false,
          checkboxOptions: {
            options: [
              { value: 'kinetic-typography', label: 'Kinetic typography' },
              { value: '2d-character', label: '2D character animation' },
              { value: '3d-motion-graphics', label: '3D motion graphics' },
              { value: 'screen-recording-overlay', label: 'Screen recording with motion graphics overlay' },
              { value: 'isometric', label: 'Isometric illustrations' },
              { value: 'minimalist', label: 'Minimalist/clean' },
              { value: 'playful', label: 'Playful/dynamic' },
            ],
            allowOther: true,
          },
        },
      ],
    },

    // ========================================
    // SECTION 3: BRAND & IDENTITY
    // ========================================
    {
      title: 'BRAND & IDENTITY',
      questions: [
        {
          key: 'brand_guidelines_url',
          label: 'Are there brand guidelines we should follow? Please share the link or upload files if available',
          type: 'url',
          required: false,
          placeholder: 'https://...',
        },
        {
          key: 'brand_guidelines_file',
          label: 'Upload brand guidelines files',
          type: 'file',
          required: false,
        },
        {
          key: 'tone_mood',
          label: 'What tone and mood should the video have?',
          type: 'textarea',
          required: false,
          helper: 'For ex. professional, friendly & approachable, energetic, minimalist & sophisticated, playful',
        },
        {
          key: 'competitor_videos_avoid',
          label: 'Are there competitor videos you do not want to emulate?',
          type: 'textarea',
          required: false,
        },
      ],
    },

    // ========================================
    // SECTION 4: AUDIO & NARRATION
    // ========================================
    {
      title: 'AUDIO & NARRATION',
      questions: [
        {
          key: 'voice_over_needed',
          label: 'Should voice over be added?',
          type: 'radio',
          required: false,
          radioOptions: {
            options: [
              { value: 'yes', label: 'Yes' },
              { value: 'no', label: 'No' },
            ],
          },
        },
        {
          key: 'voice_over_language',
          label: 'Language?',
          type: 'text',
          required: false,
          conditionalFields: {
            dependsOn: 'voice_over_needed',
            showIf: 'yes',
            fields: [],
          },
        },
        {
          key: 'voice_over_gender',
          label: 'Male/female/neutral voice?',
          type: 'radio',
          required: false,
          radioOptions: {
            options: [
              { value: 'male', label: 'Male' },
              { value: 'female', label: 'Female' },
              { value: 'neutral', label: 'Neutral' },
            ],
          },
          conditionalFields: {
            dependsOn: 'voice_over_needed',
            showIf: 'yes',
            fields: [],
          },
        },
        {
          key: 'voice_over_tone',
          label: 'Conversational or formal tone?',
          type: 'radio',
          required: false,
          radioOptions: {
            options: [
              { value: 'conversational', label: 'Conversational' },
              { value: 'formal', label: 'Formal' },
            ],
          },
          conditionalFields: {
            dependsOn: 'voice_over_needed',
            showIf: 'yes',
            fields: [],
          },
        },
        {
          key: 'script_status',
          label: 'Is there already a written script or does it need to be created?',
          type: 'textarea',
          required: false,
        },
        {
          key: 'music_type',
          label: 'What type of music is desirable?',
          type: 'radio',
          required: false,
          radioOptions: {
            options: [
              { value: 'upbeat-energetic', label: 'Upbeat & energetic' },
              { value: 'ambient-subtle', label: 'Ambient & subtle' },
              { value: 'corporate-professional', label: 'Corporate & professional' },
              { value: 'trendy-modern', label: 'Trendy/modern' },
              { value: 'no-music', label: 'No music needed' },
            ],
            allowOther: true,
          },
        },
        {
          key: 'sound_effects',
          label: 'Should sound effects be added?',
          type: 'radio',
          required: false,
          radioOptions: {
            options: [
              { value: 'yes', label: 'Yes' },
              { value: 'no', label: 'No' },
            ],
          },
        },
      ],
    },

    // ========================================
    // SECTION 5: TECHNICAL SPECIFICATIONS
    // ========================================
    {
      title: 'TECHNICAL SPECIFICATIONS',
      questions: [
        {
          key: 'video_length',
          label: 'How long should the video be?',
          type: 'text',
          required: false,
        },
        {
          key: 'video_usage',
          label: 'Where will the video be used and in what format?',
          type: 'multiselect',
          required: false,
          checkboxOptions: {
            options: [
              { value: 'instagram-1-1', label: 'Instagram (1:1)' },
              { value: 'instagram-9-16', label: 'Instagram (9:16)' },
              { value: 'instagram-4-5', label: 'Instagram (4:5)' },
              { value: 'linkedin-youtube', label: 'LinkedIn/YouTube (16:9)' },
              { value: 'website-hero', label: 'Website hero section' },
              { value: 'email-campaigns', label: 'Email campaigns' },
              { value: 'sales-presentations', label: 'Sales presentations' },
              { value: 'app-store-preview', label: 'App store preview' },
            ],
            allowOther: true,
          },
        },
        {
          key: 'multiple_versions',
          label: 'Are multiple versions/formats of the video needed?',
          type: 'radio',
          required: false,
          radioOptions: {
            options: [
              { value: 'yes', label: 'Yes' },
              { value: 'no', label: 'No' },
            ],
          },
        },
        {
          key: 'captions_subtitles',
          label: 'Should captions/subtitles be added?',
          type: 'radio',
          required: false,
          radioOptions: {
            options: [
              { value: 'yes', label: 'Yes' },
              { value: 'no', label: 'No' },
            ],
          },
        },
        {
          key: 'captions_languages',
          label: 'If yes, in what language(s)?',
          type: 'text',
          required: false,
          conditionalFields: {
            dependsOn: 'captions_subtitles',
            showIf: 'yes',
            fields: [],
          },
        },
      ],
    },

    // ========================================
    // SECTION 6: ADDITIONAL
    // ========================================
    {
      title: 'ADDITIONAL',
      questions: [
        {
          key: 'target_date',
          label: 'What is the target date for the final version?',
          type: 'text',
          required: false,
        },
        {
          key: 'decision_makers',
          label: 'Who are the decision makers in the approval process?',
          type: 'textarea',
          required: false,
        },
        {
          key: 'delivery_format',
          label: 'In what format and resolution should the final delivery be?',
          type: 'textarea',
          required: false,
          helper: 'Format: MP4 / MOV / ProRes / Other\nResolution: 1080p / 4K / Other\nFrame rate: 24fps / 30fps / 60fps / Other',
        },
        {
          key: 'legal_restrictions',
          label: 'Are there legal restrictions or compliance requirements we should be aware of?',
          type: 'textarea',
          required: false,
        },
        {
          key: 'avoid_elements',
          label: 'Should we avoid certain elements in the visualization?',
          type: 'textarea',
          required: false,
        },
        {
          key: 'additional_info',
          label: 'Is there anything else we should know about this project?',
          type: 'textarea',
          required: false,
        },
      ],
    },
  ],
  thankYouMessage: 'Thank you for taking the time to complete this questionnaire.',
};

