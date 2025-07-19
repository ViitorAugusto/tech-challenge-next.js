import type { Meta, StoryObj } from "@storybook/react";

import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
  SelectSeparator,
  SelectGroup,
  SelectLabel,
} from "../components/ui/select";

const meta = {
  title: "Molecules/Select",
  component: Select,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    defaultValue: {
      control: "text",
      description: "Default selected value",
      table: {
        type: { summary: "string" },
        defaultValue: { summary: "" },
      },
    },
    disabled: {
      control: "boolean",
      description: "Disables the select",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
      },
    },
    onValueChange: {
      action: "value changed",
      description: "Callback fired when the selected value changes",
      table: {
        type: { summary: "(value: string) => void" },
      },
    },
  },
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  render: () => (
    <Select defaultValue="apple">
      <SelectTrigger aria-label="Frutas">
        <SelectValue placeholder="Selecione uma fruta" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="apple">Maçã</SelectItem>
        <SelectItem value="banana">Banana</SelectItem>
        <SelectItem value="orange">Laranja</SelectItem>
      </SelectContent>
    </Select>
  ),
};

export const WithGroups: Story = {
  render: () => (
    <Select defaultValue="grapefruit">
      <SelectTrigger aria-label="Frutas">
        <SelectValue placeholder="Selecione uma fruta" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Cítricos</SelectLabel>
          <SelectItem value="orange">Laranja</SelectItem>
          <SelectItem value="grapefruit">Toranja</SelectItem>
        </SelectGroup>
        <SelectSeparator />
        <SelectGroup>
          <SelectLabel>Frutas tropicais</SelectLabel>
          <SelectItem value="banana">Banana</SelectItem>
          <SelectItem value="mango">Manga</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  ),
};

export const WithDisabledItem: Story = {
  render: () => (
    <Select defaultValue="apple">
      <SelectTrigger aria-label="Frutas">
        <SelectValue placeholder="Selecione uma fruta" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="apple">Maçã</SelectItem>
        <SelectItem value="banana" disabled>
          Banana (desabilitada)
        </SelectItem>
        <SelectItem value="orange">Laranja</SelectItem>
      </SelectContent>
    </Select>
  ),
};
