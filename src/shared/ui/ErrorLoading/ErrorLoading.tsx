import { Box, Button, Typography } from '@mui/material';

type ErrorLoadingProps = {
  message?: string;
  actionText?: string;
  onRetry?: () => void;
};

export const ErrorLoading = ({
  message = 'Виникла помилка при завантаженні турів',
  actionText = 'Спробуйте оновити сторінку',
  onRetry,
}: ErrorLoadingProps) => {
  return (
    <Box
      sx={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        p: 2,
        textAlign: 'center',
      }}
    >
      <Typography variant="bodyLarge" color="error" sx={{ mb: 2 }}>
        {message}
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
        {actionText}
      </Typography>
      <Button
        variant="contained"
        onClick={onRetry || (() => window.location.reload())}
      >
        Спробувати ще раз
      </Button>
    </Box>
  );
};
