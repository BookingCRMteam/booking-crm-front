import { useRef } from 'react';

import CloseIcon from '@mui/icons-material/Close';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import { Box, IconButton, Typography } from '@mui/material';
import Tooltip from '@mui/material/Tooltip';
import { Controller } from 'react-hook-form';

import { FieldProps } from '@/features/create-edit-tour/model/types';

import { TourPhotoForm } from '@/entities/tour';

import { PhotoImage } from './PhotoImage';
import { UploadButton } from './UploadButton';

export const Photos = ({ control, errors }: FieldProps) => {
  const baseId = useRef(Date.now());

  const handleAddPhoto = (
    files: FileList,
    value: TourPhotoForm[],
    onChange: (value: TourPhotoForm[]) => void,
  ) => {
    const newPhotos = Array.from(files).map((file, index) => ({
      id: baseId.current++,
      file,
      url: null,
      isMain: value.length === 0 && index === 0,
      description: '',
    }));

    const updated = [...value, ...newPhotos].slice(0, 10);
    onChange(updated);
  };

  const handleRemovePhoto = (
    index: number,
    value: TourPhotoForm[],
    onChange: (val: TourPhotoForm[]) => void,
  ) => {
    const updated = value.filter((_, i) => i !== index);

    if (!updated.some((photo) => photo.isMain) && updated.length > 0) {
      updated[0].isMain = true;
    }

    onChange(updated);
  };

  const handleSetMainPhoto = (
    index: number,
    value: TourPhotoForm[],
    onChange: (val: TourPhotoForm[]) => void,
  ) => {
    const updated = value.map((photo, i) => ({
      ...photo,
      isMain: i === index,
    }));
    onChange(updated);
  };

  return (
    <Controller
      name="photos"
      control={control}
      render={({ field: { onChange, value } }) => {
        const photos = value ?? [];
        const canUpload = photos.length < 10;

        return (
          <Box sx={{ pt: '5px', pb: 4 }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
              {canUpload && (
                <UploadButton
                  onAddPhoto={(files) =>
                    handleAddPhoto(files, photos, onChange)
                  }
                />
              )}

              {photos.length > 0 && (
                <Box
                  sx={{
                    display: 'grid',
                    gap: 1,
                    gridTemplateColumns: 'repeat(5, 1fr)',
                    maxWidth: '100%',
                    justifyContent: 'start',
                  }}
                >
                  {photos.map((photo, index) => (
                    <Box
                      key={photo.id}
                      sx={{
                        position: 'relative',
                        width: '100%',
                        maxWidth: 150,
                        paddingTop: '100%',
                        border: '1px solid #ccc',
                        borderRadius: '4px',
                        overflow: 'hidden',
                      }}
                    >
                      <PhotoImage photo={photo} index={index} />

                      <Box
                        sx={{
                          position: 'absolute',
                          top: 2,
                          right: 2,
                          display: 'flex',
                          gap: 1,
                          backgroundColor: 'rgba(255,255,255,0.7)',
                          borderRadius: '4px',
                          padding: '2px',
                        }}
                      >
                        <Tooltip
                          title={
                            photo.isMain ? 'Головне фото' : 'Зробити головним'
                          }
                        >
                          <IconButton
                            size="small"
                            onClick={() =>
                              handleSetMainPhoto(index, photos, onChange)
                            }
                          >
                            {photo.isMain ? (
                              <StarIcon fontSize="small" />
                            ) : (
                              <StarBorderIcon fontSize="small" />
                            )}
                          </IconButton>
                        </Tooltip>

                        <Tooltip title="Видалити фото">
                          <IconButton
                            size="small"
                            onClick={() =>
                              handleRemovePhoto(index, photos, onChange)
                            }
                          >
                            <CloseIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>
                      </Box>
                    </Box>
                  ))}
                </Box>
              )}
            </Box>

            {errors?.photos && (
              <Typography
                variant="caption"
                color="error"
                sx={{ display: 'flex', justifyContent: 'center' }}
              >
                {errors.photos.message?.toString()}
              </Typography>
            )}
          </Box>
        );
      }}
    />
  );
};
