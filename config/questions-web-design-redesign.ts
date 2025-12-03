import type { QuestionConfig, SectionConfig, QuestionnaireConfig } from '@/types/questionnaire';

// Web Design (Redesign) Questionnaire Configuration
export const WEB_DESIGN_REDESIGN_CONFIG: QuestionnaireConfig = {
  title: 'Discovery Workshop Template',
  goal: {
    title: 'The goal of this exercise',
    content: 'Understand the product, services, initial idea, mission, vision, and value behind the product.\n\nUnderstand the business and its development journey so far.\n\nUnderstand the business model, go-to-market strategy, and monetization strategy.\n\nUnderstand the marketplace and target personas.',
  },
  sections: [
    // ========================================
    // SECTION 1: Company & Business
    // ========================================
    {
      title: 'Company & Business',
      questions: [
        {
          key: 'mission_vision',
          label: 'What is the mission and vision of [product]?',
          type: 'textarea',
          required: false,
          helper: 'Understanding the mission and vision helps to align strategic recommendations with the core values and long-term aspirations of the business.',
        },
        {
          key: 'products_services_offered',
          label: 'What products or services does [product] offer specifically?',
          type: 'textarea',
          required: false,
          helper: 'Clarifying the specific products or services helps ensure that the strategy aligns with the core offerings and capabilities of the business.',
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
          key: 'personal_needs_products',
          label: 'Do you sell products for personal needs?',
          type: 'textarea',
          required: false,
          helper: 'Identifying if products serve individual consumers helps in crafting messaging and marketing approaches for B2C vs. B2B audiences.',
        },
        {
          key: 'high_profile_clients',
          label: 'How does [product] tailor its solutions to meet the specific needs of high-profile clients?',
          type: 'textarea',
          required: false,
          helper: 'Understanding how high-profile clients\' needs are met showcases the company\'s ability to deliver premium, customized services, crucial for brand positioning.',
        },
        {
          key: 'differentiation',
          label: 'What sets [product] apart from competitors?',
          type: 'textarea',
          required: false,
          helper: 'Defining the unique selling points is essential for differentiating the client in a competitive marketplace and establishing a strong brand identity.',
        },
        {
          key: 'project_lifecycle',
          label: 'Can you describe a typical project lifecycle from initial contact to delivery?',
          type: 'textarea',
          required: false,
          helper: 'Outlining the project lifecycle helps identify key touchpoints and opportunities for improvement or enhancement in client engagement and delivery.',
        },
        {
          key: 'market_challenges',
          label: 'What are the main challenges [product] faces in the market?',
          type: 'textarea',
          required: false,
          helper: 'Identifying market challenges allows for the development of strategies that address obstacles and capitalize on opportunities for growth.',
        },
      ],
    },

    // ========================================
    // SECTION 2: Target Audience and User Personas
    // ========================================
    {
      title: 'Target Audience and User Personas',
      questions: [
        {
          key: 'target_audience_description',
          label: 'How would you describe your target audience? Who are they?',
          type: 'subfields',
          required: false,
          helper: 'Defining the target audience helps tailor marketing strategies to the specific demographic, ensuring messages resonate with the right groups.',
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
          key: 'why_need_services',
          label: 'Why do they need your services?',
          type: 'subfields',
          required: false,
          helper: 'Understanding why the audience needs your services highlights the value proposition and enables more effective communication of benefits.',
          subfields: {
            primary: {
              key: 'why_need_services_primary',
              label: 'Primary',
            },
            secondary: {
              key: 'why_need_services_secondary',
              label: 'Secondary',
            },
          },
        },
        {
          key: 'customer_industries',
          label: 'What industries do your potential customers belong to?',
          type: 'textarea',
          required: false,
          helper: 'Knowing the industries helps customize solutions and messaging for sectors that are most relevant to the client\'s offerings.',
        },
        {
          key: 'customer_needs_challenges',
          label: 'What are their specific needs and challenges when looking for your solutions? What problem do you solve for them?',
          type: 'subfields',
          required: false,
          helper: 'Identifying their pain points allows for the development of targeted solutions that directly address their most pressing issues.',
          subfields: {
            primary: {
              key: 'needs_challenges_primary',
              label: 'Primary',
            },
            secondary: {
              key: 'needs_challenges_secondary',
              label: 'Secondary',
            },
          },
        },
        {
          key: 'current_website_interaction',
          label: 'How do they currently interact with your website?',
          type: 'textarea',
          required: false,
          helper: 'Understanding current website visitors provides insight into user experience and helps identify areas for improvement or enhancement.',
        },
        {
          key: 'decision_maker_persona',
          label: 'Who is the person who makes a decision (user persona) that we want to communicate with on the site?',
          type: 'textarea',
          required: false,
          helper: 'Pinpointing the key decision maker ensures that content and strategies are tailored to influence those with purchasing authority or decision-making power.',
        },
        {
          key: 'demographic_characteristics',
          label: 'What are the common demographic characteristics of your target audience (age, gender, location, income level)?',
          type: 'textarea',
          required: false,
          helper: 'Gathering demographic data helps refine your messaging and marketing efforts to appeal to specific groups.',
        },
        {
          key: 'choice_motivation',
          label: 'What motivates your audience to choose your product/service over competitors?',
          type: 'textarea',
          required: false,
          helper: 'Understanding motivations helps highlight the key selling points that resonate most with your audience, guiding more compelling messaging.',
        },
        {
          key: 'user_goals_aspirations',
          label: 'What are the key goals or aspirations of your target audience when using your product or service?',
          type: 'textarea',
          required: false,
          helper: 'Knowing their goals ensures that the product or service is positioned as a solution that helps them achieve their desired outcomes.',
        },
      ],
    },

    // ========================================
    // SECTION 3: Customer Journey
    // ========================================
    {
      title: 'Customer Journey',
      questions: [
        {
          key: 'customer_discovery',
          label: 'How and where do your potential clients find out about your business?',
          type: 'textarea',
          required: false,
          helper: 'Identifying how clients discover your business helps refine marketing and outreach strategies to maximize visibility.',
        },
        {
          key: 'next_action',
          label: 'What then? What is the next action the customer should take?',
          type: 'textarea',
          required: false,
          helper: 'Clarifying the next step in the customer journey ensures a seamless path from discovery to engagement with your business.',
        },
        {
          key: 'contact_form_process',
          label: 'What is the process when someone fills out your contact form or product inquiry form?',
          type: 'textarea',
          required: false,
          helper: 'Understanding the follow-up process allows for the optimization of lead management and customer engagement.',
        },
        {
          key: 'most_sold_product',
          label: 'What is the most sold product service/solution?',
          type: 'textarea',
          required: false,
          helper: 'Identifying the top-selling offerings helps focus on what resonates most with your audience and informs promotional strategies.',
        },
        {
          key: 'evaluation_factors',
          label: 'What factors do potential customers consider when evaluating [product] solutions?',
          type: 'textarea',
          required: false,
          helper: 'Knowing the evaluation criteria allows you to address key decision points and align messaging to meet customer expectations.',
        },
        {
          key: 'decision_phase_resources',
          label: 'What information or resources do potential customers need to move to the decision phase?',
          type: 'textarea',
          required: false,
          helper: 'Identifying necessary resources ensures that customers have the confidence and knowledge to make informed purchasing decisions.',
        },
        {
          key: 'decision_making_criteria',
          label: 'What are the key decision-making criteria for your customers?',
          type: 'textarea',
          required: false,
          helper: 'Understanding what drives purchasing decisions helps tailor offerings and communication to meet these criteria.',
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
    // SECTION 4: Website Goals
    // ========================================
    {
      title: 'Website Goals',
      questions: [
        {
          key: 'website_main_purpose',
          label: 'What is the main purpose of your site for the business?',
          type: 'textarea',
          required: false,
          helper: 'Understanding the primary purpose of the website clarifies how it serves business objectives, such as lead generation, e-commerce, or brand awareness.',
        },
        {
          key: 'website_business_strategy',
          label: 'How do you envision the new website supporting your overall business strategy?',
          type: 'textarea',
          required: false,
          helper: 'This question helps align the website\'s design and functionality with strategic goals, such as reaching new markets or improving customer experience.',
        },
        {
          key: 'must_have_features',
          label: 'What are the must-have features and functionalities for the new website?',
          type: 'textarea',
          required: false,
          helper: 'Identifying essential features ensures the website meets user needs and supports key business activities.',
        },
        {
          key: 'performance_expectations',
          label: 'What are your expectations regarding website performance, scalability, and maintenance?',
          type: 'textarea',
          required: false,
          helper: 'Are these in place plans for a website in the context of growth, fast loading times, and require minimal upkeep.',
        },
      ],
    },

    // ========================================
    // SECTION 5: Design and Branding
    // ========================================
    {
      title: 'Design and Branding',
      questions: [
        {
          key: 'brand_identity_representation',
          label: 'How do you want your brand identity (logo, color palette, typography) to be represented on the website?',
          type: 'textarea',
          required: false,
          helper: 'Understanding the desired brand representation ensures design consistency and alignment with the overall brand identity.',
        },
        {
          key: 'existing_brand_guidelines',
          label: 'Are there existing brand guidelines that dictate how your brand should be applied on the website?',
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
          key: 'competitor_design',
          label: 'Who are your primary competitors design-wise, and how do you want your website to stand out in comparison?',
          type: 'textarea',
          required: false,
          helper: 'Understanding competitive differentiation helps create a unique website experience that captures attention.',
        },
        {
          key: 'website_design_goals',
          label: 'What are the primary goals for your website design (e.g., enhancing user engagement, improving lead generation, reinforcing brand identity)?',
          type: 'textarea',
          required: false,
          helper: 'Clarifying design goals helps align visual elements with business objectives and user needs.',
        },
        {
          key: 'current_design_feedback',
          label: 'What feedback have you received about your current website\'s design and branding from users or stakeholders?',
          type: 'textarea',
          required: false,
          helper: 'Gathering feedback provides insights into how well the website communicates the brand and where improvements can be made.',
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
    // SECTION 6: Tech requirements
    // ========================================
    {
      title: 'Tech requirements',
      questions: [
        {
          key: 'multilingual_support',
          label: 'Does your website need to support multiple languages? If so, how many and which ones?',
          type: 'textarea',
          required: false,
          groupTitle: 'Multilingual & Localization',
          helper: 'Helps determine localization strategy and appropriate technical solution.',
        },
        {
          key: 'multilingual_tool_preference',
          label: 'Do you have an existing preference or tool for multilingual management (e.g., Weglot, Polyflow, native Webflow)?',
          type: 'textarea',
          required: false,
          groupTitle: 'Multilingual & Localization',
          helper: 'Clarifies integration needs and approach to handling multilingual content.',
        },
        {
          key: 'crm_functionalities',
          label: 'Do you require custom or specific CRM functionalities integrated into the website (e.g., lead tracking, automated workflows)?',
          type: 'textarea',
          required: false,
          groupTitle: 'CRM Integration',
          helper: 'Identifies the depth and complexity of the integration required.',
        },
        {
          key: 'current_crm_system',
          label: 'Which Customer Relationship Management (CRM) system are you currently using (HubSpot, Salesforce, Pipedrive, ActiveCampaign, etc.)?',
          type: 'textarea',
          required: false,
          groupTitle: 'CRM Integration',
          helper: 'Defines requirements for integrating lead capture, forms, and user data.',
        },
        {
          key: 'analytics_tracking_tools',
          label: 'What analytics and tracking tools are currently set up or will need to be implemented (Google Analytics, Google Tag Manager, Hotjar, etc.)?',
          type: 'textarea',
          required: false,
          groupTitle: 'Analytics & Tracking',
          helper: 'Ensures proper integration and measurement of website performance.',
        },
        {
          key: 'custom_event_tracking',
          label: 'Do you have custom event tracking or user-behavior tracking requirements that need to be considered during development?',
          type: 'textarea',
          required: false,
          groupTitle: 'Analytics & Tracking',
          helper: 'Helps define custom tracking implementations, data layers, and event tagging.',
        },
        {
          key: 'custom_apis_integrations',
          label: 'Are there any custom APIs or third-party integrations your website relies on or needs to connect to (e.g., payment gateways, booking systems, external databases)?',
          type: 'textarea',
          required: false,
          groupTitle: 'Custom Integrations & APIs',
          helper: 'Helps assess complexity and scope of external integrations.',
        },
        {
          key: 'automation_backend_needs',
          label: 'Do you anticipate any automation needs or backend data management? Any type of dashboard or memberships?',
          type: 'textarea',
          required: false,
          groupTitle: 'Custom Integrations & APIs',
        },
        {
          key: 'content_management_responsibility',
          label: 'Who will be responsible for entering and managing content on the website—your internal team or our team?',
          type: 'textarea',
          required: false,
          groupTitle: 'Content Management & Migration',
          helper: 'Clarifies expectations around content input and project scope.',
        },
        {
          key: 'custom_cms_features',
          label: 'Do you require any custom CMS features or complex dynamic structures (e.g., event calendars, team directories, resource hubs, portfolios)? Or are these going to be recognised in the design process of the discovery?',
          type: 'textarea',
          required: false,
          groupTitle: 'Content Management & Migration',
          helper: 'Identifies custom CMS structure requirements for accurate implementation.',
        },
        {
          key: 'content_migration',
          label: 'Will existing content need to be migrated from another CMS, website, or database into Webflow? If yes, please specify the source and approximate amount.',
          type: 'textarea',
          required: false,
          groupTitle: 'Content Management & Migration',
          helper: 'Helps determine effort and strategy needed for content migration.',
        },
      ],
    },

    // ========================================
    // SECTION 7: SEO and Content
    // ========================================
    {
      title: 'SEO and Content',
      questions: [
        {
          key: 'keywords_phrases',
          label: 'Do you know which keywords or phrases people might use to find your business online?',
          type: 'textarea',
          required: false,
          helper: 'Understanding relevant keywords helps you target search terms that potential customers might use.',
        },
        {
          key: 'content_topics_questions',
          label: 'Are there topics or questions that your target audience frequently asks that you could create content about?',
          type: 'textarea',
          required: false,
          helper: 'Creating content around common questions helps attract people searching for answers or solutions related to your business.',
        },
        {
          key: 'current_content',
          label: 'How much content do you have on your website currently, and what kind of content is it (e.g., blogs, product descriptions, service pages)?',
          type: 'textarea',
          required: false,
          helper: 'Knowing what content already exists gives a starting point for what to improve or add for SEO.',
        },
        {
          key: 'competitor_seo_research',
          label: 'Have you done any research on what your competitors are doing with their websites in terms of content and SEO? Who are your main competitors in terms of SEO?',
          type: 'textarea',
          required: false,
          helper: 'Learning from competitors can help you understand what works and where you can stand out.',
        },
        {
          key: 'analytics_tools',
          label: 'Have you set up any tools to measure website traffic, such as Google Analytics or Google Search Console?',
          type: 'textarea',
          required: false,
          helper: 'Tracking traffic helps you see what\'s working and where you need to make improvements.',
        },
        {
          key: 'content_update_process',
          label: 'Do you have a process for checking if your website content is up to date and still relevant?',
          type: 'textarea',
          required: false,
          helper: 'Regularly reviewing content ensures it continues to provide value and perform well in search results.',
        },
        {
          key: 'technical_seo_errors',
          label: 'Have you checked if your website has any broken links, missing pages, or other errors that could affect its performance in search engines?',
          type: 'textarea',
          required: false,
          helper: 'Identifying and fixing technical SEO errors like broken links, redirects, canonicals, sitemap, etc., improves user experience and helps prevent search engines from penalizing your site.',
        },
      ],
    },

    // ========================================
    // SECTION 8: Martech
    // ========================================
    {
      title: 'Martech',
      questions: [
        {
          key: 'current_martech_tools',
          label: 'What martech tools or platforms are currently integrated into your website?',
          type: 'textarea',
          required: false,
          helper: 'Understanding existing tools helps identify the technological foundation and capabilities in place.',
        },
        {
          key: 'analytics_usage',
          label: 'How do you use analytics tools to track website performance and user behavior?',
          type: 'textarea',
          required: false,
          helper: 'This question explores how data is leveraged to inform marketing strategies and website optimization.',
        },
        {
          key: 'crm_integration_current',
          label: 'What customer relationship management (CRM) system do you use, and how is it connected to your website?',
          type: 'textarea',
          required: false,
          helper: 'Knowing the CRM integration allows for a better understanding of lead management and customer engagement processes.',
        },
        {
          key: 'email_marketing_current',
          label: 'How do you manage email marketing campaigns through your website?',
          type: 'textarea',
          required: false,
          helper: 'Understanding email marketing practices reveals how effectively the website is used to nurture leads and communicate with customers.',
        },
        {
          key: 'seo_tools_current',
          label: 'What tools do you use for search engine optimization (SEO) and keyword tracking?',
          type: 'textarea',
          required: false,
          helper: 'Identifying SEO tools helps assess the current strategy for driving organic traffic and improving search visibility.',
        },
        {
          key: 'cms_usage',
          label: 'How do you utilize content management systems (CMS) to create and publish content on your website?',
          type: 'textarea',
          required: false,
          helper: 'Understanding the CMS in use provides insights into content strategies and website maintainability.',
        },
        {
          key: 'social_media_integration_current',
          label: 'What social media integration do you have on your website, and how does it influence engagement?',
          type: 'textarea',
          required: false,
          helper: 'Exploring social media integration reveals how the website leverages social channels for user interaction and brand awareness.',
        },
        {
          key: 'marketing_automation_current',
          label: 'How do you use marketing automation tools on your website?',
          type: 'textarea',
          required: false,
          helper: 'Understanding marketing automation practices helps identify efficiencies in lead nurturing and customer communication.',
        },
        {
          key: 'ab_testing',
          label: 'What is your approach to A/B testing on the website, and which elements do you typically test?',
          type: 'textarea',
          required: false,
          helper: 'Knowing how A/B testing is implemented provides insights into optimization efforts and data-driven decision-making.',
        },
        {
          key: 'new_martech_goals',
          label: 'What are your goals for implementing new martech solutions on your website?',
          type: 'textarea',
          required: false,
          helper: 'Understanding the objectives for martech investments helps align technology with business strategy and user needs.',
        },
        {
          key: 'data_privacy_compliance_martech',
          label: 'How do you ensure data privacy and compliance with regulations (e.g., GDPR, CCPA) through your martech tools?',
          type: 'textarea',
          required: false,
          helper: 'Knowing the compliance measures in place ensures that user data is handled responsibly and legally.',
        },
      ],
    },
  ],
  thankYouMessage: 'Thank you for taking the time to complete this questionnaire. Your answers will help us collect valuable insights about your website.',
};




