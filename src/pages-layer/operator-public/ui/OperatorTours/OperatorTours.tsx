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

const collectionWrapper = {
  paddingTop: 5,
  paddingBottom: '20px',
  display: 'flex',
  justifyContent: 'center',
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
    props.data?.pages?.some((page) => page.data?.length) ?? false;
  const hasError = Boolean(props.error);

  const showEmptyFallback = !hasTours && hasError;

  return (
    <Box>
      <Typography variant="h3" sx={{ textAlign: 'center' }}>
        {hasTours
          ? `Актуальні подорожі (${initialData.meta.total})`
          : 'Актуальні подорожі'}
      </Typography>

      {showEmptyFallback ? (
        <OperatorToursEmpty />
      ) : hasTours ? (
        <Box sx={collectionWrapper}>
          <ToursCollection {...props} />
        </Box>
      ) : (
        !props.isFetchingNextPage && <OperatorToursEmpty />
      )}
    </Box>
  );
};
