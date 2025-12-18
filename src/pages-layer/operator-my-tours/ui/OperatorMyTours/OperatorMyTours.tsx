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

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        paddingTop: 5,
        paddingBottom: 8.75,
      }}
    >
      <Typography variant="h1" sx={{ mb: 5 }}>
        Список турів
      </Typography>

      <Box alignSelf={'end'} sx={{ mb: 5 }}>
        <Button
          component={Link}
          href={APP_ROUTE.OPERATOR_TOURS_CREATE}
          color="primary"
          variant="contained"
        >
          <Image
            src="/icons/plus.svg"
            alt="Іконка додати"
            width={20}
            height={20}
          />
          <Typography sx={{ ml: '4px' }}>Додати тур</Typography>
        </Button>
      </Box>

      <ToursCollection {...props} variantTourCard="operator-tour" />
    </Box>
  );
};
