// Este arquivo se beneficia do uso híbrido: parte é renderizada no servidor e parte no cliente
import { Header } from "@/components/layout/Header";
import { Sidebar } from "@/components/layout/Sidebar";
import { AccountCard } from "@/components/dashboard/AccountCard";
import { TransactionForm } from "@/components/dashboard/TransactionForm";
import { TransactionStatement } from "@/components/dashboard/TransactionStatement";
// Importando o ClientBankingWrapper do arquivo local
import { ClientBankingWrapper } from "@/app/client-wrapper";

// Este componente agora é um Server Component por padrão no Next.js 15
export default async function BankingInterface() {
  return (
    <div className="min-h-screen bg-[#e8f0e9] flex flex-col">
      <Header name="Joana da Silva Oliveira" />

      <div className="flex flex-1">
        <Sidebar />

        <main className="flex-1 flex flex-col md:flex-row">
          <div className="w-full md:flex-1 bg-[#e8f0e9]">
            {/* O menu mobile é gerenciado pelo ClientBankingWrapper */}
            <ClientBankingWrapper />

            {/* O AccountCard agora é um componente SSR */}
            <AccountCard
              userId="1"
              initialShowBalance={true}
            />
            <TransactionForm />
          </div>

          <TransactionStatement />
        </main>
      </div>
    </div>
  );
}
