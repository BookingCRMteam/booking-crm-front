import { useCallback, useState } from 'react';

import { usePathname, useRouter } from 'next/navigation';

import { useUserQuery } from '@/entities/user';

import { AUTH_URL } from '@/shared/constants';
import { useNotificationStore } from '@/shared/store';

export const useBookingAuthModal = () => {
  const [open, setOpen] = useState(false);
  const { data: user } = useUserQuery();
  const router = useRouter();
  const currentPath = usePathname();
  const showNotification = useNotificationStore((s) => s.showNotification);

  const handleOpen = useCallback(() => {
    if (user) {
      showNotification('Починається бронювання', 'success');
    } else {
      setOpen(true);
    }
  }, [user, showNotification]);

  const handleAuth = useCallback(() => {
    router.push(`${AUTH_URL.LOGIN}?returnTo=${currentPath}`);
  }, [router, currentPath]);

  const handleClose = useCallback(() => setOpen(false), []);

  return {
    isLoggedIn: !!user,
    isModalOpen: open,
    handleOpen,
    handleAuth,
    handleClose,
  };
};
