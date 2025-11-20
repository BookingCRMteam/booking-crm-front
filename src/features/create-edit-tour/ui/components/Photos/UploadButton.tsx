import { useState } from 'react';

import Image from 'next/image';

import { Box, Typography } from '@mui/material';

type UploadButtonProps = {
  onAddPhoto: (files: FileList) => void;
};

const buttonWrapper = {
  width: '206px',
  height: '165px',
  p: 4,
  display: 'flex',
  flexDirection: 'column',
  gap: '12px',
  justifyContent: 'center',
  alignItems: 'center',
  textAlign: 'center',
  backgroundImage: `url('/images/upload_photo.png')`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
  cursor: 'pointer',
  transition: '0.2s',
  '&:hover': { backgroundColor: '#EDFFFD' },
};

export const UploadButton = ({ onAddPhoto }: UploadButtonProps) => {
  const [error, setError] = useState('');

  const handleFiles = (files: FileList) => {
    const maxSize = 5 * 1024 * 1024;
    const invalidFiles = Array.from(files).filter(
      (file) =>
        !['image/jpeg', 'image/png'].includes(file.type) || file.size > maxSize,
    );

    if (invalidFiles.length > 0) {
      setError('Деякі файли не відповідають вимогам і не були завантажені');
      return;
    }

    setError('');
    onAddPhoto(files);
  };

  return (
    <Box
      sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
    >
      <Box component="label" sx={buttonWrapper}>
        <Image
          src="/icons/mdi_camera.svg"
          alt="Іконка камери"
          width={40}
          height={40}
        />

        <Typography
          variant="bodyDefault"
          sx={(theme) => ({ color: theme.palette.primaryExtended[800] })}
        >
          Завантажити фото
        </Typography>

        <Typography variant="labelCaption">JPG/PNG, до 5 МБ</Typography>

        <input
          type="file"
          accept="image/jpeg,image/png"
          hidden
          multiple
          onChange={(e) => {
            if (!e.target.files) return;
            handleFiles(e.target.files);
            e.target.value = '';
          }}
        />
      </Box>

      {error && (
        <Typography variant="caption" color="error" sx={{ mt: 1 }}>
          {error}
        </Typography>
      )}
    </Box>
  );
};
