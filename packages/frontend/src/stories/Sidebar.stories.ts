import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";

import { Sidebar } from "../components/layout/Sidebar";

const meta = {
  title: "Organisms/Sidebar",
  component: Sidebar,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  args: { onClose: fn() },
} satisfies Meta<typeof Sidebar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
