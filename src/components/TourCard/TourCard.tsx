import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

import Link from 'next/link';

import { APP_ROUTE } from '@/shared/constants/routes';
import { Tour } from '@/shared/types/tour';

interface TourCardProps {
  tour: Tour;
}

const TourCard = ({
  tour: { id, name, description, price, location },
}: TourCardProps) => {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {name}
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary', mb: 1 }}>
          {description}
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.primary' }}>
          Локація: {location}
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.primary' }}>
          Вартість: {price} грн
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          size="small"
          component={Link}
          href={`${APP_ROUTE.BOOKING}/${id}`}
          variant="contained"
          color="primary"
        >
          Забронювати
        </Button>
      </CardActions>
    </Card>
  );
};

export default TourCard;
