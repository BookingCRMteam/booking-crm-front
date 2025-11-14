'use client';

import { Checkbox, type CheckboxProps, styled } from '@mui/material';
import { CheckIcon } from '@phosphor-icons/react';

const CustomIcon = styled('span')(({ theme }) => ({
  width: 12,
  height: 12,
  borderRadius: 3,
  border: `1px solid ${theme.palette.gray[900]}`,
  backgroundColor: 'transparent',
}));

const CustomCheckedIcon = styled(CustomIcon)(({ theme }) => ({
  backgroundColor: theme.palette.common.white,

  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',

  '& svg': {
    color: theme.palette.gray[900],
    width: 12,
    height: 12,
  },
}));

function CustomCheckbox(props: CheckboxProps) {
  return (
    <Checkbox
      disableRipple
      color="default"
      icon={<CustomIcon />}
      checkedIcon={
        <CustomCheckedIcon>
          <CheckIcon weight="bold" />
        </CustomCheckedIcon>
      }
      {...props}
    />
  );
}

export const CheckboxSmall = styled(CustomCheckbox)(({ theme }) => ({
  color: theme.palette.gray[900],
  padding: '2px',

  '&:hover, &:focus-visible, &:active': {
    background: 'transparent',
  },
}));
