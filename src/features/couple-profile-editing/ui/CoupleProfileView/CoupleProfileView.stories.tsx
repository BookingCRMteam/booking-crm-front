import { Box } from '@mui/material';
import type { Meta, StoryObj } from '@storybook/nextjs';

import { StorybookProviderWrapper } from '@/shared/tests/StorybookProviderWrapper';

import { CoupleProfileView } from './CoupleProfileView';

const mockUser = {
  firstPersonName: 'Олена',
  firstPersonSurname: 'Петренко',
  secondPersonName: 'Тимофій',
  secondPersonSurname: 'Петренко',
  phone: '097 123 45 67',
  email: 'forexample@gmail.com',
};

const mockUserOnlyEmail = {
  firstPersonName: '',
  firstPersonSurname: '',
  secondPersonName: '',
  secondPersonSurname: '',
  phone: '',
  email: 'forexample@gmail.com',
};

const mockUserNoData = {
  firstPersonName: '',
  firstPersonSurname: '',
  secondPersonName: '',
  secondPersonSurname: '',
  phone: '',
  email: '',
};

const meta: Meta<typeof CoupleProfileView> = {
  title: 'Pages/CoupleProfile/CoupleProfileView',
  component: CoupleProfileView,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Компонент для відображення профілю пари. Показує інформацію про двох користувачів, їх контактні дані та кнопку для редагування профілю.',
      },
    },
  },
};
export default meta;

type Story = StoryObj<typeof CoupleProfileView>;

export const FullProfile: Story = {
  name: 'Повний профіль користувача',
  decorators: [
    (Story) => (
      <StorybookProviderWrapper
        token={null}
        setQueryMocks={(qc) => qc.setQueryData(['user', 'me'], mockUser)}
      >
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
          <Story />
        </Box>
      </StorybookProviderWrapper>
    ),
  ],
  parameters: {
    docs: {
      description: {
        story:
          'Профіль містить усю необхідну інформацію — імена, прізвища, телефон та email.',
      },
    },
  },
};

export const NoProfile: Story = {
  name: 'Профіль не знайдено',
  decorators: [
    (Story) => (
      <StorybookProviderWrapper
        token={null}
        setQueryMocks={(qc) => qc.setQueryData(['user', 'me'], null)}
      >
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
          <Story />
        </Box>
      </StorybookProviderWrapper>
    ),
  ],
  parameters: {
    docs: {
      description: {
        story:
          'Кейс, коли користувача не знайдено. Компонент показує повідомлення "Профіль не знайдено".',
      },
    },
  },
};

export const EmptyProfile: Story = {
  name: 'Профіль без заповнених даних',
  decorators: [
    (Story) => (
      <StorybookProviderWrapper
        token={null}
        setQueryMocks={(qc) => qc.setQueryData(['user', 'me'], mockUserNoData)}
      >
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
          <Story />
        </Box>
      </StorybookProviderWrapper>
    ),
  ],
  parameters: {
    docs: {
      description: {
        story:
          'Профіль існує, але в ньому немає жодної інформації. Компонент пропонує користувачу заповнити дані.',
      },
    },
  },
};

export const EmailOnlyProfile: Story = {
  name: 'Профіль лише з email',
  decorators: [
    (Story) => (
      <StorybookProviderWrapper
        token={null}
        setQueryMocks={(qc) =>
          qc.setQueryData(['user', 'me'], mockUserOnlyEmail)
        }
      >
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
          <Story />
        </Box>
      </StorybookProviderWrapper>
    ),
  ],
  parameters: {
    docs: {
      description: {
        story:
          'У профілі заповнено лише email. Компонент показує повідомлення про неповні дані.',
      },
    },
  },
};
