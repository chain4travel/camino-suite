import type { Meta, StoryObj } from '@storybook/react';
import { WalletSection } from './WalletSection';

const meta: Meta<typeof WalletSection> = {
  component: WalletSection,
  title: 'WalletSection',
};
export default meta;
type Story = StoryObj<typeof WalletSection>;

export const Primary = {
  args: {},
};
