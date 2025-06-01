import { getUserTransactions } from "@/app/actions";
import { TransactionClient } from "./TransactionClient";

export async function TransactionStatement({ userId = "1" }: { userId?: string }) {
  const transactions = await getUserTransactions(userId);

  return (
    <div className="hidden md:block w-80 bg-white p-6 m-4 rounded-lg">
      <h3 className="text-[25px] font-bold mb-6">Extrato</h3>

      <div className="space-y-4">
        {transactions.length === 0 && (
          <div className="text-gray-500 text-center">Nenhuma transação encontrada.</div>
        )}

        <TransactionClient transactions={transactions} />
      </div>
    </div>
  );
}
