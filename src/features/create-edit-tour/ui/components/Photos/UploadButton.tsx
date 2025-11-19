import Image from 'next/image';

import { Box, Typography } from '@mui/material';

type UploadButtonProps = {
  onAddPhoto: (files: FileList) => void;
};

export const UploadButton = ({ onAddPhoto }: UploadButtonProps) => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <Box
        component="label"
        sx={{
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
          '&:hover': {
            backgroundColor: '#EDFFFD',
          },
        }}
      >
        <Image
          src="/icons/mdi_camera.svg"
          alt="Іконка камери"
          width={40}
          height={40}
        />

        <Typography
          variant="bodyDefault"
          sx={(theme) => ({
            color: theme.palette.primaryExtended[800],
          })}
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
            onAddPhoto(e.target.files);
            e.target.value = '';
          }}
        />
      </Box>
    </Box>
  );
};
