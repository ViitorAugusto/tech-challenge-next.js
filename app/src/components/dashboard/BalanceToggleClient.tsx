"use client";

import { useState } from "react";
import { Eye } from "lucide-react";

interface BalanceToggleClientProps {
  initialShowBalance?: boolean;
  saldo: string;
}

export function BalanceToggleClient({
  initialShowBalance = false,
  saldo
}: BalanceToggleClientProps) {
  const [showBalance, setShowBalance] = useState(initialShowBalance);

  const toggleBalance = () => {
    setShowBalance(prev => !prev);
  };

  return (
    <div>
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium">Saldo</h3>
        <button onClick={toggleBalance}>
          <Eye className="h-5 w-5" />
        </button>
      </div>
      <div className="border-b border-white w-24 mb-2"></div>
      <p className="text-2xl font-bold mt-1">
        {showBalance ? saldo : "R$ ••••••"}
      </p>
    </div>
  );
}
