"use client";

import { useState, useEffect, ReactNode } from "react";
import { Header } from "./Header";
import { Sidebar } from "./Sidebar";
import { MobileMenu } from "./MobileMenu";
import { TransactionStatement } from "../dashboard/TransactionStatement";

export function ClientLayout({ children }: { children: ReactNode }) {
  const [menuOpen, setMenuOpen] = useState(false);
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
