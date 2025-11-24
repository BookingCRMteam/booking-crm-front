import { Box, Button, Typography } from '@mui/material';

export const ErrorLoading = () => {
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
        Виникла помилка при завантаженні турів
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
        {'Спробуйте оновити сторінку'}
      </Typography>
      <Button variant="contained" onClick={() => window.location.reload()}>
        Спробувати ще раз
      </Button>
    </Box>
  );
};
