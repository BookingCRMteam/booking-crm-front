import { useState } from 'react';

import Image from 'next/image';

import { Box, InputLabel, Typography, styled } from '@mui/material';

type UploadButtonProps = {
  onAddPhoto: (files: FileList) => void;
};

const ButtonWrapper = styled(InputLabel)(({ theme }) => ({
  width: '200px',
  height: '156px',
  p: 4,
  display: 'flex',
  flexDirection: 'column',
  gap: '12px',
  justifyContent: 'center',
  alignItems: 'center',
  textAlign: 'center',
  border: `2px dashed ${theme.palette.primary.main}`,
  cursor: 'pointer',
  transition: '0.2s',
  '&:hover': { backgroundColor: `${theme.palette.primaryExtended[50]}` },
}));

export const UploadButton = ({ onAddPhoto }: UploadButtonProps) => {
  const [error, setError] = useState('');

  const handleFiles = (files: FileList) => {
    const maxSize = 5 * 1024 * 1024;
    const validFiles: File[] = [];
    const invalidFiles: File[] = [];

    Array.from(files).forEach((file) => {
      if (
        ['image/jpeg', 'image/png'].includes(file.type) &&
        file.size <= maxSize
      ) {
        validFiles.push(file);
      } else {
        invalidFiles.push(file);
      }
    });

    if (invalidFiles.length > 0) {
      setError('Деякі файли не відповідають вимогам і не були завантажені');
    } else {
      setError('');
    }

    if (validFiles.length > 0) {
      onAddPhoto(validFiles as unknown as FileList);
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <ButtonWrapper>
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
          onClick={() => setError('')}
          onChange={(e) => {
            if (!e.target.files) return;
            handleFiles(e.target.files);
            e.target.value = '';
          }}
        />
      </ButtonWrapper>

      {error && (
        <Typography
          variant="caption"
          color="error"
          sx={{
            mt: 0.5,
            textAlign: 'center',
            width: '100%',
          }}
        >
          {error}
        </Typography>
      )}
    </Box>
  );
};
