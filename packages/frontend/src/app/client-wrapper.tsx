"use client";

import { useState, ReactNode } from "react";
import { MobileMenu } from "@/components/layout/MobileMenu";
import { Header } from "@/components/layout/Header";
import { Sidebar } from "@/components/layout/Sidebar";
import { Tabs } from "@/components/ui/tabs";
import ReactQueryProvider from "@/context/ReactQueryProvider";

export function ClientBankingWrapper() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      {menuOpen && <MobileMenu onClose={() => setMenuOpen(false)} />}

      <button
        onClick={() => setMenuOpen(!menuOpen)}
        className="absolute top-4 left-4 md:hidden z-10"
      >
        <div className="w-6 h-0.5 bg-green-500 mb-1.5" />
        <div className="w-6 h-0.5 bg-green-500 mb-1.5" />
        <div className="w-6 h-0.5 bg-green-500" />
      </button>
    </>
  );
}

export function ClientWrapper({ children }: { children: ReactNode }) {
  return (
    <ReactQueryProvider>
      <div className="min-h-screen bg-[#e8f0e9] flex flex-col">
        <Header name="Joana da Silva Oliveira" />

        <div className="flex flex-1">
          <div className="container mx-auto px-4 lg:px-8 flex flex-1">
            <Sidebar />

            <main className="flex-1 flex flex-col">
              <Tabs />
              <div className="flex-1 py-4">{children}</div>
            </main>
          </div>
        </div>
      </div>
    </ReactQueryProvider>
  );
}
