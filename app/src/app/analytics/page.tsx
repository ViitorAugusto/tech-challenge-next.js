import { getUserTransactions } from "../actions";
import { ChartsSection } from "@/app/analytics/_components/ChartsSection";

export default async function AnalyticsPage() {
  const transactions = await getUserTransactions("1");

  return (
    <div className="grid grid-cols-1 gap-4">
      <div className="flex flex-col">
        <ChartsSection transactions={transactions} />
      </div>
    </div>
  );
}
