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
    onClick: { description: "Function called when clicking on the component." },
    asChild: { description: "Renders the component as a custom direct child." },
    variant: {
      description: "Sets the visual style of the component.",
      control: "select",
      type: "string",
      options: [
        "default",
        "ghost",
        "secondary",
        "link",
        "outline",
        "destructive",
      ],
    },
    size: {
      description: "Sets the size of the component.",
      control: "select",
      type: "string",
      options: ["default", "sm", "lg", "icon"],
    },
    children: {
      description: "Internal content of the component.",
      type: "string",
    },
  },
  args: { onClick: fn(), children: "Description" },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Secondary: Story = {
  args: {
    variant: "secondary",
    size: "lg",
  },
};

export const Ghost: Story = {
  args: {
    variant: "ghost",
    size: "lg",
  },
};

export const Link: Story = {
  args: {
    variant: "link",
    size: "lg",
  },
};

export const Outline: Story = {
  args: {
    variant: "outline",
    size: "lg",
  },
};

export const Destructive: Story = {
  args: {
    variant: "destructive",
    size: "lg",
  },
};
