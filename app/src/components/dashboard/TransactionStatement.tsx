import { getPaginatedTransactions } from "@/app/transactionActions";
import { TransactionStatementClient } from "./TransactionStatementClient";
import { FilterToggleButton } from "./FilterToggleButton";

export async function TransactionStatement({ userId = "1" }: { userId?: string }) {
  // Buscamos apenas a primeira página de transações inicialmente
  // Por padrão, transações vêm ordenadas da mais recente para a mais antiga (sortDirection="desc")
  const { transactions, totalCount, hasMore } = await getPaginatedTransactions({
    userId,
    page: 1,
    limit: 5 // Limitamos a 5 transações por página para melhor experiência de scroll
  });

  return (
    <div className="lg:block lg:w-80 bg-white p-4 m-4 rounded-lg h-[500px]">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-[25px] font-bold">Extrato</h3>
        <FilterToggleButton />
      </div>

      <div className="space-y-4">
        {transactions.length === 0 ? (
          <div className="text-gray-500 text-center">Nenhuma transação encontrada.</div>
        ) : (
          <TransactionStatementClient
            initialTransactions={transactions}
            userId={userId}
            initialHasMore={hasMore}
            totalCount={totalCount}
          />
        )}
      </div>
    </div>
  );
}
