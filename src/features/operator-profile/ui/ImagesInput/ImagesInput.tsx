'use client';

import { useEffect, useId, useState } from 'react';

import Image from 'next/image';

import LocalSeeIcon from '@mui/icons-material/LocalSee';
import {
  Box,
  IconButton,
  InputLabel,
  Tooltip,
  Typography,
  styled,
} from '@mui/material';
import { XIcon } from '@phosphor-icons/react';
import { type Control, Controller, FieldPathValue } from 'react-hook-form';

import type { OperatorProfileSchemaValues } from '../../model/schema';

interface ImagesInputProps {
  control: Control<OperatorProfileSchemaValues>;
  initialPreviewUrl?: string;
  onDeleteFlagChange: (value: boolean) => void;
}

type PhotoFieldValue = FieldPathValue<OperatorProfileSchemaValues, 'photo'>;

type ControllerOnChange = (value: PhotoFieldValue) => void;

const PreviewButton = styled(InputLabel)(({ theme }) => ({
  width: 206,
  height: 165,
  marginTop: '10px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '32px 0',
  border: `1px dashed ${theme.palette.primary.main}`,
  gap: '12px',
  borderRadius: 0,
  textTransform: 'none',
  cursor: 'pointer',
}));

const ImageWrapper = styled(Box)({
  position: 'relative',
  width: 180,
  height: 180,
  borderRadius: '4px',
  overflow: 'hidden',
});

const DeletePhotoButton = styled(IconButton)(({ theme }) => ({
  position: 'absolute',
  top: '8px',
  right: '8px',
  padding: 0,
  backgroundColor: theme.palette.neutral.white,
  '&:hover': {
    backgroundColor: theme.palette.secondary.main,
  },
  '&:focus-visible': {
    backgroundColor: theme.palette.primary.light,
  },
  '&:active': {
    backgroundColor: theme.palette.pressed.main,
  },
}));

const ChangePhotoButtonLabel = styled(InputLabel)(({ theme }) => ({
  marginTop: '5px',
  cursor: 'pointer',
  color: theme.palette.primary.main,
  ...theme.typography.bodySmall,
  '&:hover': {
    color: theme.palette.primary.light,
  },
  '&:focus-visible': {
    color: theme.palette.focused.main,
  },
  '&:active': {
    color: theme.palette.pressed.main,
  },
}));

export const ImagesInput = ({
  control,
  initialPreviewUrl,
  onDeleteFlagChange,
}: ImagesInputProps) => {
  const [preview, setPreview] = useState<string | null>(
    initialPreviewUrl ?? null,
  );
  const [objectUrl, setObjectUrl] = useState<string | null>(null);
  const fileInputId = useId();

  useEffect(() => {
    setPreview(initialPreviewUrl ?? null);
  }, [initialPreviewUrl]);

  useEffect(() => {
    return () => {
      if (objectUrl) {
        URL.revokeObjectURL(objectUrl);
      }
    };
  }, [objectUrl]);

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    onChange: ControllerOnChange,
  ) => {
    if (!e.target.files?.[0]) return;
    const file = e.target.files[0];

    onDeleteFlagChange(false);
    onChange(file);

    if (objectUrl) {
      URL.revokeObjectURL(objectUrl);
    }

    const url = URL.createObjectURL(file);
    setObjectUrl(url);
    setPreview(url);

    e.target.value = '';
  };

  const HiddenFileInput = ({ onChange }: { onChange: ControllerOnChange }) => (
    <input
      type="file"
      id={fileInputId}
      accept=".jpg, .png"
      hidden
      data-testid="file-input"
      onChange={(e) => handleFileChange(e, onChange)}
    />
  );

  return (
    <Controller
      name="photo"
      control={control}
      render={({ field: { onChange }, fieldState: { error } }) => (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
          {!preview && (
            <PreviewButton htmlFor={fileInputId}>
              <LocalSeeIcon sx={{ fontSize: '40px' }} color="action" />
              <Typography variant="bodyDefault" component="p" color="primary">
                Завантажити фото
              </Typography>
              <Typography
                variant="labelCaption"
                component="p"
                color="textPrimary"
              >
                JPG/PNG, до 5 МБ
              </Typography>
              <HiddenFileInput onChange={onChange} />
            </PreviewButton>
          )}

          {preview && (
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <ImageWrapper>
                <Image
                  src={preview}
                  alt="preview"
                  priority
                  width={180}
                  height={180}
                  style={{ objectFit: 'cover', width: '100%' }}
                />

                <Tooltip
                  title="Видалити фото"
                  arrow
                  slotProps={{
                    popper: {
                      modifiers: [
                        { name: 'offset', options: { offset: [0, -8] } },
                      ],
                    },
                  }}
                >
                  <DeletePhotoButton
                    aria-label="delete photo"
                    onClick={() => {
                      onChange(undefined);
                      onDeleteFlagChange(true);
                      setPreview(null);
                      if (objectUrl) URL.revokeObjectURL(objectUrl);
                      setObjectUrl(null);
                    }}
                  >
                    <XIcon size={20} color="#000500" />
                  </DeletePhotoButton>
                </Tooltip>
              </ImageWrapper>
              {error && (
                <Typography
                  variant="labelCaption"
                  color="error"
                  sx={{ display: 'block', mt: 0.5 }}
                >
                  {error.message}
                </Typography>
              )}
              <ChangePhotoButtonLabel htmlFor={fileInputId}>
                Змінити фото
              </ChangePhotoButtonLabel>

              <HiddenFileInput onChange={onChange} />
            </Box>
          )}
        </Box>
      )}
    />
  );
};
