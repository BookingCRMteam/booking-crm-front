'use client';

import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { Button, Container, Typography } from '@mui/material';

import Link from 'next/link';

export default function ForbiddenPage() {
  return (
    <Container
      maxWidth="sm"
      sx={{
        textAlign: 'center',
        pt: 10,
        pb: 10,
      }}
    >
      <LockOutlinedIcon sx={{ fontSize: 80, color: 'error.main', mb: 2 }} />

      <Typography variant="h3" gutterBottom>
        403 - Доступ заборонено
      </Typography>

      <Typography variant="body1" sx={{ mb: 4 }}>
        У вас немає прав доступу до цієї сторінки. Якщо ви вважаєте, що це
        помилка — зверніться до адміністратора.
      </Typography>

      <Button variant="contained" color="primary" component={Link} href="/">
        На головну
      </Button>
    </Container>
  );
}
