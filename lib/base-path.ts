const repoName = process.env.NEXT_PUBLIC_PAGES_REPO_NAME || 'vacation_dashboard';

export const BASE_PATH = process.env.NODE_ENV === 'production' ? `/${repoName}` : '';

export function withBasePath(path: string): string {
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  return `${BASE_PATH}${normalizedPath}`;
}
