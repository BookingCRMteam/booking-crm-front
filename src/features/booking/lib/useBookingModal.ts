import { useCallback, useState } from 'react';

import { usePathname, useRouter } from 'next/navigation';

import { useUserQuery } from '@/entities/user';

import { AUTH_URL } from '@/shared/constants';

export const useBookingModal = () => {
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [bookingModalOpen, setBookingModalOpen] = useState(false);

  const { data: user } = useUserQuery();
  const router = useRouter();
  const currentPath = usePathname();

  const handleOpen = useCallback(() => {
    if (user) {
      setBookingModalOpen(true);
    } else {
      setAuthModalOpen(true);
    }
  }, [user]);

  const handleAuth = useCallback(() => {
    router.push(`${AUTH_URL.LOGIN}?returnTo=${currentPath}`);
  }, [router, currentPath]);

  const handleCloseAuth = useCallback(() => setAuthModalOpen(false), []);
  const handleCloseBooking = useCallback(() => setBookingModalOpen(false), []);

  return {
    isLoggedIn: !!user,
    isAuthModalOpen: authModalOpen,
    isBookingModalOpen: bookingModalOpen,
    handleOpen,
    handleAuth,
    handleCloseAuth,
    handleCloseBooking,
  };
};
