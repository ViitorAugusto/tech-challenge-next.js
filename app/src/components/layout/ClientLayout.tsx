"use client";

import { useState, ReactNode } from "react";
import { Header } from "./Header";
import { Sidebar } from "./Sidebar";
import { MobileMenu } from "./MobileMenu";
import { TransactionStatement } from "../dashboard/TransactionStatement";

export function ClientLayout({ children }: { children: ReactNode }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="flex flex-col min-h-screen">
      <Header name="Joana da Silva Oliveira" />

      {/* Botão hambúrguer mobile */}
      <button
        onClick={() => setMenuOpen(!menuOpen)}
        className="absolute top-4 left-4 md:hidden z-50"
      >
        <div className="w-6 h-0.5 bg-green-500 mb-1.5" />
        <div className="w-6 h-0.5 bg-green-500 mb-1.5" />
        <div className="w-6 h-0.5 bg-green-500" />
      </button>

      {menuOpen && <MobileMenu onClose={() => setMenuOpen(false)} />}

      <div className="flex flex-1 container mx-auto">
        <Sidebar />
        <main className="flex-1 flex flex-col md:flex-row">{children}</main>
        <TransactionStatement />
      </div>
    </div>
  );
}
