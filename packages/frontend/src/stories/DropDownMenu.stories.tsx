import React from "react";
import { Meta, StoryObj } from "@storybook/react";

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "../components/ui/dropdown-menu";

const meta: Meta<typeof DropdownMenu> = {
  title: "Molecules/DropdownMenu",
  component: DropdownMenu,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof DropdownMenu>;

export default meta;
type Story = StoryObj<typeof DropdownMenu>;

export const Default: Story = {
  render: () => (
    <DropdownMenu>
      <DropdownMenuTrigger className="inline-flex justify-center rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 focus:outline-none">
        Abrir menu
      </DropdownMenuTrigger>
      <DropdownMenuContent sideOffset={5} className="w-48">
        <DropdownMenuItem onSelect={() => alert("Item 1 selecionado")}>
          Item 1
        </DropdownMenuItem>
        <DropdownMenuItem onSelect={() => alert("Item 2 selecionado")}>
          Item 2
        </DropdownMenuItem>
        <DropdownMenuItem onSelect={() => alert("Item 3 selecionado")}>
          Item 3
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  ),
};

export const WithDisabledItem: Story = {
  render: () => (
    <DropdownMenu>
      <DropdownMenuTrigger className="inline-flex justify-center rounded-md bg-green-600 px-4 py-2 text-white hover:bg-green-700 focus:outline-none">
        Menu com item desabilitado
      </DropdownMenuTrigger>
      <DropdownMenuContent sideOffset={5} className="w-48">
        <DropdownMenuItem onSelect={() => alert("Item ativo")}>
          Item ativo
        </DropdownMenuItem>
        <DropdownMenuItem disabled>Item desabilitado</DropdownMenuItem>
        <DropdownMenuItem onSelect={() => alert("Outro item ativo")}>
          Outro item ativo
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  ),
};
