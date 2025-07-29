import { ACCESS_MATRIX } from '../constants/accessMatrix';
import { PUBLIC_PATHS } from '../constants/routes';
import { UserRole } from '../types/roles';

/**
 * Перевіряє чи є шлях публічним
 */
export const isPublicPath = (pathname: string): boolean => {
  return Object.values(PUBLIC_PATHS).some((path) =>
    path === '/' ? pathname === '/' : pathname.startsWith(path),
  );
};

/**
 * Перевіряє чи має користувач доступ до шляху
 */
export const hasAccessToPath = (
  pathname: string,
  userRoles: UserRole[],
): boolean => {
  for (const [routePrefix, allowedRoles] of Object.entries(ACCESS_MATRIX)) {
    if (pathname.startsWith(routePrefix)) {
      return allowedRoles.some((role) => userRoles.includes(role));
    }
  }
  return true; // Якщо шлях не знайдено в матриці, вважаємо що доступ дозволено
};
