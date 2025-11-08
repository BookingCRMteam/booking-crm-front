import { Box, Typography } from '@mui/material';

import {
  Tours,
  fetchToursByOperator,
  useInfiniteToursCollection,
} from '@/entities/tour';

import { ToursCollection } from '@/shared/ui';

import { OperatorToursEmpty } from '../OperatorToursEmpty/OperatorToursEmpty';

type OperatorToursProps = {
  initialData: Tours;
  operatorId: number;
};

export const OperatorTours = ({
  initialData,
  operatorId,
}: OperatorToursProps) => {
  const props = useInfiniteToursCollection({
    initialData,
    queryKey: ['tours', 'operator', operatorId],
    queryFn: ({ limit, offset }) =>
      fetchToursByOperator({ operatorId, limit, offset }),
  });

  const hasTours =
    Boolean(props.data?.pages?.some((page) => page.data?.length)) &&
    !props.error;

  return (
    <Box>
      <Typography variant="h3" sx={{ textAlign: 'center' }}>
        {hasTours
          ? `Актуальні подорожі (${initialData.meta.total})`
          : 'Актуальні подорожі'}
      </Typography>

      {hasTours ? (
        <Box sx={{ paddingTop: 5, paddingBottom: '20px' }}>
          <ToursCollection {...props} />
        </Box>
      ) : (
        <OperatorToursEmpty />
      )}
    </Box>
  );
};
