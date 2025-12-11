import { OperatorById } from '@/entities/operator';
import { User } from '@/entities/user';

import { UserRole } from '@/shared/types';

export const mockUserOperator: User = {
  id: 10,
  email: 'operator@example.com',
  sub: 'sub123',
  createdAt: '2025-01-01',
  updatedAt: '2025-01-01',
  operatorId: 1,
  firstPersonName: 'Олена',
  firstPersonSurname: 'Петренко',
  secondPersonName: null,
  secondPersonSurname: null,
  phone: '+380971234567',
  role: 'operator' as UserRole,
};

export const mockUserTraveler: User = {
  id: 12,
  email: 'traveler@example.com',
  sub: 'sub123',
  createdAt: '2025-01-01',
  updatedAt: '2025-01-01',
  operatorId: null,
  firstPersonName: 'Тимофій',
  firstPersonSurname: 'Іванов',
  secondPersonName: 'Олена',
  secondPersonSurname: 'Іванова',
  phone: '+380971234568',
  role: 'traveler' as UserRole,
};

export const mockOperatorById: OperatorById = {
  id: 1,
  email: 'operator@example.com',
  createdAt: '2025-09-29T12:02:12.599Z',
  updatedAt: '2025-09-29T12:02:12.599Z',
  userId: 10,
  companyName: 'Приватна особа',
  firstName: 'Олена',
  lastName: 'Петренко',
  phone: '+380971234567',
  website: 'https://instagram.com',
  status: 'approved',
  description:
    'Я закохалася в Італію ще десять років тому і з того часу перетворила цю любов на справу свого життя. Мої подорожі — це не «тури», а атмосферні історії, де кожна деталь створює особливий настрій.',
  philosophy:
    'Я вірю, що подорож — це про емоції та відчуття. Тому створюю маршрути так, щоб вони залишали не тільки спогади про місця, а й тепло в серці — від келиха вина серед тосканських пагорбів до вечері під звуки фаду в Лісабоні.',

  photo: '/images/public_operator.jpg',
  rejectionReason: null,
};
