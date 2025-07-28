import type { Meta, StoryObj } from "@storybook/react";

import { SavingsGoalWidget } from "../components/dashboard/widgets/SavingsGoalWidget";
import { SavingsGoalConfig } from "../components/dashboard/widgets/widgetUtils";

const meta: Meta<typeof SavingsGoalWidget> = {
  title: "Widgets/SavingsGoalWidget",
  component: SavingsGoalWidget,
  parameters: {
    layout: "centered",
  },
};

export default meta;

type Story = StoryObj<typeof SavingsGoalWidget>;

const mockConfig: SavingsGoalConfig = {
  title: "Viagem para Europa",
  target: 5000,
  description: "Economia para viagem dos sonhos",
};

export const Default: Story = {
  args: {
    id: "goal-1",
    config: mockConfig,
    currentAmount: 2000,
    isCustomizing: false,
    onUpdate: (updatedConfig: any) => {
      console.log("Atualizado:", updatedConfig);
    },
    onRemove: () => {
      console.log("Removido");
    },
  },
};

export const Customizing: Story = {
  args: {
    ...Default.args,
    isCustomizing: true,
  },
};

export const Editing: Story = {
  render: (args: any) => {
    return (
      <SavingsGoalWidget
        {...args}
        isCustomizing={true}
        onUpdate={(config: any) => console.log("Salvo:", config)}
        onRemove={() => console.log("Removido")}
      />
    );
  },
  args: {
    ...Default.args,
    isCustomizing: true,
  },
};

export const GoalReached: Story = {
  args: {
    ...Default.args,
    currentAmount: 5000,
  },
};

export const AlmostThere: Story = {
  args: {
    ...Default.args,
    currentAmount: 4000,
  },
};
