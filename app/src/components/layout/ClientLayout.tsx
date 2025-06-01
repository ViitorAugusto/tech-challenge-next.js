"use client";

import { useState, useEffect, ReactNode } from "react";
import { Sidebar } from "./Sidebar";
import { TransactionStatement } from "../dashboard/TransactionStatement";
import { Header } from "./Header";

export function ClientLayout({ children }: { children: ReactNode }) {
  const [userName, setUserName] = useState("Usuário");
  const [refresh, setRefresh] = useState(0);

  useEffect(() => {
    async function fetchUserName() {
      try {
        const res = await fetch("http://localhost:3001/users/1");
        const user = await res.json();
        setUserName(user.name);
      } catch (error) {
        console.error("Erro ao buscar nome do usuário:", error);
      }
    }

    fetchUserName();
  }, [refresh]);

  useEffect(() => {
    const handleTransactionAdded = () => setRefresh((prev) => prev + 1);
    window.addEventListener("transaction:added", handleTransactionAdded);
    return () =>
      window.removeEventListener("transaction:added", handleTransactionAdded);
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <Header name={userName} />

      <div className="flex flex-1 container mx-auto">
        <Sidebar />
        <main className="flex-1 flex flex-col md:flex-row">{children}</main>
        <TransactionStatement />
      </div>
    </div>
  );
}
