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
        <h3 className="text-[25px] font-bold leading-none tracking-normal align-middle ">
          Extrato
        </h3>

        <div className="flex gap-2">
          <Button
            variant="default"
            size="icon"
            className="h-10 w-10 rounded-full bg-[#004D61] hover:bg-[#003f50] cursor-pointer"
          >
            <Edit className="h-5 w-5" />
          </Button>
          <Button
            variant="default"
            size="icon"
            className="h-10 w-10 rounded-full bg-[#004D61] hover:bg-[#003f50] cursor-pointer"
          >
            <Trash className="h-5 w-5 text-white" />
          </Button>
        </div>
      </div>

      <div className="space-y-4">
        {transactions.map((transaction, index) => (
          <div key={index} className="pb-2">
            <div className="text-sm font-semibold text-green-600 mb-1">
              {transaction.month}
            </div>

            <div className="flex justify-between items-center mt-1 mb-3">
              <div className="space-y-2">
                <div className="font-normal text-base leading-none align-middle tracking-normal">
                  {transaction.type}
                </div>

                <div
                  className={cn(
                    "text-base font-semibold leading-none tracking-normal align-middle"
                  )}
                >
                  {transaction.amount}
                </div>
              </div>

              <div className="text-[13px] font-normal leading-none tracking-normal align-middle font-inter text-gray-500 mb-4">
                {transaction.date}
              </div>
            </div>
            <div className="border-b-2 border-green-400 w-[80%]"></div>
          </div>
        ))}
      </div>
    </div>
  );
}
