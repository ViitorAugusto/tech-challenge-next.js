"use client";
import { Eye } from "lucide-react";
import Image from "next/image";

interface AccountCardProps {
  showBalance: boolean;
  onToggleBalance: () => void;
}

export function AccountCard({
  showBalance,
  onToggleBalance,
}: AccountCardProps) {
  return (
    <div className="bg-[#005566] text-white p-6 md:m-4 md:rounded-lg">
      <div className="mb-6">
        <h2 className="text-xl font-normal">Olá, Joana! :)</h2>
        <p className="text-sm mt-1">Quinta-feira, 08/09/2022</p>
      </div>

      <div className="mt-8">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-medium">Saldo</h3>
          <button onClick={onToggleBalance}>
            <Eye className="h-5 w-5" />
          </button>
        </div>
        <div className="border-b border-red-500 w-24 mb-2"></div>
        <p className="text-sm">Conta Corrente</p>
        <p className="text-2xl font-bold mt-1">
          {showBalance ? "R$ 2.500,00" : "R$ ••••••"}
        </p>
      </div>

      <div className="md:hidden mt-8 flex justify-center">
        <Image
          src="/placeholder.svg?height=100&width=100"
          alt="Ilustração"
          width={100}
          height={100}
          className="opacity-70"
        />
      </div>
    </div>
  );
}
