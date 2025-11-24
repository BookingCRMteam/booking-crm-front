import Image from 'next/image';
import Link from 'next/link';

import { Box, Button, CircularProgress, Typography } from '@mui/material';

import {
  fetchToursByOperator,
  useInfiniteToursCollection,
} from '@/entities/tour';

import { APP_ROUTE } from '@/shared/constants';
import { ErrorLoading, ToursCollection } from '@/shared/ui';

import { OperatorMyToursEmpty } from '../OperatorMyToursEmpty/OperatorMyToursEmpty';

type OperatorMyToursProps = {
  operatorId: number;
};

export const OperatorMyTours = ({ operatorId }: OperatorMyToursProps) => {
  const props = useInfiniteToursCollection({
    queryKey: ['tours', 'operator', operatorId, 'my'],
    queryFn: ({ limit, offset }) =>
      fetchToursByOperator({ operatorId, limit, offset }),
  });

  const hasTours =
    props.data?.pages?.some((page) => page.data.length > 0) ?? false;

  if (!hasTours || props.error || !props.data) {
    return (
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
        }}
      >
        {!props.data && !props.error && <CircularProgress size={46} />}
        {props.error && <ErrorLoading />}
        {props.data && !hasTours && <OperatorMyToursEmpty />}
      </Box>
    );
  }

  const totalTours = props.data.pages.reduce(
    (acc, page) => acc + page.data.length,
    0,
  );
  const isOnlyOneTour = totalTours === 1;

  return (
    <Box
      sx={{
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        pt: 5,
        pb: '70px',
      }}
    >
      <Typography variant="h1" sx={{ mb: '116px' }}>
        Список турів
      </Typography>

      <Box
        sx={{
          position: 'absolute',
          top: isOnlyOneTour ? '118px' : '20px',
          right: 0,
        }}
      >
        <Link href={APP_ROUTE.OPERATOR_TOURS_CREATE}>
          <Button color="primary" variant="contained">
            <Image
              src="/icons/plus.svg"
              alt="Іконка додати"
              width={20}
              height={20}
            />
            <Typography sx={{ ml: '4px' }}>Додати тур</Typography>
          </Button>
        </Link>
      </Box>

      <ToursCollection {...props} variantTourCard="operator-tour" />
    </Box>
  );
};
