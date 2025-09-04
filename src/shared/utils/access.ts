import { PUBLIC_PATHS } from '../constants/routes';

/**
 * Перевіряє чи є шлях публічним
 */
export const isPublicPath = (pathname: string): boolean => {
  return Object.values(PUBLIC_PATHS).some((path) =>
    path === '/' ? pathname === '/' : pathname.startsWith(path),
  );
};
