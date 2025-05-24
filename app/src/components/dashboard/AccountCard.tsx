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
      window.removeEventListener(
        "transaction:updated",
        handleTransactionChange
      );
      window.removeEventListener(
        "transaction:deleted",
        handleTransactionChange
      );
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
    <div className="relative bg-[#005566] text-white my-6 mx-4 rounded-2xl p-6 md:m-4 md:rounded-lg overflow-hidden h-[80vh] md:h-auto">
      {/* Imagens decorativas mobile */}
      <div className="absolute inset-0 md:hidden z-0 pointer-events-none">
        {/* Canto inferior esquerdo */}
        <Image
          src="/img/Ilustração1.png"
          alt="Ilustração"
          width={200}
          height={200}
          className="absolute bottom-4 left-4 opacity-80"
        />

        {/* Canto inferior direito */}
        <Image
          src="/img/Pixels.png"
          alt="Pixels"
          width={150}
          height={150}
          className="absolute bottom-0 right-0 opacity-30"
        />

        {/* Canto superior direito */}
        <Image
          src="/img/Pixels1.png"
          alt="Pixels Top"
          width={150}
          height={150}
          className="absolute top-0 left-0 opacity-30"
        />
      </div>

      {/* Conteúdo */}
      <div className="relative z-10  flex flex-col justify-center items-center">
        <div className="mb-6">
          <h2 className="text-xl font-normal">
            Olá, {user ? user.name.split(" ")[0] : "..."}! :)
          </h2>
          <p className="text-sm mt-1">
            {new Date().toLocaleDateString("pt-BR", {
              weekday: "long",
              day: "2-digit",
              month: "2-digit",
              year: "numeric",
            })}
          </p>
        </div>

        <div className="mt-8 ">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium">Saldo</h3>
            <button onClick={onToggleBalance}>
              <Eye className="h-5 w-5" />
            </button>
          </div>
          <div className="border-b border-white w-24 mb-2"></div>
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
      </div>
    </div>
  );
}
