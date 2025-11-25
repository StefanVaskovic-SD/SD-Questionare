import type { QuestionConfig, SectionConfig, QuestionnaireConfig } from '@/types/questionnaire';
import { PRODUCT_DESIGN_NEW_CONFIG } from './questions-product-design-new';
import { PRODUCT_DESIGN_REDESIGN_CONFIG } from './questions-product-design-redesign';
import { WEB_DESIGN_NEW_CONFIG } from './questions-web-design-new';
import { WEB_DESIGN_REDESIGN_CONFIG } from './questions-web-design-redesign';
import { BRAND_DESIGN_NEW_CONFIG } from './questions-brand-design-new';

// Legacy structure - keeping for backward compatibility
export const PRODUCT_DESIGN_QUESTIONS: SectionConfig[] = [
  // ========================================
  // SECTION 1: About the company
  // ========================================
  {
    title: 'About the company',
    intro: 'Tell us about your company and product foundations.',
    questions: [
      {
        key: 'product_name_meaning',
        label: 'What is the meaning behind the product name?',
        type: 'textarea',
        required: false,
        placeholder: 'e.g., The name represents our core mission of...',
      },
      {
        key: 'current_website',
        label: 'Current website',
        type: 'url',
        required: true,
        placeholder: 'https://yourwebsite.com',
      },
      {
        key: 'product_access',
        label: 'Product access',
        type: 'url',
        required: true,
        placeholder: 'https://app.yourproduct.com or demo credentials',
        helper: 'Provide a link to access your product or demo credentials',
      },
      {
        key: 'main_business_goals',
        label: 'What are the main goals business strives to achieve with the product?',
        type: 'textarea',
        required: false,
        placeholder: 'e.g., Increase market share, improve user retention...',
      },
    ],
  },

  // ========================================
  // SECTION 2: Product offering and market insights
  // ========================================
  {
    title: 'Product offering and market insights',
    intro: 'Help us understand your product, market position, and competitive landscape.',
    questions: [
      {
        key: 'mission_vision',
        label: 'What is the mission and vision of [client]?',
        type: 'textarea',
        required: true,
        placeholder: 'Our mission is to... Our vision is to...',
        helper: 'Understanding the mission and vision helps to align strategic recommendations with the core values and long-term aspirations of the business.',
      },
      {
        key: 'products_services_offered',
        label: 'What products or services does [client] offer specifically?',
        type: 'textarea',
        required: true,
        placeholder: 'We offer...',
        helper: 'Helps to understand the product offering and why the product exists in the market.',
      },
      {
        key: 'industry_facilitation',
        label: 'How do these products facilitate jobs for different industries?',
        type: 'textarea',
        required: false,
        placeholder: 'Our products help industries by...',
        helper: 'Understanding how the products serve various industries provides insight into the versatility and market applicability of the offerings, shaping targeted marketing strategies.',
      },
      {
        key: 'tailored_solutions',
        label: 'Do you do tailored solutions for each client?',
        type: 'textarea',
        required: false,
        placeholder: 'Yes, we customize... / No, we offer standardized...',
        helper: 'Knowing whether solutions are customized highlights the level of personalization and flexibility in the client\'s approach, which is key to creating bespoke strategies.',
      },
      {
        key: 'product_focus',
        label: 'What is the high level focus of the product: B2B, B2C etc?',
        type: 'text',
        required: false,
        placeholder: 'B2B, B2C, B2B2C...',
        helper: 'Identifying if products serve individual consumers helps understand the context.',
      },
      {
        key: 'high_profile_clients',
        label: 'How does [client] tailor its solutions to meet the specific needs of high-profile clients?',
        type: 'textarea',
        required: false,
        placeholder: 'We provide dedicated support, custom features...',
        helper: 'Understanding how high-profile clients\' needs are met showcases the company\'s focus in delivering the offering.',
      },
      {
        key: 'project_lifecycle',
        label: 'Can you describe a typical project lifecycle from initial contact with the customer to their onboarding?',
        type: 'textarea',
        required: false,
        placeholder: '1. Initial contact... 2. Discovery call... 3. Proposal...',
        helper: 'Outlining the project lifecycle helps identify key touchpoints and opportunities for improvement or enhancement in client engagement and delivery.',
      },
      {
        key: 'competitors',
        label: 'What products are direct and indirect competitors? Provide their websites\' URLs.',
        type: 'textarea',
        required: true,
        placeholder: 'Direct competitors:\n- Company A: https://...\n- Company B: https://...\n\nIndirect competitors:\n- Company X: https://...',
        helper: 'Direct competitors have product offering very similar to [client]. Indirect competitors have products that can be observed as substitutes to [client].',
      },
      {
        key: 'differentiation',
        label: 'What sets [client] apart from competitors?',
        type: 'textarea',
        required: true,
        placeholder: 'Our unique advantages are...',
        helper: 'Defining the unique selling proposition is essential for differentiating the client in a competitive marketplace and establishing a strong brand identity.',
      },
      {
        key: 'market_challenges',
        label: 'What are the main challenges [client] faces in the market?',
        type: 'textarea',
        required: true,
        placeholder: 'Current challenges include...',
        helper: 'Identifying market challenges allows for the development of strategies that address obstacles and capitalize on opportunities for growth.',
      },
    ],
  },

  // ========================================
  // SECTION 3: Target Audience and User Personas
  // ========================================
  {
    title: 'Target Audience and User Personas',
    intro: 'The goal of this set of questions is to understand the target audience and main user personas that the client is communicating with through their website.',
    questions: [
      {
        key: 'target_audience',
        label: 'How would you define [client] target audience? Who is the person that is perceived as a user persona?',
        type: 'subfields',
        required: false,
        helper: 'Defining the target personas helps understand the profile of the potential product users.',
        subfields: {
          primary: {
            key: 'target_audience_primary',
            label: 'Primary',
          },
          secondary: {
            key: 'target_audience_secondary',
            label: 'Secondary',
          },
        },
      },
      {
        key: 'demographic_characteristics',
        label: 'What are the common demographic characteristics of [client] target audience (age, gender, location, income level)?',
        type: 'subfields',
        required: false,
        helper: 'Gathering demographic data helps refine your messaging and marketing efforts to appeal to specific groups.',
        subfields: {
          primary: {
            key: 'demographics_primary',
            label: 'Primary',
          },
          secondary: {
            key: 'demographics_secondary',
            label: 'Secondary',
          },
        },
      },
      {
        key: 'customer_industries',
        label: 'What industries do [client] potential customers belong to?',
        type: 'textarea',
        required: false,
        placeholder: 'Healthcare, Finance, Education...',
        helper: 'Knowing the industries helps customize solutions and messaging for sectors that are most relevant to the client\'s offerings.',
      },
      {
        key: 'customer_needs_challenges',
        label: 'What are their specific needs and challenges when looking for solutions in [client] niche? What problem does [client] solve for them?',
        type: 'textarea',
        required: false,
        placeholder: 'They struggle with... We solve this by...',
        helper: 'Identifying their pain points allows for the development of targeted solutions that directly address their most pressing issues.',
      },
      {
        key: 'why_need_product',
        label: 'Why do they need [client] product/services?',
        type: 'textarea',
        required: false,
        placeholder: 'They need our product because...',
        helper: 'Understanding why the audience needs your services highlights the value proposition and enables more effective communication of benefits.',
      },
      {
        key: 'evaluation_factors',
        label: 'What factors do potential customers consider when evaluating [client] solutions?',
        type: 'textarea',
        required: false,
        placeholder: 'Price, features, support, integration capabilities...',
        helper: 'Knowing the evaluation criteria allows you to address key decision points and align messaging to meet customer expectations.',
      },
      {
        key: 'decision_maker',
        label: 'Who is the decision maker?',
        type: 'text',
        required: false,
        placeholder: 'CTO, VP of Marketing, Business Owner...',
        helper: 'Pinpointing the key decision maker ensures that content and strategies are tailored to influence those with purchasing authority or decision-making power.',
      },
      {
        key: 'customer_discovery',
        label: 'How and where do your potential clients find out about your business?',
        type: 'textarea',
        required: false,
        placeholder: 'Google search, referrals, social media, conferences...',
        helper: 'Identifying how clients discover your business helps refine marketing and outreach strategies to maximize visibility.',
      },
      {
        key: 'choice_motivation',
        label: 'What motivates the audience to choose [client] product/service over competitors?',
        type: 'textarea',
        required: false,
        placeholder: 'Better pricing, superior features, excellent support...',
        helper: 'Understanding motivations helps highlight the key selling points that resonate most with your audience, guiding more compelling messaging.',
      },
      {
        key: 'most_sold_plan',
        label: 'What is the most sold product plan?',
        type: 'text',
        required: false,
        placeholder: 'Professional Plan, Enterprise Tier...',
        helper: 'Identifying the top-selling offerings helps focus on what resonates most with your audience and informs promotional strategies.',
      },
      {
        key: 'decision_phase_resources',
        label: 'What information or resources do potential customers need to move to the decision phase?',
        type: 'textarea',
        required: false,
        placeholder: 'Case studies, pricing details, demos, testimonials...',
        helper: 'Identifying necessary resources ensures that customers have the confidence and knowledge to make informed purchasing decisions.',
      },
    ],
  },

  // ========================================
  // SECTION 4: User journeys
  // ========================================
  {
    title: 'User journeys',
    intro: 'This section aims to inquire more about the journeys user can take in the product that are focus from the perspective of the business goals.',
    questions: [
      {
        key: 'product_purpose',
        label: 'What is the main purpose of the product for the business?',
        type: 'textarea',
        required: false,
        placeholder: 'The product aims to...',
        helper: 'Understanding the primary purpose of the product helps us create a connection with the business objectives.',
      },
      {
        key: 'user_goals',
        label: 'What are the key goals or aspirations of [client] target audience when using [client] product or service?',
        type: 'textarea',
        required: false,
        placeholder: 'Users want to achieve...',
        helper: 'Knowing their goals and pain points ensures understanding of the product purpose for the client.',
      },
      {
        key: 'current_interaction',
        label: 'How do they currently interact with [client] product?',
        type: 'textarea',
        required: false,
        placeholder: 'Users typically start by... then they...',
        helper: 'Understanding user journeys in the current version of the product provides insight into user experience and helps having a shared understanding of our engagement focus.',
      },
      {
        key: 'onboarding_process',
        label: 'How does the onboarding look like?',
        type: 'textarea',
        required: false,
        placeholder: 'Step 1: Sign up... Step 2: Tutorial...',
        helper: 'Understanding the follow-up process allows for the optimization of lead management and customer engagement.',
      },
      {
        key: 'priority_user_journeys',
        label: 'List all relevant user journeys that are priority in our engagement',
        type: 'textarea',
        required: false,
        placeholder: '1. First-time user onboarding\n2. Power user workflow\n3. Admin management...',
      },
      {
        key: 'user_journey_details',
        label: 'Describe each user journey step by step',
        type: 'textarea',
        required: false,
        placeholder: 'Journey 1: First-time user\nStep 1: ...\nStep 2: ...\n\nJourney 2: ...',
      },
    ],
  },

  // ========================================
  // SECTION 5: Current product overview
  // ========================================
  {
    title: 'Current product overview',
    intro: 'Help us understand the current state of your product and user feedback.',
    questions: [
      {
        key: 'product_description',
        label: 'Describe the product',
        type: 'textarea',
        required: false,
        placeholder: 'Our product is...',
      },
      {
        key: 'user_feedback_collection',
        label: 'Do you collect user feedback in any format? If yes: How do you use analytics tools to track website performance and user behavior?',
        type: 'textarea',
        required: false,
        placeholder: 'We use Google Analytics, Hotjar, surveys...',
      },
      {
        key: 'feedback_summary',
        label: 'Summary of the user feedback',
        type: 'textarea',
        required: false,
        placeholder: 'Users generally say...',
      },
      {
        key: 'what_users_like',
        label: 'What existing users like in the current product?',
        type: 'textarea',
        required: false,
        placeholder: 'Users love the...',
      },
      {
        key: 'what_works_well',
        label: 'What is working well with the current product?',
        type: 'textarea',
        required: false,
        placeholder: 'The feature X is very popular...',
      },
      {
        key: 'what_users_dislike',
        label: 'What do they dislike about the current product?',
        type: 'textarea',
        required: false,
        placeholder: 'Users complain about...',
      },
      {
        key: 'what_not_working',
        label: 'What is not working well with the current product?',
        type: 'textarea',
        required: false,
        placeholder: 'We have issues with...',
      },
      {
        key: 'customer_satisfaction',
        label: 'How do you ensure customer satisfaction and loyalty post-purchase?',
        type: 'textarea',
        required: false,
        placeholder: 'We provide regular check-ins, updates...',
        helper: 'Ensuring satisfaction and loyalty involves identifying effective strategies for maintaining long-term customer relationships.',
      },
      {
        key: 'ongoing_support',
        label: 'What kind of ongoing support do you provide to your customers?',
        type: 'textarea',
        required: false,
        placeholder: '24/7 chat support, knowledge base, dedicated account manager...',
        helper: 'Understanding the support offered post-purchase ensures that customers feel valued and continue to trust your brand.',
      },
      {
        key: 'feedback_utilization',
        label: 'How do you gather and utilize customer feedback?',
        type: 'textarea',
        required: false,
        placeholder: 'We conduct quarterly surveys, analyze support tickets...',
        helper: 'Gathering feedback helps continuously improve products, services, and customer experience to meet evolving needs.',
      },
    ],
  },

  // ========================================
  // SECTION 6: Additional resources
  // ========================================
  {
    title: 'Additional resources',
    intro: 'Please share any relevant documentation, inputs, work done previously and other important resources we could use to educate ourselves about the product.',
    questions: [
      {
        key: 'features_list',
        label: 'List of features and descriptions',
        type: 'file',
        required: false,
        helper: 'Upload documents describing your product features',
      },
      {
        key: 'user_journeys_docs',
        label: 'List of user journeys that should be delivered in our engagement',
        type: 'file',
        required: false,
        helper: 'Upload user journey maps, flow diagrams, etc.',
      },
      {
        key: 'tech_resources',
        label: 'Technology related resources',
        type: 'file',
        required: false,
        helper: 'API documentation, tech stack overview, architecture diagrams, etc.',
      },
      {
        key: 'other_documentation',
        label: 'Other relevant documentation',
        type: 'file',
        required: false,
        helper: 'Any other materials that would help us understand your product better',
      },
    ],
  },
];

