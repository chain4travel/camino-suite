import type { Meta, StoryObj } from '@storybook/react';
import { Navbar } from '.';

const meta: Meta<typeof Navbar> = {
  component: Navbar,
  title: 'Navbar',
};
export default meta;
type Story = StoryObj<typeof Navbar>;

export const Primary = {
  args: {},
};
