"use client";
import { useMemo } from "react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  Legend,
  BarChart,
  Bar,
} from "recharts";
import { Transaction } from "@/app/actions";

interface FinancialChartsProps {
  transactions: Transaction[];
}

const COLORS = [
  "#3B82F6",
  "#10B981",
  "#F59E0B",
  "#EF4444",
  "#8B5CF6",
  "#06B6D4",
];

// Função para formatar os valores monetários
const formatCurrency = (value: number) => {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);
};

// Função para converter string de valor para número
const parseTransactionValue = (value: string): number => {
  return parseFloat(value.replace(/[^\d,]/g, "").replace(",", "."));
};

export function FinancialCharts({ transactions }: FinancialChartsProps) {
  // Agrupar transações por mês para o gráfico de área
  const monthlyData = useMemo(() => {
    const monthMap = new Map<string, { income: number; expense: number }>();
    const monthOrder = [
      "Janeiro",
      "Fevereiro",
      "Março",
      "Abril",
      "Maio",
      "Junho",
      "Julho",
      "Agosto",
      "Setembro",
      "Outubro",
      "Novembro",
      "Dezembro",
    ];

    // Inicializa todos os meses com valores zero
    monthOrder.forEach(month => {
      monthMap.set(month, { income: 0, expense: 0 });
    });

    // Agrupa transações por mês
    transactions.forEach(transaction => {
      const month = transaction.month;
      const value = parseTransactionValue(transaction.value);
      const currentData = monthMap.get(month) || { income: 0, expense: 0 };

      if (
        transaction.type === "payment" ||
        (transaction.type === "transfer" && transaction.transferSign === "sub")
      ) {
        currentData.expense += value;
      } else {
        currentData.income += value;
      }

      monthMap.set(month, currentData);
    });

    // Converte o Map para um array de objetos para o Recharts
    return Array.from(monthMap.entries())
      .map(([month, data]) => ({
        month,
        income: data.income,
        expense: data.expense,
        balance: data.income - data.expense,
      }))
      .sort(
        (a, b) => monthOrder.indexOf(a.month) - monthOrder.indexOf(b.month)
      );
  }, [transactions]);

  // Dados para o gráfico de pizza de tipos de transação
  const typeDistribution = useMemo(() => {
    const typeCount = new Map<string, number>();

    transactions.forEach(transaction => {
      const type = transaction.type;
      const value = parseTransactionValue(transaction.value);
      const currentValue = typeCount.get(type) || 0;
      typeCount.set(type, currentValue + value);
    });

    return Array.from(typeCount.entries()).map(([name, value]) => ({
      name,
      value,
    }));
  }, [transactions]);

  // Dados para o gráfico de barras de despesas vs receitas
  const incomeVsExpense = useMemo(() => {
    let totalIncome = 0;
    let totalExpense = 0;

    transactions.forEach(transaction => {
      const value = parseTransactionValue(transaction.value);

      if (
        transaction.type === "payment" ||
        (transaction.type === "transfer" && transaction.transferSign === "sub")
      ) {
        totalExpense += value;
      } else {
        totalIncome += value;
      }
    });

    return [
      { name: "Receitas", value: totalIncome },
      { name: "Despesas", value: totalExpense },
    ];
  }, [transactions]);

  return (
    <div className="space-y-8">
      {/* Gráfico de área - Receitas e Despesas por Mês */}
      <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
        <div className="flex items-center mb-8">
          <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center mr-4">
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
                d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
              />
            </svg>
          </div>
          <div>
            <h3 className="text-2xl font-bold text-gray-900">
              Fluxo Financeiro Mensal
            </h3>
            <p className="text-gray-600 mt-1">
              Acompanhe a evolução das suas receitas e despesas ao longo do
              tempo
            </p>
          </div>
        </div>
        <ResponsiveContainer width="100%" height={400}>
          <AreaChart
            data={monthlyData}
            margin={{
              top: 20,
              right: 40,
              left: 20,
              bottom: 60,
            }}
          >
            <defs>
              <linearGradient id="colorIncome" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10B981" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#10B981" stopOpacity={0.1} />
              </linearGradient>
              <linearGradient id="colorExpense" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#EF4444" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#EF4444" stopOpacity={0.1} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
            <XAxis
              dataKey="month"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: "#6B7280" }}
              angle={-45}
              textAnchor="end"
              height={80}
            />
            <YAxis
              tickFormatter={value => formatCurrency(value)}
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: "#6B7280" }}
            />
            <Tooltip
              formatter={value => formatCurrency(Number(value))}
              contentStyle={{
                backgroundColor: "white",
                border: "1px solid #E5E7EB",
                borderRadius: "12px",
                boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
                padding: "12px",
              }}
            />
            <Legend wrapperStyle={{ paddingTop: "20px" }} />
            <Area
              type="monotone"
              dataKey="income"
              stroke="#10B981"
              strokeWidth={3}
              fill="url(#colorIncome)"
              name="Receitas"
            />
            <Area
              type="monotone"
              dataKey="expense"
              stroke="#EF4444"
              strokeWidth={3}
              fill="url(#colorExpense)"
              name="Despesas"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Grid com os dois gráficos menores */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        {/* Gráfico de Pizza - Distribuição por Tipo */}
        <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
          <div className="flex items-center mb-8">
            <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-pink-600 rounded-lg flex items-center justify-center mr-4">
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
                  d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z"
                />
              </svg>
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900">
                Distribuição por Tipo
              </h3>
              <p className="text-gray-600 mt-1">
                Proporção dos tipos de transação
              </p>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={320}>
            <PieChart>
              <Pie
                data={typeDistribution}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) =>
                  `${name}: ${percent ? (percent * 100).toFixed(0) : 0}%`
                }
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
                strokeWidth={3}
                stroke="#fff"
              >
                {typeDistribution.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip
                formatter={value => formatCurrency(Number(value))}
                contentStyle={{
                  backgroundColor: "white",
                  border: "1px solid #E5E7EB",
                  borderRadius: "8px",
                  boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Gráfico de Barras - Receitas vs Despesas */}
        <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
          <div className="flex items-center mb-8">
            <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-blue-600 rounded-lg flex items-center justify-center mr-4">
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
              <h3 className="text-xl font-bold text-gray-900">
                Receitas vs Despesas
              </h3>
              <p className="text-gray-600 mt-1">
                Comparativo geral de entradas e saídas
              </p>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={320}>
            <BarChart
              data={incomeVsExpense}
              margin={{
                top: 20,
                right: 30,
                left: 20,
                bottom: 20,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis
                dataKey="name"
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 14, fill: "#6B7280" }}
              />
              <YAxis
                tickFormatter={value => formatCurrency(value)}
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12, fill: "#6B7280" }}
              />
              <Tooltip
                formatter={value => formatCurrency(Number(value))}
                contentStyle={{
                  backgroundColor: "white",
                  border: "1px solid #E5E7EB",
                  borderRadius: "12px",
                  boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
                  padding: "12px",
                }}
              />
              <Bar dataKey="value" radius={[8, 8, 0, 0]} strokeWidth={0}>
                {incomeVsExpense.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={index === 0 ? "#10B981" : "#EF4444"}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
