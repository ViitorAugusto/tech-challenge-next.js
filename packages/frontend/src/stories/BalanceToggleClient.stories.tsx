import type { Meta, StoryObj } from "@storybook/react";
import { BalanceToggleClient } from "../components/ui/BalanceToggleClient";

const meta: Meta<typeof BalanceToggleClient> = {
  title: "Molecules/BalanceToggleClient",
  component: BalanceToggleClient,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof BalanceToggleClient>;

export const Default: Story = {
  args: {
    saldo: "R$ 1.234,56",
    initialShowBalance: false,
  },
};

export const BalanceVisible: Story = {
  args: {
    saldo: "R$ 1.234,56",
    initialShowBalance: true,
  },
};
