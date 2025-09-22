import React from 'react';

import CloseIcon from '@mui/icons-material/Close';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import { Box, Button, IconButton, Typography } from '@mui/material';
import Tooltip from '@mui/material/Tooltip';
import { Controller } from 'react-hook-form';
import { v4 as uuidv4 } from 'uuid';

import { FieldProps } from '@/features/create-edit-tour/model/types';

import { TourPhotoFront } from '@/entities/tour/model/types';

import { PhotoImage } from './PhotoImage';
import { TooltipForField } from './TooltipForField';

export const Photos = ({ control, errors }: FieldProps) => {
  const handleAddPhoto = (
    files: FileList,
    value: TourPhotoFront[],
    onChange: (value: TourPhotoFront[]) => void,
  ) => {
    const newPhotos: TourPhotoFront[] = Array.from(files).map(
      (file, index) => ({
        id: uuidv4(),
        file,
        url: undefined,
        isMain: value.length === 0 && index === 0,
      }),
    );

    const updated = [...value, ...newPhotos].slice(0, 10);
    onChange(updated);
  };

  const handleRemovePhoto = (
    index: number,
    value: TourPhotoFront[],
    onChange: (val: TourPhotoFront[]) => void,
  ) => {
    const updated = value.filter((_, i) => i !== index);

    if (!updated.some((photo) => photo.isMain) && updated.length > 0) {
      updated[0].isMain = true;
    }

    onChange(updated);
  };

  const handleSetMainPhoto = (
    index: number,
    value: TourPhotoFront[],
    onChange: (val: TourPhotoFront[]) => void,
  ) => {
    const updated = value.map((photo, i) => ({
      ...photo,
      isMain: i === index,
    }));
    onChange(updated);
  };

  return (
    <Box>
      <Controller
        name="photos"
        control={control}
        render={({ field: { onChange, value } }) => {
          const canUpload = value.length < 10;

          return (
            <Box>
              {canUpload && (
                <Box
                  sx={{ display: 'flex', flexDirection: 'row', gap: 2, mb: 2 }}
                >
                  <Button
                    variant="outlined"
                    component="label"
                    sx={{
                      width: 246,
                      height: 72,
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                  >
                    Завантажити фото
                    <input
                      type="file"
                      accept="image/jpeg,image/png"
                      hidden
                      multiple
                      onChange={(e) => {
                        if (!e.target.files) return;
                        handleAddPhoto(e.target.files, value, onChange);
                        e.target.value = '';
                      }}
                    />
                  </Button>

                  <TooltipForField
                    text={`Формат фото JPG або PNG.\nМаксимум 10 фото, кожне не більше 5МБ.`}
                  />
                </Box>
              )}

              {value.length > 0 && (
                <Box
                  sx={{
                    display: 'grid',
                    gap: 1,
                    gridTemplateColumns: 'repeat(5, 1fr)',
                    maxWidth: '100%',
                    justifyContent: 'start',
                  }}
                >
                  {value.map((photo, index) => (
                    <Box
                      key={photo.id}
                      sx={{
                        position: 'relative',
                        width: '100%',
                        maxWidth: 150,
                        paddingTop: '100%',
                        border: '1px solid #ccc',
                        borderRadius: 2,
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
                          borderRadius: 1,
                          padding: '2px',
                        }}
                      >
                        <Tooltip
                          title={
                            value[index].isMain
                              ? 'Головне фото'
                              : 'Зробити головним'
                          }
                        >
                          <IconButton
                            size="small"
                            onClick={() =>
                              handleSetMainPhoto(index, value, onChange)
                            }
                          >
                            {value[index].isMain ? (
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
                              handleRemovePhoto(index, value, onChange)
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

              {errors?.photos && (
                <Typography variant="caption" color="error">
                  {errors.photos.message?.toString()}
                </Typography>
              )}
            </Box>
          );
        }}
      />
    </Box>
  );
};
