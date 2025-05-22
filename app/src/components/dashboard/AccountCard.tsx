"use client";
import { Eye } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

interface AccountCardProps {
  showBalance: boolean;
  onToggleBalance: () => void;
}

interface User {
  id: string;
  name: string;
  saldo: string;
  account_type: string;
  account_creation_date: string;
  transactions: Transaction[];
}
interface Transaction {
  id: string;
  type: string;
  month: string;
  creation_date: string;
  value: string;
  transferSign?: "add" | "sub";
}

export function AccountCard({
  showBalance,
  onToggleBalance,
}: AccountCardProps) {
  const [user, setUser] = useState<User | null>(null);
  const [saldo, setSaldo] = useState<string>("R$ 0,00");
  useEffect(() => {
    async function fetchUser() {
      const res = await fetch("http://localhost:3001/users/1");
      const data = await res.json();
      setUser(data);

      calculateBalance(data.transactions);
    }
    fetchUser();
  }, []);

  useEffect(() => {
    const handleTransactionChange = async () => {
      const res = await fetch("http://localhost:3001/users/1");
      const data = await res.json();
      setUser(data);
      calculateBalance(data.transactions);
    };

    window.addEventListener("transaction:added", handleTransactionChange);
    window.addEventListener("transaction:updated", handleTransactionChange);
    window.addEventListener("transaction:deleted", handleTransactionChange);

    return () => {
      window.removeEventListener("transaction:added", handleTransactionChange);
      window.removeEventListener("transaction:updated", handleTransactionChange);
      window.removeEventListener("transaction:deleted", handleTransactionChange);
    };
  }, []);

  const calculateBalance = (transactions: Transaction[] = []) => {
    let total = 0;
    (transactions || []).forEach((t: Transaction) => {
      const valor = parseFloat(
        t.value.replace(/[^\d,]/g, "").replace(",", ".")
      );

      if (t.type === "payment") {
        total -= valor;
      } else if (t.type === "transfer" && t.transferSign === "sub") {
        total -= valor;
      } else {
        total += valor;
      }
    });

    setSaldo(
      `R$ ${total.toLocaleString("pt-BR", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })}`
    );
  };

  return (
    <div className="bg-[#005566] text-white p-6 md:m-4 md:rounded-lg">
      <div className="mb-6">
        <h2 className="text-xl font-normal">
          Olá, {user ? user.name.split(' ')[0] : "..."}! :)
        </h2>
        <p className="text-sm mt-1">
          Conta criada em{" "}
          {user ? user.account_creation_date : "..."}
        </p>
      </div>

      <div className="mt-8">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-medium">Saldo</h3>
          <button onClick={onToggleBalance}>
            <Eye className="h-5 w-5" />
          </button>
        </div>
        <div className="border-b border-red-500 w-24 mb-2"></div>
        <p className="text-sm">
          {user
            ? user.account_type === "poupança"
              ? "Poupança"
              : "Conta Corrente"
            : "..."}
        </p>
        <p className="text-2xl font-bold mt-1">
          {showBalance ? saldo : "R$ ••••••"}
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
