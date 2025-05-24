import type { Meta, StoryObj } from "@storybook/react";

import { Input } from "../components/ui/input";

const meta = {
  title: "Atoms/Input",
  component: Input,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    type: {
      description: "Sets the type of the component.",
      control: "select",
      type: 'string',
      options: ['text'],
    },
    disabled: {
      description: "Sets the type of the component.",
      control: "boolean",
      type: 'boolean',
    },
    placeholder: {
      description: "Sets the type of the component.",
      control: "text",
      type: 'string',
    },
  },
  args: {
    placeholder: 'Digite aqui...',
    disabled: false
  },
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Text: Story = {};

export const Disabled: Story = {
  args: {
    disabled: true
  }
};
