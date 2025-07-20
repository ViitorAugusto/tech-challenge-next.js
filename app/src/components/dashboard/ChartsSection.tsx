"use client";

import { Transaction } from "@/app/actions";
import { Suspense } from "react";
import dynamic from "next/dynamic";

// Carregamento dinâmico do componente FinancialCharts
const FinancialCharts = dynamic(() =>
  import('@/components/dashboard/FinancialCharts').then(mod => ({
    default: mod.FinancialCharts
  })), {
  ssr: false,
  loading: () => <div className="h-[400px] bg-gray-100 animate-pulse rounded-lg"></div>
}
);

interface ChartsSectionProps {
  transactions: Transaction[];
}

export function ChartsSection({ transactions }: ChartsSectionProps) {
  return (
    <div className="bg-white p-4 rounded-lg mt-4">
      <h2 className="text-xl font-semibold mb-4">Análise Financeira</h2>
      <Suspense fallback={<div className="h-[400px] bg-gray-100 animate-pulse rounded-lg"></div>}>
        <FinancialCharts transactions={transactions} />
      </Suspense>
    </div>
  );
}
