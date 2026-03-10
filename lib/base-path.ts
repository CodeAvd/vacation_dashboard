export const BASE_PATH = process.env.NODE_ENV === 'production' ? '/vacation_dashboard' : '';

export function withBasePath(path: string): string {
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  return `${BASE_PATH}${normalizedPath}`;
}
