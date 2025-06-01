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
      control: { type: "select" },
      options: ["text", "email", "password", "number", "search", "tel", "url"],
      description: "HTML input type",
      table: {
        type: { summary: "string" },
        defaultValue: { summary: "text" },
      },
    },
    placeholder: {
      control: "text",
      description: "Placeholder text",
      table: {
        type: { summary: "string" },
      },
    },
    disabled: {
      control: "boolean",
      description: "Disables the input",
      type: "string",
    },
    value: {
      control: "text",
      description: "Input value",
      table: {
        type: { summary: "string" },
      },
    },
    onChange: {
      action: "changed",
      description: "Callback on input change",
      table: {
        type: {
          summary: "(event: React.ChangeEvent<HTMLInputElement>) => void",
        },
      },
    },
  },
  args: {
    placeholder: "Type something...",
    disabled: false,
  },
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    type: "text",
  },
  render: (args) => <Input {...args} />,
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
};
