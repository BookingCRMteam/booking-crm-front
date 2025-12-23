import { useRef } from 'react';

import {
  Box,
  IconButton,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import Tooltip from '@mui/material/Tooltip';
import { StarIcon, TrashIcon, WarningCircleIcon } from '@phosphor-icons/react';
import { Controller } from 'react-hook-form';

import { FieldProps } from '@/features/create-edit-tour/model/types';

import { TourPhotoForm } from '@/entities/tour';

import { PhotoImage } from './PhotoImage';
import { UploadButton } from './UploadButton';

export const Photos = ({ control, errors, clearErrors }: FieldProps) => {
  const baseId = useRef(Date.now());
  const theme = useTheme();

  const isMd = useMediaQuery(theme.breakpoints.up('md'));
  const isSm = useMediaQuery(theme.breakpoints.between('sm', 'md'));
  const columns = isMd ? 3 : isSm ? 2 : 1;

  const handleAddPhoto = (
    files: File[],
    value: TourPhotoForm[],
    onChange: (value: TourPhotoForm[]) => void,
  ) => {
    const newPhotos = files.map((file, index) => ({
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
    photoIndex: number,
    value: TourPhotoForm[],
    onChange: (val: TourPhotoForm[]) => void,
  ) => {
    const updated = value.filter((_, i) => i !== photoIndex);

    if (!updated.some((photo) => photo.isMain) && updated.length > 0) {
      updated[0].isMain = true;
    }

    onChange(updated);
  };

  const handleSetMainPhoto = (
    photoIndex: number,
    value: TourPhotoForm[],
    onChange: (val: TourPhotoForm[]) => void,
  ) => {
    const updated = value.map((photo, i) => ({
      ...photo,
      isMain: i === photoIndex,
    }));
    onChange(updated);
  };

  const createGridRows = (
    items: (TourPhotoForm | { isUploadButton: true })[],
    columns: number,
  ) => {
    const rows: (TourPhotoForm | { isUploadButton: true })[][] = [];
    for (let i = 0; i < items.length; i += columns) {
      rows.push(items.slice(i, i + columns));
    }
    return rows;
  };

  return (
    <Controller
      name="photos"
      control={control}
      render={({ field: { onChange, value } }) => {
        const photos = value ?? [];
        const items: (TourPhotoForm | { isUploadButton: true })[] =
          photos.length < 10 ? [...photos, { isUploadButton: true }] : photos;

        const rows = createGridRows(items, columns);

        const photoIndexMap = new Map<number, number>();
        photos.forEach((photo, index) => {
          photoIndexMap.set(photo.id, index);
        });

        return (
          <Box
            sx={{
              mb: 3,
              display: 'flex',
              flexDirection: 'column',
              gap: photos.length ? 3 : 0,
            }}
          >
            {rows.map((row, rowIndex) => (
              <Box
                key={rowIndex}
                sx={{
                  display: 'grid',
                  gap: 3,
                  justifyContent: 'center',
                  gridTemplateColumns: `repeat(${row.length}, 200px)`,
                }}
              >
                {row.map((item) => {
                  if ('isUploadButton' in item) {
                    return (
                      <Box
                        key="upload-button"
                        sx={{
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        <UploadButton
                          onAddPhoto={(files) => {
                            handleAddPhoto(files, photos, onChange);
                            clearErrors?.('photos');
                          }}
                        />
                      </Box>
                    );
                  }

                  const photoIndex = photoIndexMap.get(item.id)!;

                  return (
                    <Box
                      key={item.id}
                      sx={{
                        position: 'relative',
                        width: 200,
                        height: 200,
                        borderRadius: '4px',
                        overflow: 'hidden',
                      }}
                    >
                      <PhotoImage photo={item} index={photoIndex} />

                      <Box
                        sx={{
                          position: 'absolute',
                          top: 4,
                          right: 10,
                          display: 'flex',
                          flexDirection: 'column',
                          gap: '4px',
                        }}
                      >
                        <Tooltip
                          title={
                            item.isMain ? 'Головне фото' : 'Зробити головним'
                          }
                        >
                          <IconButton
                            size="small"
                            onClick={() =>
                              handleSetMainPhoto(photoIndex, photos, onChange)
                            }
                            sx={{ padding: 0 }}
                          >
                            <StarIcon
                              size={20}
                              weight={item.isMain ? 'fill' : 'regular'}
                              color={theme.palette.neutral.black}
                            />
                          </IconButton>
                        </Tooltip>

                        <Tooltip title="Видалити фото">
                          <IconButton
                            size="small"
                            onClick={() =>
                              handleRemovePhoto(photoIndex, photos, onChange)
                            }
                            sx={{ padding: 0 }}
                          >
                            <TrashIcon
                              size={20}
                              weight="regular"
                              color={theme.palette.neutral.black}
                            />
                          </IconButton>
                        </Tooltip>
                      </Box>
                    </Box>
                  );
                })}
              </Box>
            ))}

            {errors?.photos && (
              <Typography
                variant="caption"
                color="error"
                sx={{ mt: 1, width: '100%', textAlign: 'center' }}
              >
                {errors.photos.message?.toString()}
              </Typography>
            )}

            {photos.length === 10 && (
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 1,
                }}
              >
                <WarningCircleIcon size={16} color={theme.palette.error.main} />
                <Typography
                  variant="bodySmall"
                  color={theme.palette.error.main}
                >
                  Максимум 10 фото
                </Typography>
              </Box>
            )}
          </Box>
        );
      }}
    />
  );
};
