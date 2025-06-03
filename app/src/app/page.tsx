import { Header } from "@/components/layout/Header";
import { Sidebar } from "@/components/layout/Sidebar";
import { AccountCard } from "@/components/dashboard/AccountCard";
import { TransactionForm } from "@/components/dashboard/TransactionForm";
import { TransactionStatement } from "@/components/dashboard/TransactionStatement";
import { Tabs } from "@/components/ui/tabs";

export default async function BankingInterface() {
  return (
    <div className="min-h-screen bg-[#e8f0e9] flex flex-col">
      <Header name="Joana da Silva Oliveira" />

      <div className="flex flex-1 container mx-auto px-4 lg:px-8">
        <Sidebar />

        <main className="flex-1 flex flex-col lg:flex-row">
          <Tabs />
          <div className="w-full md:flex-1 bg-[#e8f0e9]">
            <AccountCard userId="1" initialShowBalance={true} />
            <TransactionForm />
          </div>

          <TransactionStatement />
        </main>
      </div>
    </div>
  );
}
