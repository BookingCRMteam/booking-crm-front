import { UserRole } from '../types/roles';

type Routes =
  | '/profile'
  | '/booking'
  | '/tourist'
  | '/operator'
  | '/admin'
  | '/super-admin';
type AccessMatrix = Record<Routes, UserRole[]>;

export const ACCESS_MATRIX: AccessMatrix = {
  '/profile': ['Tourist', 'SuperAdmin', 'Admin', 'Operator'],
  '/booking': ['Tourist', 'SuperAdmin'],
  '/tourist': ['Tourist', 'SuperAdmin'],
  '/operator': ['Operator', 'SuperAdmin'],
  '/admin': ['Admin', 'SuperAdmin'],
  '/super-admin': ['SuperAdmin'],
} as const;
