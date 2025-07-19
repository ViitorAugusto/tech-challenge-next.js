import type { Meta, StoryObj } from "@storybook/react";

import { Header } from "../components/layout/Header";

const meta = {
  title: "Organisms/Header",
  component: Header,
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
  args: {
    name: "Jhon Doe",
  },
} satisfies Meta<typeof Header>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  decorators: [
    (Story) => (
      <div className="flex justify-center items-start h-screen p-4 bg-gray-100">
        <div className="w-[1024px]">
          <Story />
        </div>
      </div>
    ),
  ],
};

export const MobileView: Story = {
  parameters: {
    viewport: {
      defaultViewport: "iphone14",
    },
  },
  decorators: [
    (Story) => (
      <>
        <style>{`
          @media (min-width: 768px) {
            .md\\:hidden {
              display: block !important;
            }
          }
          .hidden {
            display: none !important;
          }
        `}</style>
        <div className="flex justify-center items-start h-screen p-4 bg-gray-100">
          <div className="w-[375px]">
            <Story />
          </div>
        </div>
      </>
    ),
  ],
};
