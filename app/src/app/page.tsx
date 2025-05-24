"use client";
import { useState } from "react";
import { Header } from "@/components/layout/Header";
import { MobileMenu } from "@/components/layout/MobileMenu";
import { Sidebar } from "@/components/layout/Sidebar";
import { AccountCard } from "@/components/dashboard/AccountCard";
import { TransactionForm } from "@/components/dashboard/TransactionForm";
import { TransactionStatement } from "@/components/dashboard/TransactionStatement";

export default function BankingInterface() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showBalance, setShowBalance] = useState(true);

  return (
    <div className="min-h-screen bg-[#e8f0e9] flex flex-col">
      <Header name="Joana da Silva Oliveira" />
      {menuOpen && <MobileMenu onClose={() => setMenuOpen(false)} />}

      <div className="flex flex-1">
        <Sidebar />

        <main className="flex-1 flex flex-col md:flex-row">
          <div className="w-full md:flex-1 bg-amber-600">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="absolute top-4 left-4 md:hidden z-10"
            >
              <div className="w-6 h-0.5 bg-green-500 mb-1.5" />
              <div className="w-6 h-0.5 bg-green-500 mb-1.5" />
              <div className="w-6 h-0.5 bg-green-500" />
            </button>

            <AccountCard
              showBalance={showBalance}
              onToggleBalance={() => setShowBalance(!showBalance)}
            />
            <TransactionForm />
          </div>

          <TransactionStatement />
        </main>
      </div>
    </div>
  );
}
