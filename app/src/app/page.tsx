import { AccountCard } from "@/components/dashboard/AccountCard";
import { TransactionForm } from "@/components/dashboard/TransactionForm";
import { TransactionStatement } from "@/components/dashboard/TransactionStatement";

export default async function BankingInterface() {
  return (
    <div className="space-y-6">
      {/* Layout principal */}
      <div className="flex flex-col lg:flex-row gap-6">
        <div className="flex flex-col gap-4 flex-1">
          <AccountCard userId="1" initialShowBalance={true} />
          <TransactionForm />
        </div>

        <div className="w-full lg:w-[350px]">
          <TransactionStatement />
        </div>
      </div>
    </div>
  );
}
