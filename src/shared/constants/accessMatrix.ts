import { UserRole } from '../types/roles';

//TODO: обдумати реалізацію PRIVATE_ROUTE
type Routes =
  | '/profile'
  | '/operator'
  | '/admin'
  | '/super-admin'
  | '/operator-onboarding';

type AccessMatrix = Record<Routes, UserRole[]>;

export const ACCESS_MATRIX: AccessMatrix = {
  '/profile': ['traveler', 'superadmin', 'admin', 'operator'],
  '/operator': ['operator', 'superadmin'],
  '/admin': ['admin', 'superadmin'],
  '/super-admin': ['superadmin'],
  '/operator-onboarding': ['traveler'],
} as const;
