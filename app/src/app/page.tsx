import { Header } from "@/components/layout/Header";
import { Sidebar } from "@/components/layout/Sidebar";
import { AccountCard } from "@/components/dashboard/AccountCard";
import { TransactionForm } from "@/components/dashboard/TransactionForm";
import { TransactionStatement } from "@/components/dashboard/TransactionStatement";
import { Tabs } from "@/components/ui/tabs";
import { getUserTransactions } from "./actions";
import { ChartsSection } from "@/components/dashboard/ChartsSection";

export default async function BankingInterface() {
  // Obter transações para passar para os gráficos
  const transactions = await getUserTransactions("1");

  return (
    <div className="min-h-screen bg-[#e8f0e9] flex flex-col">
      <Header name="Joana da Silva Oliveira" />

      <div className="flex flex-1 container mx-auto px-4 lg:px-8">
        <Sidebar />

        <main className="flex-1 flex flex-col">
          <Tabs />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {/* Coluna 1: Cartão da Conta */}
            <div className="lg:col-span-2 flex flex-col">
              <AccountCard userId="1" initialShowBalance={true} />

              {/* Gráficos financeiros */}
              <ChartsSection transactions={transactions} />
            </div>

            {/* Coluna 2: Formulário de Transação e Extrato */}
            <div className="lg:col-span-1 flex flex-col gap-4">
              <div className="bg-white p-4 rounded-lg">
                <h2 className="text-xl font-semibold mb-4">Nova Transação</h2>
                <TransactionForm />
              </div>

              <TransactionStatement />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
