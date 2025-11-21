/**
 * Admin password authentication utilities
 * Simple password protection without full login system
 */

const ADMIN_PASSWORD_KEY = 'admin_authenticated';
const ADMIN_PASSWORD = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || 'admin123';

/**
 * Check if admin is authenticated (password entered)
 */
export function isAdminAuthenticated(): boolean {
  if (typeof window === 'undefined') return false;
  
  const authStatus = localStorage.getItem(ADMIN_PASSWORD_KEY);
  return authStatus === 'true';
}

/**
 * Authenticate admin with password
 */
export function authenticateAdmin(password: string): boolean {
  if (password === ADMIN_PASSWORD) {
    if (typeof window !== 'undefined') {
      localStorage.setItem(ADMIN_PASSWORD_KEY, 'true');
    }
    return true;
  }
  return false;
}

/**
 * Logout admin (clear authentication)
 */
export function logoutAdmin(): void {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(ADMIN_PASSWORD_KEY);
  }
}

/**
 * Check if current path is a public questionnaire link (with token)
 * These paths should NOT be password protected
 * 
 * Public paths:
 * - /questionnaires/[type]/[slug]?token=xxx (questionnaire form)
 * - /questionnaires/[type]/[slug]/success?token=xxx (success page)
 */
export function isPublicQuestionnairePath(pathname: string, searchParams?: URLSearchParams): boolean {
  // Check if path matches questionnaire with token pattern
  // /questionnaires/[type]/[slug]?token=xxx
  // /questionnaires/[type]/[slug]/success?token=xxx
  const questionnairePattern = /^\/questionnaires\/[^/]+\/[^/]+(\/success)?$/;
  
  if (!questionnairePattern.test(pathname)) {
    return false;
  }
  
  // Check if token exists in URL
  if (searchParams) {
    return searchParams.has('token');
  }
  
  // If no searchParams provided, check window.location
  if (typeof window !== 'undefined') {
    const url = new URL(window.location.href);
    return url.searchParams.has('token');
  }
  
  return false;
}

