import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";

import { Button } from "../components/ui/button";

const meta = {
  title: "Atoms/Button",
  component: Button,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    onClick: {
      description: "Function called when clicking on the component.",
      table: {
        type: { summary: "() => (value: any)" },
      },
    },
    asChild: {
      control: "boolean",
      description: "Render button as child element (using Radix Slot)",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
      },
    },
    variant: {
      control: { type: "select" },
      options: [
        "default",
        "destructive",
        "outline",
        "secondary",
        "ghost",
        "link",
      ],
      description: "Visual style of the button",
      table: {
        type: {
          summary:
            "'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link'",
        },
        defaultValue: { summary: "default" },
      },
    },
    size: {
      control: { type: "select" },
      options: ["default", "sm", "lg", "icon"],
      description: "Size of the button",
      table: {
        type: { summary: "'default' | 'sm' | 'lg' | 'icon'" },
        defaultValue: { summary: "default" },
      },
    },
    children: {
      control: "text",
      description: "Button content",
      table: {
        type: { summary: "React.ReactNode" },
      },
    },
    disabled: {
      description: "Disables the component, preventing user interaction.",
      type: "boolean",
      control: "boolean",
    },
  },
  args: { onClick: fn(), children: "Description", disabled: false, size: "lg" },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
};

export const Secondary: Story = {
  args: {
    variant: "secondary",
  },
};

export const Ghost: Story = {
  args: {
    variant: "ghost",
  },
};

export const Link: Story = {
  args: {
    variant: "link",
  },
};

export const Outline: Story = {
  args: {
    variant: "outline",
  },
};

export const Destructive: Story = {
  args: {
    variant: "destructive",
  },
};

export const IconSize: Story = {
  args: {
    variant: "default",
    size: "icon",
    children: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="size-4"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
      </svg>
    ),
  },
  render: (args) => <Button {...args} />,
};
