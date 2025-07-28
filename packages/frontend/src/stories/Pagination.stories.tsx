import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";

import { Pagination } from "../components/ui/pagination";

const meta: Meta<typeof Pagination> = {
  title: "Organisms/Pagination",
  component: Pagination,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
};

export default meta;

type Story = StoryObj<typeof Pagination>;

export const Default: Story = {
  render: (args) => {
    const [currentPage, setCurrentPage] = useState(args.currentPage ?? 1);

    return (
      <Pagination
        {...args}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
      />
    );
  },
  args: {
    currentPage: 1,
    totalPages: 10,
  },
};
