import { UserRole } from '../types/roles';

type Routes = '/profile' | '/operator' | '/admin' | '/super-admin';

type AccessMatrix = Record<Routes, UserRole[]>;

export const ACCESS_MATRIX: AccessMatrix = {
  '/profile': ['traveler', 'superadmin', 'admin', 'operator'],
  '/operator': ['operator', 'superadmin'],
  '/admin': ['admin', 'superadmin'],
  '/super-admin': ['superadmin'],
} as const;
