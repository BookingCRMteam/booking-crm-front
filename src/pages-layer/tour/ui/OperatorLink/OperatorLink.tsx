import type { FC } from 'react';

import Image from 'next/image';
import Link from 'next/link';

import {
  Box,
  LinkProps,
  Link as MuiLink,
  Typography,
  styled,
} from '@mui/material';

const StyledLink = styled(MuiLink)<LinkProps>(({ theme }) => ({
  borderTop: `1px solid ${theme.palette.gray[200]}`,
  padding: '7px 8px 8px 8px',
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  color: theme.palette.text.primary,

  '&:hover': {
    color: theme.palette.info.main,
  },
  '&:active': {
    color: '#1789a3',
  },
  '&:focus-visible': {
    color: theme.palette.info.main,
    textDecoration: 'underline',
    outline: 'none',
  },
}));

const ImageWrapper = styled(Box)(() => ({
  width: 36,
  height: 36,
  borderRadius: '4px',
  overflow: 'hidden',
  flexShrink: 0,
}));

const TextContainer = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  gap: '4px',
});

export interface OperatorLinkProps {
  id: number;
  name: string;
  photo: string | null;
}

export const OperatorLink: FC<OperatorLinkProps> = ({ id, name, photo }) => {
  const operatorHref = `/catalog/operator/${id}`;
  const operatorPhotoSrc = photo || '/images/tourCard/operator.png';

  return (
    <StyledLink component={Link} underline="none" href={operatorHref}>
      <ImageWrapper>
        <Image
          width={36}
          height={36}
          src={operatorPhotoSrc}
          alt={name}
          style={{ objectFit: 'cover' }}
        />
      </ImageWrapper>

      <TextContainer>
        <Typography variant="bodyDefault" component="p">
          Туроператор:
        </Typography>
        <Typography variant="bodySmall" component="p">
          {name}
        </Typography>
      </TextContainer>
    </StyledLink>
  );
};
