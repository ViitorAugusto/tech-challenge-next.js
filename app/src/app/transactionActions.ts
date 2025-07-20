"use server";

import { Transaction } from "./actions";

export interface TransactionFilterParams {
  userId?: string;
  page?: number;
  limit?: number;
  type?: string;
  month?: string;
  minValue?: string;
  maxValue?: string;
  searchTerm?: string;
}

export async function getPaginatedTransactions({
  userId = "1",
  page = 1,
  limit = 10,
  type,
  month,
  minValue,
  maxValue,
  searchTerm,
}: TransactionFilterParams): Promise<{
  transactions: Transaction[];
  totalCount: number;
  hasMore: boolean;
}> {
  try {
    // Buscar o usuário e suas transações
    const res = await fetch(`http://localhost:3001/users/${userId}`, {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Falha ao obter dados do usuário");
    }

    const user = await res.json();
    let transactions = user.transactions || [];

    // Filtrar as transações no servidor
    if (type) {
      if (type === "transfer_add") {
        transactions = transactions.filter(
          (t: Transaction) => t.type === "transfer" && t.transferSign === "add"
        );
      } else if (type === "transfer_sub") {
        transactions = transactions.filter(
          (t: Transaction) => t.type === "transfer" && t.transferSign === "sub"
        );
      } else {
        transactions = transactions.filter((t: Transaction) => t.type === type);
      }
    }

    if (month) {
      transactions = transactions.filter((t: Transaction) => t.month === month);
    }

    if (minValue) {
      const minValueNum = parseFloat(
        minValue.replace(/[^\d,]/g, "").replace(",", ".")
      );
      transactions = transactions.filter((t: Transaction) => {
        const value = parseFloat(
          t.value.replace(/[^\d,]/g, "").replace(",", ".")
        );
        return value >= minValueNum;
      });
    }

    if (maxValue) {
      const maxValueNum = parseFloat(
        maxValue.replace(/[^\d,]/g, "").replace(",", ".")
      );
      transactions = transactions.filter((t: Transaction) => {
        const value = parseFloat(
          t.value.replace(/[^\d,]/g, "").replace(",", ".")
        );
        return value <= maxValueNum;
      });
    }

    if (searchTerm) {
      const searchTermLower = searchTerm.toLowerCase();
      transactions = transactions.filter(
        (t: Transaction) =>
          t.type.toLowerCase().includes(searchTermLower) ||
          t.month.toLowerCase().includes(searchTermLower) ||
          t.value.toLowerCase().includes(searchTermLower) ||
          t.creation_date.toLowerCase().includes(searchTermLower)
      );
    }

    // Ordenar transações da mais recente para a mais antiga
    transactions = transactions.sort((a: Transaction, b: Transaction) => {
      try {
        const dateParts = a.creation_date.split(" ");
        const [da, ma, ya] = dateParts[0].split("/").map(Number);
        const timeA = dateParts[1] ? dateParts[1].split(":") : ["0", "0", "0"];

        const datePartsB = b.creation_date.split(" ");
        const [db, mb, yb] = datePartsB[0].split("/").map(Number);
        const timeB = datePartsB[1]
          ? datePartsB[1].split(":")
          : ["0", "0", "0"];

        const dateA = new Date(
          2000 + ya,
          ma - 1,
          da,
          parseInt(timeA[0]),
          parseInt(timeA[1]),
          parseInt(timeA[2])
        );
        const dateB = new Date(
          2000 + yb,
          mb - 1,
          db,
          parseInt(timeB[0]),
          parseInt(timeB[1]),
          parseInt(timeB[2])
        );

        return dateB.getTime() - dateA.getTime(); // Ordem decrescente (mais recente primeiro)
      } catch {
        return 0;
      }
    });

    // Total de transações após filtragem
    const totalCount = transactions.length;

    // Calcular início e fim para paginação
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    // Obter apenas os itens da página atual
    const paginatedTransactions = transactions.slice(startIndex, endIndex);

    // Verificar se há mais páginas
    const hasMore = endIndex < totalCount;

    return {
      transactions: paginatedTransactions,
      totalCount,
      hasMore,
    };
  } catch (error) {
    console.error("Erro ao buscar transações:", error);
    return {
      transactions: [],
      totalCount: 0,
      hasMore: false,
    };
  }
}
