import type { User } from '@/entities/user';

export type CoupleProfileData = {
  firstPersonName: string;
  firstPersonSurname: string;
  secondPersonName: string;
  secondPersonSurname: string;
  phone: string;
};

export const getCoupleProfileData = (user: User): CoupleProfileData => {
  if (
    !user.firstPersonName ||
    !user.firstPersonSurname ||
    !user.secondPersonName ||
    !user.secondPersonSurname ||
    !user.phone
  ) {
    throw new Error(
      'Cannot create CoupleProfileData: required fields are missing',
    );
  }

  return {
    firstPersonName: user.firstPersonName,
    firstPersonSurname: user.firstPersonSurname,
    secondPersonName: user.secondPersonName,
    secondPersonSurname: user.secondPersonSurname,
    phone: user.phone,
  };
};
