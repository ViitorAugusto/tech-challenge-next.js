// app/page.tsx
"use client";

import { useState } from "react";
import { AccountCard } from "@/components/dashboard/AccountCard";
import { TransactionForm } from "@/components/dashboard/TransactionForm";
import { TransactionStatement } from "@/components/dashboard/TransactionStatement";

export default function HomePage() {
  const [showBalance, setShowBalance] = useState(true);

  return (
    <>
      <div className="w-full md:flex-1 ">
        <AccountCard
          showBalance={showBalance}
          onToggleBalance={() => setShowBalance(!showBalance)}
        />
        <TransactionForm />
      </div>

    </>
  );
}
