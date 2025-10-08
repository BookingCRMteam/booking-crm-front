import type { FC } from 'react';

import { Typography } from '@mui/material';

export type TourDescriptionProps = {
  description: string;
};

const TourDescription: FC<TourDescriptionProps> = ({ description }) => {
  return (
    <Typography variant="bodyDefault" component="p">
      {description}
    </Typography>
  );
};

export default TourDescription;
