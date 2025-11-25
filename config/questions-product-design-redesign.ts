import type { QuestionConfig, SectionConfig, QuestionnaireConfig } from '@/types/questionnaire';

// Product Design (Redesign) Questionnaire Configuration
export const PRODUCT_DESIGN_REDESIGN_CONFIG: QuestionnaireConfig = {
  title: 'Product design questionnaire',
  purpose: {
    title: 'Purpose of this exercise',
    content: 'This questionnaire is designed to help us gain a deep understanding of your product, your business, and the vision guiding its development.\n\nYour responses will inform our approach, ensuring that our design work aligns with your goals, your users\' needs, and the broader market context.\n\nPlease provide as much detail as possible so we can build an accurate foundation for the product strategy and design process.',
  },
  goal: {
    title: 'The goal of this exercise',
    content: 'Understand the product, services, initial idea, mission, vision, and value behind the product.\n\nUnderstand the business and its development journey so far.\n\nUnderstand the business model, go-to-market strategy, and monetization strategy.\n\nUnderstand the marketplace and target personas.',
  },
  sections: [
    // ========================================
    // SECTION 1: About the company
    // ========================================
    {
      title: 'About the company',
      questions: [
        {
          key: 'official_website',
          label: 'Official website',
          type: 'url',
          required: true,
          placeholder: 'https://yourwebsite.com',
        },
        {
          key: 'product_demo_access',
          label: 'Product (demo) access',
          type: 'url',
          required: true,
          placeholder: 'https://app.yourproduct.com or demo credentials',
        },
        {
          key: 'main_business_goals',
          label: 'What are the main goals business strives to achieve with the product?',
          type: 'textarea',
          required: false,
        },
      ],
    },

    // ========================================
    // SECTION 2: Current product overview
    // ========================================
    {
      title: 'Current product overview',
      questions: [
        {
          key: 'core_product',
          label: 'The core product',
          type: 'textarea',
          required: false,
          groupTitle: 'Describe the current product ecosystem',
          helper: 'The main digital product (app, website, platform, internal tool, etc.)',
        },
        {
          key: 'integrations',
          label: 'Integrations',
          type: 'textarea',
          required: false,
          groupTitle: 'Describe the current product ecosystem',
          helper: 'Describe how the product connects with other services or platforms.',
        },
        {
          key: 'supporting_systems',
          label: 'Supporting systems and tools',
          type: 'textarea',
          required: false,
          groupTitle: 'Describe the current product ecosystem',
          helper: 'List and describe external or internal systems your product depends on, such as: Databases, Content management systems, Authentication systems, Analytics tools, Payment gateways, CRM/ERP systems, Third-party APIs',
        },
        {
          key: 'dependencies_constraints',
          label: 'Dependencies and constraints',
          type: 'textarea',
          required: false,
          groupTitle: 'Describe the current product ecosystem',
          helper: 'anything in the ecosystem that limits or shapes development: Legacy systems, Compliance requirements, Technical constraints, Vendor contracts',
        },
        {
          key: 'user_feedback_collection',
          label: 'Do you collect user feedback in any format?',
          type: 'textarea',
          required: false,
          helper: 'If yes: How do you use analytics tools to track website performance and user behavior?',
        },
        {
          key: 'what_users_like',
          label: 'What existing user like in the current product?',
          type: 'textarea',
          required: false,
          helper: 'Summary of the user feedback',
        },
        {
          key: 'what_works_well',
          label: 'What is working well with the current product?',
          type: 'textarea',
          required: false,
          helper: 'Summary of the user feedback',
        },
        {
          key: 'what_users_dislike',
          label: 'What do they dislike about the current product?',
          type: 'textarea',
          required: false,
          helper: 'Summary of the user feedback',
        },
        {
          key: 'what_not_working',
          label: 'What is not working well with the current product?',
          type: 'textarea',
          required: false,
          helper: 'Summary of the user feedback',
        },
        {
          key: 'customer_satisfaction_loyalty',
          label: 'How do you ensure customer satisfaction and loyalty post-purchase?',
          type: 'textarea',
          required: false,
          helper: 'Ensuring satisfaction and loyalty involves identifying effective strategies for maintaining long-term customer relationships.',
        },
        {
          key: 'ongoing_support',
          label: 'What kind of ongoing support do you provide to your customers?',
          type: 'textarea',
          required: false,
          helper: 'Understanding the support offered post-purchase ensures that customers feel valued and continue to trust your brand.',
        },
        {
          key: 'gather_utilize_feedback',
          label: 'How do you gather and utilize customer feedback?',
          type: 'textarea',
          required: false,
          helper: 'Gathering feedback helps continuously improve products, services, and customer experience to meet evolving needs.',
        },
      ],
    },

    // ========================================
    // SECTION 3: Product offering and market insights
    // ========================================
    {
      title: 'Product offering and market insights',
      questions: [
        {
          key: 'mission_vision',
          label: 'What is the mission and vision of [product]?',
          type: 'textarea',
          required: true,
          helper: 'Understanding the mission and vision helps to align strategic recommendations with the core values and long-term aspirations of the business.',
        },
        {
          key: 'products_services_offered',
          label: 'What products or services does [product] offer specifically?',
          type: 'textarea',
          required: true,
          helper: 'Helps to understand the product offering and why the product exists in the market.',
        },
        {
          key: 'industry_facilitation',
          label: 'How do these products facilitate jobs for different industries?',
          type: 'textarea',
          required: false,
          helper: 'Understanding how the products serve various industries provides insight into the versatility and market applicability of the offerings, shaping targeted marketing strategies.',
        },
        {
          key: 'tailored_solutions',
          label: 'Do you do tailored solutions for each client?',
          type: 'textarea',
          required: false,
          helper: 'Knowing whether solutions are customized highlights the level of personalization and flexibility in the client\'s approach, which is key to creating bespoke strategies.',
        },
        {
          key: 'product_focus',
          label: 'What is the high level focus of the product: B2B, B2C etc?',
          type: 'text',
          required: false,
          helper: 'Identifying if products serve individual consumers helps understand the context.',
        },
        {
          key: 'high_profile_clients',
          label: 'How does [product] tailor its solutions to meet the specific needs of high-profile clients?',
          type: 'textarea',
          required: false,
          helper: 'Understanding how high-profile clients\' needs are met showcases the company\'s focus in delivering the offering.',
        },
        {
          key: 'project_lifecycle',
          label: 'Can you describe a typical project lifecycle from initial contact with the customer to their onboarding?',
          type: 'textarea',
          required: false,
          helper: 'Outlining the project lifecycle helps identify key touchpoints and opportunities for improvement or enhancement in client engagement and delivery.',
        },
        {
          key: 'competitors',
          label: 'What products are direct and indirect competitors?',
          type: 'subfields',
          required: true,
          helper: 'Provide their websites\' URLs. Direct - Direct have product offering very similar to [product]. Indirect - Indirect competitors have product that can be observed as substitutes to [product]',
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
          key: 'differentiation',
          label: 'What sets [product] apart from competitors?',
          type: 'textarea',
          required: true,
          helper: 'Defining the unique selling proposition is essential for differentiating the client in a competitive marketplace and establishing a strong brand identity.',
        },
        {
          key: 'market_challenges',
          label: 'What are the main challenges [product] faces in the market?',
          type: 'textarea',
          required: true,
          helper: 'Identifying market challenges allows for the development of strategies that address obstacles and capitalize on opportunities for growth.',
        },
      ],
    },

    // ========================================
    // SECTION 4: Target Audience and User Personas
    // ========================================
    {
      title: 'Target Audience and User Personas',
      description: 'The goal of this set of questions is to understand the target audience and main user personas that the client is communicating with through their website.',
      questions: [
        {
          key: 'target_audience_definition',
          label: 'How would you define [product] target audience? Who is the person that is perceived as a user persona?',
          type: 'subfields',
          required: false,
          helper: 'Defining the target perosnas helps understand the profile of the potential product users.',
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
          label: 'What are the common demographic characteristics of [product] target audience (age, gender, location, income level)?',
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
          label: 'What industries do [product] potential customers belong to?',
          type: 'textarea',
          required: false,
          helper: 'Knowing the industries helps customize solutions and messaging for sectors that are most relevant to the client\'s offerings.',
        },
        {
          key: 'customer_needs_challenges',
          label: 'What are their specific needs and challenges when looking for solutions in [product] niche? What problem does [product] solve for them?',
          type: 'textarea',
          required: false,
          helper: 'Identifying their pain points allows for the development of targeted solutions that directly address their most pressing issues.',
        },
        {
          key: 'why_need_product',
          label: 'Why do they need [product] product/services?',
          type: 'textarea',
          required: false,
          helper: 'Understanding why the audience needs your services highlights the value proposition and enables more effective communication of benefits.',
        },
        {
          key: 'evaluation_factors',
          label: 'What factors do potential customers consider when evaluating [product] solutions?',
          type: 'textarea',
          required: false,
          helper: 'Knowing the evaluation criteria allows you to address key decision points and align messaging to meet customer expectations.',
        },
        {
          key: 'decision_maker',
          label: 'Who is the decision maker?',
          type: 'text',
          required: false,
          helper: 'Pinpointing the key decision maker ensures that content and strategies are tailored to influence those with purchasing authority or decision-making power.',
        },
        {
          key: 'customer_discovery',
          label: 'How and where do your potential clients find out about your business?',
          type: 'textarea',
          required: false,
          helper: 'Identifying how clients discover your business helps refine marketing and outreach strategies to maximize visibility.',
        },
        {
          key: 'choice_motivation',
          label: 'What motivates the audience to choose [product] product/service over competitors?',
          type: 'textarea',
          required: false,
          helper: 'Understanding motivations helps highlight the key selling points that resonate most with your audience, guiding more compelling messaging.',
        },
        {
          key: 'most_sold_plan',
          label: 'What is the most sold product plan?',
          type: 'text',
          required: false,
          helper: 'Identifying the top-selling offerings helps focus on what resonates most with your audience and informs promotional strategies.',
        },
        {
          key: 'decision_phase_resources',
          label: 'What information or resources do potential customers need to move to the decision phase?',
          type: 'textarea',
          required: false,
          helper: 'Identifying necessary resources ensures that customers have the confidence and knowledge to make informed purchasing decisions.',
        },
      ],
    },

    // ========================================
    // SECTION 5: User journeys
    // ========================================
    {
      title: 'User journeys',
      description: 'This section aims to inquire more about the journeys user can take in the product that are focus from the perspective of the business goals.',
      questions: [
        {
          key: 'product_purpose',
          label: 'What is the main purpose of the product for the business?',
          type: 'textarea',
          required: false,
          helper: 'Understanding the primary purpose of the product helps us create a connection with the business objectives.',
        },
        {
          key: 'user_goals_aspirations',
          label: 'What are the key goals or aspirations of [product] target audience when using [product] product or service?',
          type: 'textarea',
          required: false,
          helper: 'Knowing their goals and pain points ensures understanding of the product purpose for the client.',
        },
        {
          key: 'current_interaction',
          label: 'How do they currently interact with [product] product?',
          type: 'textarea',
          required: false,
          helper: 'Understanding user journeys in the current version of the product provides insight into user experience and helps having a shared understanding of our engagement focus.',
        },
        {
          key: 'onboarding_looks_like',
          label: 'How does the onboarding looks like?',
          type: 'textarea',
          required: false,
          helper: 'Understanding the follow-up process allows for the optimization of lead management and customer engagement.',
        },
        {
          key: 'priority_user_journeys',
          label: 'List all relevant user journeys that are priority in our engagement',
          type: 'textarea',
          required: false,
        },
        {
          key: 'user_journey_step_by_step',
          label: 'Describe each user journey step by step',
          type: 'textarea',
          required: false,
        },
      ],
    },

    // ========================================
    // SECTION 6: Product design
    // ========================================
    {
      title: 'Product design',
      questions: [
        {
          key: 'existing_brand_guidelines',
          label: 'Are there existing brand guidelines for the visual direction of the UI in the product?',
          type: 'textarea',
          required: false,
          helper: 'Identifying brand guidelines ensures that all design elements adhere to established standards for consistency.',
        },
        {
          key: 'design_emotions_messages',
          label: 'What specific emotions or messages do you want your website design to convey to visitors?',
          type: 'textarea',
          required: false,
          helper: 'Knowing the intended emotional response helps guide design choices that resonate with the audience.',
        },
        {
          key: 'brand_personality_reflection',
          label: 'How does your current website reflect your brand personality and voice?',
          type: 'textarea',
          required: false,
          helper: 'Assessing the alignment of the website with brand personality helps identify areas for improvement.',
        },
      ],
    },

    // ========================================
    // SECTION 7: Current product design process
    // ========================================
    {
      title: 'Current product design process',
      questions: [
        {
          key: 'current_design_workflow',
          label: 'Describe current product design workflow',
          type: 'textarea',
          required: false,
        },
        {
          key: 'design_organisation',
          label: 'How is the product design organised in a practical sense? Is there a design system?',
          type: 'textarea',
          required: false,
        },
      ],
    },

    // ========================================
    // SECTION 8: Additional resources
    // ========================================
    {
      title: 'Additional resources',
      description: 'Please share any relevant documentation, inputs, work done previously and other important resources we could use to educate ourselves about the product.',
      questions: [
        {
          key: 'features_list',
          label: 'List of features and descriptions',
          type: 'file',
          required: false,
        },
        {
          key: 'user_journeys_docs',
          label: 'List of user journeys that should be delivered in our engagement',
          type: 'file',
          required: false,
        },
        {
          key: 'tech_resources',
          label: 'Technology related resources',
          type: 'file',
          required: false,
        },
        {
          key: 'other_documentation',
          label: 'Other relevant documentation',
          type: 'file',
          required: false,
        },
      ],
    },
  ],
  thankYouMessage: 'Thank you for taking the time to complete this questionnaire. Your answers will help us collect valuable insights about your product.',
};

