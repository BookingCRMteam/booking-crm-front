import { User } from '@/entities/user';

export type CoupleProfileData = {
  firstPersonName: string;
  firstPersonSurname: string;
  secondPersonName: string;
  secondPersonSurname: string;
  phone: string;
};

export const getCoupleProfileData = (user: User): CoupleProfileData => ({
  firstPersonName: user.firstPersonName!,
  firstPersonSurname: user.firstPersonSurname!,
  secondPersonName: user.secondPersonName!,
  secondPersonSurname: user.secondPersonSurname!,
  phone: user.phone!,
});
