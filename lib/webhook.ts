import type { WebhookPayload, QuestionnaireType } from '@/types/questionnaire';
import { getQuestionnaireUrl } from './utils';

/**
 * Trigger n8n webhook with questionnaire submission data
 * This function should not block the user - if webhook fails, user still sees success
 */
export async function triggerWebhook(
  questionnaireId: string,
  type: QuestionnaireType,
  clientName: string,
  productName: string,
  slug: string,
  token: string,
  submittedAt: string,
  responses: Array<{
    section: string;
    question: string;
    answer: string;
    files: string[];
  }>
): Promise<void> {
  const webhookUrl = process.env.NEXT_PUBLIC_N8N_WEBHOOK_URL;

  if (!webhookUrl) {
    console.warn('N8N webhook URL not configured. Skipping webhook call.');
    return;
  }

  try {
    const link = getQuestionnaireUrl(type, slug, token);

    const payload: WebhookPayload = {
      questionnaire_id: questionnaireId,
      type,
      client_name: clientName,
      product_name: productName,
      submitted_at: submittedAt,
      link,
      responses,
    };

    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error(`Webhook responded with status: ${response.status}`);
    }

    console.log('Webhook triggered successfully');
  } catch (error) {
    // Don't throw - webhook failure shouldn't block user
    console.error('Failed to trigger webhook:', error);
    // Optionally, you could log this to a monitoring service
  }
}

