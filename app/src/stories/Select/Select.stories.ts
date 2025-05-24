import type { Meta, StoryObj } from "@storybook/react";

import { Select } from "./select";

const mockedList = [
  { label: "Item I", value: "Item I" },
  { label: "Item II", value: "Item II" },
  { label: "Item III", value: "Item III" },
];

const meta = {
  title: "Molecules/Select",
  component: Select,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    itemList: {},
    placeholder: {},
    hasSeparator: {},
    disabled: {
      description: "",
      control: "boolean",
      type: "boolean",
    },
  },
  args: { itemList: mockedList, placeholder: "Selecione o item" },
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
};

export const WithSeparator: Story = {
  args: {
    hasSeparator: true,
  },
};
