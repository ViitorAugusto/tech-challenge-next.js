import { ReactNode } from "react";
import { ClientLayout } from "@/components/layout/ClientLayout";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <div lang="pt-BR">
      <div className="min-h-screen bg-[#e8f0e9]">
        <ClientLayout>{children}</ClientLayout>
      </div>
    </div>
  );
}
