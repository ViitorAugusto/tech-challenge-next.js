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
  Bar
} from "recharts";
import { Transaction } from "@/app/actions";

interface FinancialChartsProps {
  transactions: Transaction[];
}

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8"];

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
      "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
      "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
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

      if (transaction.type === "payment" ||
        (transaction.type === "transfer" && transaction.transferSign === "sub")) {
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
        balance: data.income - data.expense
      }))
      .sort((a, b) => monthOrder.indexOf(a.month) - monthOrder.indexOf(b.month));
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

    return Array.from(typeCount.entries()).map(([name, value]) => ({ name, value }));
  }, [transactions]);

  // Dados para o gráfico de barras de despesas vs receitas
  const incomeVsExpense = useMemo(() => {
    let totalIncome = 0;
    let totalExpense = 0;

    transactions.forEach(transaction => {
      const value = parseTransactionValue(transaction.value);

      if (transaction.type === "payment" ||
        (transaction.type === "transfer" && transaction.transferSign === "sub")) {
        totalExpense += value;
      } else {
        totalIncome += value;
      }
    });

    return [
      { name: "Receitas", value: totalIncome },
      { name: "Despesas", value: totalExpense }
    ];
  }, [transactions]);

  return (
    <div className="flex flex-col gap-6">
      <div className="bg-white p-4 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold mb-4">Receitas e Despesas por Mês</h3>
        <ResponsiveContainer width="100%" height={200}>
          <AreaChart
            data={monthlyData}
            margin={{
              top: 10, right: 30, left: 0, bottom: 0,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis tickFormatter={(value) => formatCurrency(value)} />
            <Tooltip formatter={(value) => formatCurrency(Number(value))} />
            <Legend />
            <Area type="monotone" dataKey="income" stackId="1" stroke="#82ca9d" fill="#82ca9d" name="Receitas" />
            <Area type="monotone" dataKey="expense" stackId="1" stroke="#8884d8" fill="#8884d8" name="Despesas" />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-4">Distribuição por Tipo</h3>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={typeDistribution}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name}: ${(percent ? (percent * 100).toFixed(0) : 0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {typeDistribution.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => formatCurrency(Number(value))} />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-4">Receitas vs Despesas</h3>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart
              data={incomeVsExpense}
              margin={{
                top: 5, right: 30, left: 20, bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis tickFormatter={(value) => formatCurrency(value)} />
              <Tooltip formatter={(value) => formatCurrency(Number(value))} />
              <Bar dataKey="value" fill="#8884d8">
                {incomeVsExpense.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={index === 0 ? "#00C49F" : "#FF8042"} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
