import type { QuestionConfig, SectionConfig, QuestionnaireConfig } from '@/types/questionnaire';

// Brand Design (Rebrand) Questionnaire Configuration
export const BRAND_DESIGN_REBRAND_CONFIG: QuestionnaireConfig = {
  title: 'Brand Design Questionnaire',
  purpose: {
    title: 'Purpose of this exercise',
    content: 'This questionnaire is designed to help us gain a deep understanding of [brand]\'s brand, [client] business, and the vision guiding its identity.\n\nYour responses will inform our design approach, ensuring that the visual identity we create aligns with [brand]\'s goals, resonates with [brand]\'s target audience, and authentically represents it in the marketplace.\n\nPlease provide as much detail as possible so we can build a strong foundation for the brand design process.',
  },
  goal: {
    title: 'The goal of this exercise',
    content: 'Understand [brand]\'s brand essence, mission, vision, and the values behind the business.\n\nUnderstand [brand]\'s business positioning and how you wish to be perceived.\n\nUnderstand [brand]\'s target audience and what resonates with them.\n\nUnderstand your visual preferences, style direction, and competitive landscape.',
  },
  sections: [
    // ========================================
    // SECTION 1: Company Overview
    // ========================================
    {
      title: 'Company Overview',
      questions: [
        {
          key: 'industry_sector',
          label: 'What industry or sector does [brand] business operate in?',
          type: 'textarea',
          required: false,
        },
        {
          key: 'help_sentence',
          label: 'Complete this sentence:',
          type: 'multiple-inputs',
          required: false,
          multipleInputs: {
            template: 'We help {0} to {1} by {2}.',
            inputs: [
              { key: 'target_audience', label: '[target audience]' },
              { key: 'achieve_what', label: '[achieve what]' },
              { key: 'how', label: '[how]' },
            ],
          },
        },
        {
          key: 'products_services',
          label: 'What products or services does the [brand] offer? List all of them and describe the ones that might not be straightforward',
          type: 'textarea',
          required: false,
        },
      ],
    },

    // ========================================
    // SECTION 2: Why the brand exists
    // ========================================
    {
      title: 'Why the brand exists',
      questions: [
        {
          key: 'fundamental_belief',
          label: 'What fundamental belief guides everything [brand] does?',
          type: 'textarea',
          required: false,
          groupTitle: 'Core Value & Brand Purpose',
        },
        {
          key: 'brand_stands_for',
          label: 'What does [brand] brand stand for beyond making profit?',
          type: 'textarea',
          required: false,
          groupTitle: 'Core Value & Brand Purpose',
        },
        {
          key: 'brand_purpose',
          label: 'Why does [brand] brand exist? What is the bigger purpose?',
          type: 'textarea',
          required: false,
          groupTitle: 'Core Value & Brand Purpose',
        },
        {
          key: 'problem_solving',
          label: 'What problem is [brand] brand trying to solve for customers?',
          type: 'textarea',
          required: false,
          groupTitle: 'The problem you\'re solving',
        },
        {
          key: 'problem_importance',
          label: 'Why is this problem important?',
          type: 'textarea',
          required: false,
          groupTitle: 'The problem you\'re solving',
        },
        {
          key: 'problem_consequences',
          label: 'What would happen if this problem wasn\'t solved?',
          type: 'textarea',
          required: false,
          groupTitle: 'The problem you\'re solving',
        },
        {
          key: 'brand_reliability',
          label: 'What can consumers precisely rely on [brand] for?',
          type: 'textarea',
          required: false,
          groupTitle: 'Brand promise & distinctiveness',
        },
        {
          key: 'brand_promise',
          label: 'What promise does make to its customers that is always kept?',
          type: 'textarea',
          required: false,
          groupTitle: 'Brand promise & distinctiveness',
        },
        {
          key: 'brand_differentiation',
          label: 'What makes [brand] different from competitors? (What exactly sets [brand] apart?)',
          type: 'textarea',
          required: false,
          groupTitle: 'Brand promise & distinctiveness',
        },
        {
          key: 'customer_miss',
          label: 'If [brand] disappeared tomorrow, what would their customers miss most?',
          type: 'textarea',
          required: false,
          groupTitle: 'Brand promise & distinctiveness',
        },
        {
          key: 'tagline_slogan',
          label: 'Do you have a tagline or slogan that needs to be included?',
          type: 'textarea',
          required: false,
          groupTitle: 'Brand promise & distinctiveness',
        },
        {
          key: 'existing_brand_materials',
          label: 'Please upload any materials related to the existing brand.',
          type: 'file',
          required: false,
          groupTitle: 'Brand promise & distinctiveness',
        },
      ],
    },

    // ========================================
    // SECTION 3: Target Audience & Positioning
    // ========================================
    {
      title: 'Target Audience & Positioning',
      questions: [
        {
          key: 'mass_audience',
          label: 'Who is the broader mass audience for [brand] brand and products?',
          type: 'textarea',
          required: false,
          groupTitle: 'Mass Audience',
        },
        {
          key: 'demographic_groups',
          label: 'What demographic groups does [brand] brand appeal to? (age, location, profession, income level)',
          type: 'textarea',
          required: false,
          groupTitle: 'Mass Audience',
        },
        {
          key: 'core_consumers',
          label: 'Who are the core consumers and influencers for [brand] brand? ([brand]\'s most valuable customers)',
          type: 'textarea',
          required: false,
          groupTitle: 'Strategic target audience (core consumers, primary audience)',
        },
        {
          key: 'ideal_customer',
          label: 'Describe [brand]\'s ideal customer in detail:',
          type: 'textarea',
          required: false,
          groupTitle: 'Strategic target audience (core consumers, primary audience)',
        },
        {
          key: 'ideal_customer_demographics',
          label: 'Demographics (age, location, profession, income)',
          type: 'textarea',
          required: false,
          groupTitle: 'Strategic target audience (core consumers, primary audience)',
        },
        {
          key: 'ideal_customer_psychographics',
          label: 'Psychographics (lifestyle, values, interests, behaviors)',
          type: 'textarea',
          required: false,
          groupTitle: 'Strategic target audience (core consumers, primary audience)',
        },
        {
          key: 'ideal_customer_cares',
          label: 'What do they care about?',
          type: 'textarea',
          required: false,
          groupTitle: 'Strategic target audience (core consumers, primary audience)',
        },
        {
          key: 'ideal_customer_spend_time',
          label: 'Where do they spend their time? (online and offline)',
          type: 'textarea',
          required: false,
          groupTitle: 'Strategic target audience (core consumers, primary audience)',
        },
        {
          key: 'ideal_customer_insights',
          label: 'Other relevant insights',
          type: 'textarea',
          required: false,
          groupTitle: 'Strategic target audience (core consumers, primary audience)',
        },
        {
          key: 'secondary_audiences',
          label: 'Are there secondary audiences who might also benefit from [brand] brand?',
          type: 'textarea',
          required: false,
          groupTitle: 'Satellite (secondary) audiences',
        },
        {
          key: 'decision_influencers',
          label: 'Who else influences purchasing decisions? (e.g., decision-makers, recommenders, end-users if different)',
          type: 'textarea',
          required: false,
          groupTitle: 'Satellite (secondary) audiences',
        },
        {
          key: 'customer_motivation',
          label: 'Why do customers choose [brand]? What motivates them to convert?',
          type: 'textarea',
          required: false,
          groupTitle: 'Customer motivations',
        },
        {
          key: 'specific_need',
          label: 'What specific need is [brand] fulfilling for them?',
          type: 'textarea',
          required: false,
          groupTitle: 'Customer motivations',
        },
        {
          key: 'emotional_functional_benefit',
          label: 'What emotional or functional benefit do they gain?',
          type: 'textarea',
          required: false,
          groupTitle: 'Customer motivations',
        },
        {
          key: 'customer_pain_points',
          label: 'What are their pain points that [brand] addresses?',
          type: 'textarea',
          required: false,
          groupTitle: 'Customer motivations',
        },
      ],
    },

    // ========================================
    // SECTION 4: How the Brand Shows Up
    // ========================================
    {
      title: 'How the Brand Shows Up',
      questions: [
        {
          key: 'tone_of_voice_communication',
          label: 'How do you speak to [brand] consumers?',
          type: 'textarea',
          required: false,
          groupTitle: 'Tone of voice',
        },
        {
          key: 'brand_person_party',
          label: 'If your brand were a person at a party, how would they communicate?',
          type: 'textarea',
          required: false,
          groupTitle: 'Tone of voice',
        },
        {
          key: 'formal_casual',
          label: 'Formal or casual?',
          type: 'text',
          required: false,
          groupTitle: 'Tone of voice',
        },
        {
          key: 'serious_playful',
          label: 'Serious or playful?',
          type: 'text',
          required: false,
          groupTitle: 'Tone of voice',
        },
        {
          key: 'expert_friend',
          label: 'Expert or friend?',
          type: 'text',
          required: false,
          groupTitle: 'Tone of voice',
        },
        {
          key: 'bold_understated',
          label: 'Bold or understated?',
          type: 'text',
          required: false,
          groupTitle: 'Tone of voice',
        },
        {
          key: 'words_never_use',
          label: 'What words or phrases should your brand never use?',
          type: 'textarea',
          required: false,
          groupTitle: 'Tone of voice',
        },
        {
          key: 'words_authentic',
          label: 'What words or phrases feel authentic to your brand?',
          type: 'textarea',
          required: false,
          groupTitle: 'Tone of voice',
        },
        {
          key: 'brand_personality_adjectives',
          label: 'Please list 5-7 adjectives that best describe how your brand should be perceived.',
          type: 'textarea',
          required: false,
          groupTitle: 'Brand Personality',
          helper: 'Examples: professional, reliable, secure, innovative, friendly, luxurious, playful, bold, trustworthy, creative, sophisticated, accessible, energetic, calm, authoritative, warm, modern, traditional, sustainable, premium, affordable, transparent, inspiring, empowering...',
        },
        {
          key: 'desired_perception',
          label: 'How do you wish [brand] brand to be perceived by your target audience?',
          type: 'textarea',
          required: false,
          groupTitle: 'Desired Brand Perception',
        },
        {
          key: 'brand_emotion',
          label: 'What feeling or emotion should [brand] brand evoke?',
          type: 'textarea',
          required: false,
          groupTitle: 'Desired Brand Perception',
        },
        {
          key: 'brand_first_thought',
          label: 'When people think of [brand] brand, what should come to mind first?',
          type: 'textarea',
          required: false,
          groupTitle: 'Desired Brand Perception',
        },
      ],
    },

    // ========================================
    // SECTION 5: Visual identity direction (iconic assets)
    // ========================================
    {
      title: 'Visual identity direction (iconic assets)',
      questions: [
        {
          key: 'logo_personality_feminine_masculine',
          label: 'Based on the scale indicators, where would you position your logo?',
          type: 'slider',
          required: false,
          groupTitle: 'Logo personality scale',
          sliderOptions: {
            leftLabel: 'Feminine',
            rightLabel: 'Masculine',
            min: 0,
            max: 10,
            defaultValue: 5,
          },
        },
        {
          key: 'logo_personality_simple_complex',
          label: '',
          type: 'slider',
          required: false,
          sliderOptions: {
            leftLabel: 'Simple',
            rightLabel: 'Complex',
            min: 0,
            max: 10,
            defaultValue: 5,
          },
        },
        {
          key: 'logo_personality_youthful_established',
          label: '',
          type: 'slider',
          required: false,
          sliderOptions: {
            leftLabel: 'Youthful',
            rightLabel: 'Established',
            min: 0,
            max: 10,
            defaultValue: 5,
          },
        },
        {
          key: 'logo_personality_subtle_bright',
          label: '',
          type: 'slider',
          required: false,
          sliderOptions: {
            leftLabel: 'Subtle',
            rightLabel: 'Bright',
            min: 0,
            max: 10,
            defaultValue: 5,
          },
        },
        {
          key: 'logo_personality_classic_contemporary',
          label: '',
          type: 'slider',
          required: false,
          sliderOptions: {
            leftLabel: 'Classic',
            rightLabel: 'Contemporary',
            min: 0,
            max: 10,
            defaultValue: 5,
          },
        },
        {
          key: 'logo_personality_friendly_authoritative',
          label: '',
          type: 'slider',
          required: false,
          sliderOptions: {
            leftLabel: 'Friendly',
            rightLabel: 'Authoritative',
            min: 0,
            max: 10,
            defaultValue: 5,
          },
        },
        {
          key: 'logo_personality_economical_expensive',
          label: '',
          type: 'slider',
          required: false,
          sliderOptions: {
            leftLabel: 'Economical',
            rightLabel: 'Expensive',
            min: 0,
            max: 10,
            defaultValue: 5,
          },
        },
        {
          key: 'logo_personality_playful_serious',
          label: '',
          type: 'slider',
          required: false,
          sliderOptions: {
            leftLabel: 'Playful',
            rightLabel: 'Serious',
            min: 0,
            max: 10,
            defaultValue: 5,
          },
        },
        {
          key: 'logo_personality_unconventional_mainstream',
          label: '',
          type: 'slider',
          required: false,
          sliderOptions: {
            leftLabel: 'Unconventional',
            rightLabel: 'Mainstream',
            min: 0,
            max: 10,
            defaultValue: 5,
          },
        },
        {
          key: 'logo_personality_industrial_natural',
          label: '',
          type: 'slider',
          required: false,
          sliderOptions: {
            leftLabel: 'Industrial',
            rightLabel: 'Natural',
            min: 0,
            max: 10,
            defaultValue: 5,
          },
        },
        {
          key: 'logo_personality_approachable_elite',
          label: '',
          type: 'slider',
          required: false,
          sliderOptions: {
            leftLabel: 'Approachable',
            rightLabel: 'Elite',
            min: 0,
            max: 10,
            defaultValue: 5,
          },
        },
        {
          key: 'logo_personality_casual_elegant',
          label: '',
          type: 'slider',
          required: false,
          sliderOptions: {
            leftLabel: 'Casual',
            rightLabel: 'Elegant',
            min: 0,
            max: 10,
            defaultValue: 5,
          },
        },
        {
          key: 'logo_style_preference',
          label: 'Do you prefer shapes, typography, or a combination?',
          type: 'textarea',
          required: false,
          groupTitle: 'Logo style preferences',
        },
        {
          key: 'logo_imagery_icons',
          label: 'Do you have any specific imagery, icons, or symbols in mind for your logo?',
          type: 'textarea',
          required: false,
          groupTitle: 'Logo style preferences',
        },
        {
          key: 'logo_avoid',
          label: 'Are there any symbols or imagery you want to avoid?',
          type: 'textarea',
          required: false,
          groupTitle: 'Logo style preferences',
        },
        {
          key: 'color_preferences',
          label: 'Do you have any color preferences?',
          type: 'textarea',
          required: false,
          groupTitle: 'Color preferences',
        },
        {
          key: 'appropriate_colors',
          label: 'What colors do you find appropriate for your brand?',
          type: 'textarea',
          required: false,
          groupTitle: 'Color preferences',
        },
        {
          key: 'inappropriate_colors',
          label: 'What colors are definitely NOT appropriate?',
          type: 'textarea',
          required: false,
          groupTitle: 'Color preferences',
        },
        {
          key: 'color_associations',
          label: 'Are there any color associations in your industry we should be aware of?',
          type: 'textarea',
          required: false,
          groupTitle: 'Color preferences',
        },
        {
          key: 'typography_preferences',
          label: 'Any specific font styles you like or dislike?',
          type: 'textarea',
          required: false,
          groupTitle: 'Typography preferences',
        },
        {
          key: 'typography_style',
          label: 'Should the typography feel modern, classic, handwritten, geometric, etc.?',
          type: 'textarea',
          required: false,
          groupTitle: 'Typography preferences',
        },
      ],
    },

    // ========================================
    // SECTION 6: Inspiration & Competition
    // ========================================
    {
      title: 'Inspiration & Competition',
      questions: [
        {
          key: 'visual_references_like',
          label: 'Are there any existing logos or brands that you like? Why? Please share links or examples if possible.',
          type: 'textarea',
          required: false,
          groupTitle: 'Visual references',
        },
        {
          key: 'visual_references_like_why',
          label: 'What do you like about them (style, colors, simplicity, etc.)?',
          type: 'textarea',
          required: false,
          groupTitle: 'Visual references',
        },
        {
          key: 'visual_references_dislike',
          label: 'Are there any logos or brands that you dislike? Why? Please share links or examples if possible.',
          type: 'textarea',
          required: false,
          groupTitle: 'Visual references',
        },
        {
          key: 'main_competitors',
          label: 'Who are your main competitors?',
          type: 'subfields',
          required: false,
          groupTitle: 'Competitive landscape',
          subfields: {
            primary: {
              key: 'direct_competitors',
              label: 'Direct',
            },
            secondary: {
              key: 'indirect_competitors',
              label: 'Indirect',
            },
          },
        },
        {
          key: 'visual_differentiation',
          label: 'How do you want to differentiate visually from them?',
          type: 'textarea',
          required: false,
          groupTitle: 'Competitive landscape',
        },
        {
          key: 'industry_design_conventions',
          label: 'Are there any industry-specific design conventions or constraints we should consider?',
          type: 'textarea',
          required: false,
          groupTitle: 'Competitive landscape',
        },
      ],
    },

    // ========================================
    // SECTION 7: Current Branding
    // ========================================
    {
      title: 'Current Branding',
      questions: [
        {
          key: 'existing_branding',
          label: 'Do you have existing branding?',
          type: 'textarea',
          required: false,
          groupTitle: 'Existing Brand Audit',
        },
        {
          key: 'current_branding_like',
          label: 'What do you like about your current branding?',
          type: 'textarea',
          required: false,
          groupTitle: 'Existing Brand Audit',
        },
        {
          key: 'current_branding_dislike',
          label: 'What do you dislike about your current branding?',
          type: 'textarea',
          required: false,
          groupTitle: 'Existing Brand Audit',
        },
        {
          key: 'rebrand_reason',
          label: 'Why are you looking to rebrand or refresh?',
          type: 'textarea',
          required: false,
          groupTitle: 'Existing Brand Audit',
        },
        {
          key: 'elements_to_retain',
          label: 'What elements (if any) should be retained from your current brand?',
          type: 'textarea',
          required: false,
          groupTitle: 'Existing Brand Audit',
        },
      ],
    },

    // ========================================
    // SECTION 8: Final thoughts
    // ========================================
    {
      title: 'Final thoughts',
      questions: [
        {
          key: 'additional_info',
          label: 'Is there anything else we should know about your brand, business, or design preferences?',
          type: 'textarea',
          required: false,
        },
      ],
    },
  ],
  thankYouMessage: 'Thank you for taking the time to complete this questionnaire. Your answers will help us create a brand design that represents your vision and resonates with your audience.',
};

