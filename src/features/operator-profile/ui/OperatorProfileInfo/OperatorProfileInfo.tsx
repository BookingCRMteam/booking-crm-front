import type { FC, ReactNode } from 'react';

import { Box, Button } from '@mui/material';

interface OperatorProfileInfoProps {
  onEdit: () => void;
  children: ReactNode;
}

export const OperatorProfileInfo: FC<OperatorProfileInfoProps> = ({
  onEdit,
  children,
}) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 4,
      }}
    >
      {children}
      <Button
        onClick={onEdit}
        variant="contained"
        color="primary"
        size="large"
        sx={{ maxWidth: 200, width: '100%', placeSelf: 'center' }}
        data-testid="edit-button"
      >
        Редагувати
      </Button>
    </Box>
  );
};
