import type { WebhookPayload } from '@/types/questionnaire';

/**
 * Escape CSV field value (handles commas, quotes, newlines)
 */
function escapeCsvField(value: string): string {
  // If value contains comma, quote, or newline, wrap in quotes and escape quotes
  if (value.includes(',') || value.includes('"') || value.includes('\n')) {
    return `"${value.replace(/"/g, '""')}"`;
  }
  return value;
}

/**
 * Convert responses array to CSV format
 */
export function generateCsvFromResponses(
  clientName: string,
  productName: string,
  type: string,
  submittedAt: string,
  responses: Array<{
    section: string;
    question: string;
    answer: string;
    files: string[];
  }>
): string {
  // CSV Header
  const headers = ['Section', 'Question', 'Answer', 'Files'];
  
  // Build CSV rows
  const rows: string[] = [];
  
  // Add metadata rows at the top
  rows.push(`Client Name,${escapeCsvField(clientName)}`);
  rows.push(`Product Name,${escapeCsvField(productName)}`);
  rows.push(`Questionnaire Type,${escapeCsvField(type)}`);
  rows.push(`Submitted At,${escapeCsvField(submittedAt)}`);
  rows.push(''); // Empty row separator
  
  // Add header row
  rows.push(headers.map(escapeCsvField).join(','));
  
  // Add data rows
  for (const response of responses) {
    const section = escapeCsvField(response.section);
    const question = escapeCsvField(response.question);
    const answer = escapeCsvField(response.answer || '');
    const files = escapeCsvField(
      response.files && response.files.length > 0
        ? response.files.join('; ')
        : ''
    );
    
    rows.push([section, question, answer, files].join(','));
  }
  
  return rows.join('\n');
}

/**
 * Generate CSV filename
 */
export function generateCsvFilename(
  clientName: string,
  productName: string,
  submittedAt: string
): string {
  const date = new Date(submittedAt);
  const dateStr = date.toISOString().split('T')[0]; // YYYY-MM-DD
  const clientSlug = clientName.toLowerCase().replace(/[^a-z0-9]+/g, '-');
  const productSlug = productName.toLowerCase().replace(/[^a-z0-9]+/g, '-');
  
  return `questionnaire-${clientSlug}-${productSlug}-${dateStr}.csv`;
}

