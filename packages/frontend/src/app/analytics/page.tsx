export const dynamic = 'force-dynamic'; 
import { getUserTransactions } from "../actions";
import { ChartsSection } from "@/app/analytics/_components/ChartsSection";
import { DashboardCustomization } from "@/components/dashboard/DashboardCustomization";


export default async function AnalyticsPage() {
  const transactions = await getUserTransactions("1");

  return (
    <div className="space-y-6 md:pl-6">
      {/* Header da página */}
      <div className="bg-gradient-to-r from-[#005566] to-[#007788] rounded-lg p-6 text-white">
        <h1 className="text-3xl font-bold mb-2">Análise Financeira</h1>
        <p className="text-lg opacity-90">
          Visão completa dos seus dados financeiros
        </p>
      </div>

      {/* Widgets Personalizados */}
      <DashboardCustomization transactions={transactions} />

      {/* Cards de métricas resumidas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border-l-4 border-green-500 hover:shadow-md transition-shadow">
          <div className="flex items-center">
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-600 uppercase tracking-wide">
                Total de Transações
              </p>
              <p className="text-2xl font-bold text-gray-900 mt-2">
                {transactions.length}
              </p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
              <svg
                className="w-6 h-6 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border-l-4 border-blue-500 hover:shadow-md transition-shadow">
          <div className="flex items-center">
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-600 uppercase tracking-wide">
                Receitas
              </p>
              <p className="text-2xl font-bold text-gray-900 mt-2">
                R${" "}
                {transactions
                  .filter(
                    t =>
                      t.type === "deposit" ||
                      (t.type === "transfer" && t.transferSign === "add")
                  )
                  .reduce(
                    (sum, t) =>
                      sum +
                      parseFloat(
                        t.value.replace(/[^\d,]/g, "").replace(",", ".")
                      ),
                    0
                  )
                  .toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
              </p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
              <svg
                className="w-6 h-6 text-blue-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                />
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border-l-4 border-red-500 hover:shadow-md transition-shadow">
          <div className="flex items-center">
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-600 uppercase tracking-wide">
                Despesas
              </p>
              <p className="text-2xl font-bold text-gray-900 mt-2">
                R${" "}
                {transactions
                  .filter(
                    t =>
                      t.type === "payment" ||
                      (t.type === "transfer" && t.transferSign === "sub")
                  )
                  .reduce(
                    (sum, t) =>
                      sum +
                      parseFloat(
                        t.value.replace(/[^\d,]/g, "").replace(",", ".")
                      ),
                    0
                  )
                  .toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
              </p>
            </div>
            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
              <svg
                className="w-6 h-6 text-red-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6"
                />
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border-l-4 border-purple-500 hover:shadow-md transition-shadow">
          <div className="flex items-center">
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-600 uppercase tracking-wide">
                Saldo Atual
              </p>
              <p className="text-2xl font-bold text-gray-900 mt-2">
                R${" "}
                {(
                  transactions
                    .filter(
                      t =>
                        t.type === "deposit" ||
                        (t.type === "transfer" && t.transferSign === "add")
                    )
                    .reduce(
                      (sum, t) =>
                        sum +
                        parseFloat(
                          t.value.replace(/[^\d,]/g, "").replace(",", ".")
                        ),
                      0
                    ) -
                  transactions
                    .filter(
                      t =>
                        t.type === "payment" ||
                        (t.type === "transfer" && t.transferSign === "sub")
                    )
                    .reduce(
                      (sum, t) =>
                        sum +
                        parseFloat(
                          t.value.replace(/[^\d,]/g, "").replace(",", ".")
                        ),
                      0
                    )
                ).toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
              </p>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
              <svg
                className="w-6 h-6 text-purple-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Seção de gráficos */}
      <ChartsSection transactions={transactions} />
    </div>
  );
}
