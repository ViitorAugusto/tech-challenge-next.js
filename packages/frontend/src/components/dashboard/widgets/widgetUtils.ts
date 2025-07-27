// Utilitários para widgets do dashboard

import { Transaction } from "@/app/actions";

export interface SavingsGoalConfig {
  title: string;
  target: number;
  description: string;
}

export interface SpendingAlertConfig {
  title: string;
  limit: number;
  category: string;
}

export type WidgetConfig = SavingsGoalConfig | SpendingAlertConfig;

export const parseTransactionValue = (value: string): number => {
  return parseFloat(value.replace(/[^\d,]/g, "").replace(",", "."));
};

export const formatCurrency = (value: number): string => {
  return value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
};

export const calculateTotalIncome = (transactions: Transaction[]): number => {
  return transactions
    .filter(
      t =>
        t.type === "deposit" ||
        (t.type === "transfer" && t.transferSign === "add")
    )
    .reduce((sum, t) => sum + parseTransactionValue(t.value), 0);
};

export const calculateTotalExpenses = (transactions: Transaction[]): number => {
  return transactions
    .filter(
      t =>
        t.type === "payment" ||
        (t.type === "transfer" && t.transferSign === "sub")
    )
    .reduce((sum, t) => sum + parseTransactionValue(t.value), 0);
};

export const getDefaultWidgets = () => [
  {
    id: "savings-1",
    type: "savings-goal" as const,
    config: {
      title: "Meta de Economia",
      target: 5000,
      description: "Economia para viagem",
    },
    enabled: true,
  },
  {
    id: "alert-1",
    type: "spending-alert" as const,
    config: {
      title: "Alerta de Gastos",
      limit: 2000,
      category: "Todas as categorias",
    },
    enabled: true,
  },
];
