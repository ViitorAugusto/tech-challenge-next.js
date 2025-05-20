"use client";
import { Edit, Trash } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const transactions = [
  {
    month: "Novembro",
    type: "Depósito",
    amount: "R$ 150",
    date: "18/11/2022",
    positive: true,
  },
  {
    month: "Novembro",
    type: "Depósito",
    amount: "R$ 100",
    date: "21/11/2022",
    positive: true,
  },
  {
    month: "Novembro",
    type: "Depósito",
    amount: "R$ 50",
    date: "21/11/2022",
    positive: true,
  },
  {
    month: "Novembro",
    type: "Transferência",
    amount: "-R$ 500",
    date: "21/11/2022",
    positive: false,
  },
];

export function TransactionStatement() {
  return (
    <div className="hidden md:block w-80 bg-white p-6 m-4 rounded-lg">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-medium">Extrato</h3>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8 rounded-full"
          >
            <Edit className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8 rounded-full"
          >
            <Trash className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="space-y-6">
        {transactions.map((transaction, index) => (
          <div key={index} className="border-b border-gray-100 pb-2">
            <div className="text-xs text-green-600">{transaction.month}</div>
            <div className="flex justify-between items-center">
              <div>
                <div>{transaction.type}</div>
                <div
                  className={cn(
                    "font-medium",
                    transaction.positive ? "text-black" : "text-red-500"
                  )}
                >
                  {transaction.amount}
                </div>
              </div>
              <div className="text-xs text-gray-500">{transaction.date}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