// TODO: Create similar structures for WEB_DESIGN_QUESTIONS and BRAND_DESIGN_QUESTIONS
export const WEB_DESIGN_QUESTIONS: SectionConfig[] = [];
export const BRAND_DESIGN_QUESTIONS: SectionConfig[] = [];

// Helper function to get all questions as flat array
export function getAllQuestions(sections: SectionConfig[]): QuestionConfig[] {
  return sections.flatMap(section => section.questions);
}

// Helper function to get question by key
export function getQuestionByKey(sections: SectionConfig[], key: string): QuestionConfig | undefined {
  return getAllQuestions(sections).find(q => q.key === key);
}

// Get questions by type
export function getQuestionsByType(type: string): SectionConfig[] {
  // Map new type format to question sets
  if (type === 'product-design-new') {
    return PRODUCT_DESIGN_NEW_CONFIG.sections;
  }
  if (type === 'product-design-redesign') {
    return PRODUCT_DESIGN_REDESIGN_CONFIG.sections;
  }
  if (type.startsWith('product-design')) {
    return PRODUCT_DESIGN_QUESTIONS;
  }
  if (type === 'web-design-new') {
    return WEB_DESIGN_NEW_CONFIG.sections;
  }
  if (type === 'web-design-redesign') {
    return WEB_DESIGN_REDESIGN_CONFIG.sections;
  }
  if (type.startsWith('web-design')) {
    return WEB_DESIGN_QUESTIONS;
  }
  if (type === 'brand-design-new') {
    return BRAND_DESIGN_NEW_CONFIG.sections;
  }
  if (type.startsWith('brand-design')) {
    return BRAND_DESIGN_QUESTIONS;
  }
  if (type === 'motion') {
    // TODO: Add MOTION_QUESTIONS when provided
    return [];
  }
  return [];
}

// Get questionnaire config (includes title, purpose, goal, thank you message)
export function getQuestionnaireConfig(type: string): QuestionnaireConfig | null {
  if (type === 'product-design-new') {
    return PRODUCT_DESIGN_NEW_CONFIG;
  }
  if (type === 'product-design-redesign') {
    return PRODUCT_DESIGN_REDESIGN_CONFIG;
  }
  if (type === 'web-design-new') {
    return WEB_DESIGN_NEW_CONFIG;
  }
  if (type === 'web-design-redesign') {
    return WEB_DESIGN_REDESIGN_CONFIG;
  }
  if (type === 'brand-design-new') {
    return BRAND_DESIGN_NEW_CONFIG;
  }
  // For other types, return null (will use default structure)
  return null;
}

