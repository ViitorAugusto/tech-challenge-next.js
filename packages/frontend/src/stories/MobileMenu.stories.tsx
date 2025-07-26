import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import { INITIAL_VIEWPORTS } from "@storybook/addon-viewport";

import { MobileMenu } from "../components/layout/MobileMenu";

const meta = {
  title: "Molecules/MobileMenu",
  component: MobileMenu,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    onClose: {
      description: "Function called when the component requests to be closed.",
    },
  },
  args: { onClose: fn() },
} satisfies Meta<typeof MobileMenu>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  parameters: {
    viewport: {
      viewports: INITIAL_VIEWPORTS,
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
