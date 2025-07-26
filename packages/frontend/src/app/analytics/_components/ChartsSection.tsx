"use client";

import { Transaction } from "@/app/actions";
import { Suspense } from "react";
import dynamic from "next/dynamic";

const FinancialCharts = dynamic(
  () =>
    import("@/app/analytics/_components/FinancialCharts").then(mod => ({
      default: mod.FinancialCharts,
    })),
  {
    ssr: false,
    loading: () => (
      <div className="space-y-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="h-8 bg-gray-200 animate-pulse rounded mb-4"></div>
          <div className="h-[300px] bg-gray-100 animate-pulse rounded-lg"></div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="h-6 bg-gray-200 animate-pulse rounded mb-4"></div>
            <div className="h-[250px] bg-gray-100 animate-pulse rounded-lg"></div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="h-6 bg-gray-200 animate-pulse rounded mb-4"></div>
            <div className="h-[250px] bg-gray-100 animate-pulse rounded-lg"></div>
          </div>
        </div>
      </div>
    ),
  }
);

interface ChartsSectionProps {
  transactions: Transaction[];
}

export function ChartsSection({ transactions }: ChartsSectionProps) {
  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
        <div className="flex items-center mb-6">
          <div className="w-10 h-10 bg-gradient-to-r from-[#005566] to-[#007788] rounded-lg flex items-center justify-center mr-3">
            <svg
              className="w-6 h-6 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
              />
            </svg>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              Análise Detalhada
            </h2>
            <p className="text-gray-600">
              Gráficos e insights dos seus dados financeiros
            </p>
          </div>
        </div>

        <Suspense
          fallback={
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="h-8 bg-gray-200 animate-pulse rounded mb-4"></div>
                <div className="h-[300px] bg-gray-100 animate-pulse rounded-lg"></div>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <div className="h-6 bg-gray-200 animate-pulse rounded mb-4"></div>
                  <div className="h-[250px] bg-gray-100 animate-pulse rounded-lg"></div>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <div className="h-6 bg-gray-200 animate-pulse rounded mb-4"></div>
                  <div className="h-[250px] bg-gray-100 animate-pulse rounded-lg"></div>
                </div>
              </div>
            </div>
          }
        >
          <FinancialCharts transactions={transactions} />
        </Suspense>
      </div>
    </div>
  );
}
