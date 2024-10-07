import type { Meta, StoryObj } from '@storybook/react';
import { CamBtn } from './CamBtn';

const meta: Meta<typeof CamBtn> = {
  component: CamBtn,
  title: 'components/CamBtn',
  tags: ['autodocs'],
  argTypes: {
    children: {
      control: {
        type: 'text',
      },
    },
    onClick: { action: 'clicked' },
  },
};
export default meta;
type Story = StoryObj<typeof CamBtn>;

export const Primary = {
  args: {
    variant: 'primary',
    size: 'md',
    children: 'button',
  },
  decorators: [
    //@ts-ignore
    (Story) => (
      <div className="flex items-center justify-center w-full">
        {/* 👇 Decorators in Storybook also accept a function. Replace <Story/> with Story() to enable it  */}
        <Story />
      </div>
    ),
  ],
};
