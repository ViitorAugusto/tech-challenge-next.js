import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";

import { Avatar } from "../components/ui/avatar";

const meta = {
  title: "Molecules/Avatar",
  component: Avatar,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    name: {
      description: "Name of the person or entity displayed by the avatar.",
      control: "text",
      type: "string",
    },
  },
} satisfies Meta<typeof Avatar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithName: Story = {
  args: {
    name: "Jhon Doe",
  },
};
