"use client";
import { useState } from "react";

import { Sidebar } from "@/components/layout/Sidebar";
import { AccountCard } from "@/components/dashboard/AccountCard";
import { TransactionForm } from "@/components/dashboard/TransactionForm";
import { TransactionStatement } from "@/components/dashboard/TransactionStatement";
import { Header } from "@/components/layout/Header";

export default function BankingInterface() {
  const [showBalance, setShowBalance] = useState(true);

  return (
    <div className="min-h-screen bg-[#e8f0e9] flex flex-col">
      <Header />
      <div className="flex flex-1">
        <Sidebar />

        <main className="flex-1 flex flex-col md:flex-row">
          <div className="w-full md:flex-1 bg-amber-600">
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
