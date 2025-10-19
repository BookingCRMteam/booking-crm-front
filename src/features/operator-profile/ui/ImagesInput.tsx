'use client';

import { useEffect, useState } from 'react';

import Image from 'next/image';

import LocalSeeIcon from '@mui/icons-material/LocalSee';
import {
  Box,
  Button,
  ButtonProps,
  IconButton,
  Tooltip,
  Typography,
  styled,
} from '@mui/material';
import { TrashIcon } from '@phosphor-icons/react';
import { type Control, Controller } from 'react-hook-form';

import type { OperatorProfileSchemaValues } from '../model/schema';

interface ImagesInputProps {
  control: Control<OperatorProfileSchemaValues>;
  initialPreviewUrl?: string;
  onDeleteFlagChange: (value: boolean) => void;
}

const PreviewButton = styled(Button)<ButtonProps>(({ theme }) => ({
  width: 180,
  height: 180,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '32px 0',
  border: `1px dashed ${theme.palette.primary.main}`,
  gap: '12px',
  borderRadius: 0,
  textTransform: 'none',
}));

const ImageWrapper = styled(Box)({
  position: 'relative',
  width: 180,
  height: 180,
  border: '1px solid #ccc',
  borderRadius: 2,
  overflow: 'hidden',
});
export const ImagesInput = ({
  control,
  initialPreviewUrl,
  onDeleteFlagChange,
}: ImagesInputProps) => {
  const [preview, setPreview] = useState<string | null>(
    initialPreviewUrl ?? null,
  );
  const [objectUrl, setObjectUrl] = useState<string | null>(null);

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

  return (
    <Controller
      name="photo"
      control={control}
      render={({ field: { onChange }, fieldState: { error } }) => (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
          {!preview && (
            <PreviewButton variant="outlined" component="label">
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
              <input
                type="file"
                accept=".jpg, .png"
                hidden
                onChange={(e) => {
                  if (!e.target.files?.[0]) return;
                  const file = e.target.files[0];

                  onDeleteFlagChange(false);

                  onChange(file);
                  const url = URL.createObjectURL(file);
                  setObjectUrl(url);
                  setPreview(url);
                }}
              />
            </PreviewButton>
          )}

          {preview && (
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
                      {
                        name: 'offset',
                        options: {
                          offset: [0, -8],
                        },
                      },
                    ],
                  },
                }}
              >
                <IconButton
                  aria-label="delete photo"
                  sx={{
                    position: 'absolute',
                    top: 6,
                    right: 6,
                  }}
                  color="error"
                  onClick={() => {
                    onChange(undefined);
                    onDeleteFlagChange(true);
                    setPreview(null);
                  }}
                >
                  <TrashIcon size={24} weight="fill" />
                </IconButton>
              </Tooltip>
            </ImageWrapper>
          )}

          {error && (
            <Typography
              variant="caption"
              color="error"
              sx={{ display: 'block', mt: 0.5 }}
            >
              {error.message}
            </Typography>
          )}
        </Box>
      )}
    />
  );
};
