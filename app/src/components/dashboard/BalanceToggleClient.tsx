"use client";

import { useState } from "react";
import { Eye } from "lucide-react";

interface BalanceToggleClientProps {
  initialShowBalance?: boolean;
  saldo: string;
}

export function BalanceToggleClient({
  initialShowBalance = false,
  saldo,
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
          <Eye className="h-5 w-5 text-orange-500" />
        </button>
      </div>
      <div className="border-b-2 border-orange-500 w-full my-2 "></div>
      <p className="text-2xl font-bold mt-1">
        {showBalance ? saldo : "R$ ••••••"}
      </p>
      <p className="text-sm mt-2">Conta Corrente</p>
    </div>
  );
}
