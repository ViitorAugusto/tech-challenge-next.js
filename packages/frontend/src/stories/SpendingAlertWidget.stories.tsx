import type { Meta, StoryObj } from "@storybook/react";

import { SpendingAlertWidget } from "../components/dashboard/widgets/SpendingAlertWidget";
import { SpendingAlertConfig } from "../components/dashboard/widgets/widgetUtils";

const meta: Meta<typeof SpendingAlertWidget> = {
  title: "Widgets/SpendingAlertWidget",
  component: SpendingAlertWidget,
  parameters: {
    layout: "centered",
  },
};

export default meta;
type Story = StoryObj<typeof SpendingAlertWidget>;

const mockConfig: SpendingAlertConfig = {
  title: "Limite Mensal",
  limit: 2000,
  category: "Alimentação",
};

export const Default: Story = {
  args: {
    id: "alert-1",
    config: mockConfig,
    currentSpending: 800,
    isCustomizing: false,
    onUpdate: (updatedConfig: any) => console.log("Atualizado:", updatedConfig),
    onRemove: () => console.log("Removido"),
  },
};

export const NearLimit: Story = {
  args: {
    ...Default.args,
    currentSpending: 1800,
  },
};

export const OverLimit: Story = {
  args: {
    ...Default.args,
    currentSpending: 2500,
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
      <SpendingAlertWidget
        {...args}
        isCustomizing={true}
        onUpdate={(updated: any) => console.log("Salvo:", updated)}
        onRemove={() => console.log("Removido")}
      />
    );
  },
  args: {
    ...Default.args,
    currentSpending: 1000,
  },
};
