import type { User } from '@/entities/user';

import { getCoupleProfileData } from './getCoupleProfileData';
import { CoupleProfileData } from './getCoupleProfileData';

const completeUser: User = {
  firstPersonName: 'Іван',
  firstPersonSurname: 'Коваленко',
  secondPersonName: 'Марія',
  secondPersonSurname: 'Петренко',
  phone: '+380501234567',
  email: 'test@example.com',
  createdAt: '0',
  updatedAt: '1',
  id: 1,
  operatorId: null,
  role: 'traveler',
  sub: 'mockSub',
};

const expectedData: CoupleProfileData = {
  firstPersonName: 'Іван',
  firstPersonSurname: 'Коваленко',
  secondPersonName: 'Марія',
  secondPersonSurname: 'Петренко',
  phone: '+380501234567',
  email: 'test@example.com',
};

describe('getCoupleProfileData', () => {
  it('returns correct CoupleProfileData when all fields are filled', () => {
    const result = getCoupleProfileData(completeUser);
    expect(result).toEqual(expectedData);
  });

  it('throws an error if phone is missing', () => {
    const incompleteUser = { ...completeUser, phone: null };
    expect(() => getCoupleProfileData(incompleteUser)).toThrow(
      'Cannot create CoupleProfileData: required fields are missing',
    );
  });

  it('throws an error if firstPersonName is missing', () => {
    const incompleteUser = { ...completeUser, firstPersonName: '' };
    expect(() => getCoupleProfileData(incompleteUser)).toThrow(
      'Cannot create CoupleProfileData: required fields are missing',
    );
  });

  it('throws an error if email is missing', () => {
    const incompleteUser = { ...completeUser, email: '' };
    expect(() => getCoupleProfileData(incompleteUser)).toThrow(
      'Cannot create CoupleProfileData: required fields are missing',
    );
  });

  it('throws an error if secondPersonSurname is missing', () => {
    const incompleteUser = { ...completeUser, secondPersonSurname: null };
    expect(() => getCoupleProfileData(incompleteUser)).toThrow(
      'Cannot create CoupleProfileData: required fields are missing',
    );
  });

  it('ignores extra fields not in CoupleProfileData', () => {
    const userWithExtraData = {
      ...completeUser,
      extraField: 'should be ignored',
    };
    const result = getCoupleProfileData(userWithExtraData);

    expect(result).toEqual(expectedData);
    expect(Object.keys(result).length).toBe(6);
  });
});
