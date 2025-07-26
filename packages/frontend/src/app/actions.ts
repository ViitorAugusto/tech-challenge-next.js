"use server";

import { revalidatePath } from "next/cache";
import { API_BASE_URL } from "@/constants/envs";

export interface Transaction {
  id: string;
  type: string;
  month: string;
  creation_date: string;
  value: string;
  transferSign?: "add" | "sub";
}

export async function getUserTransactions(
  userId: string = "1"
): Promise<Transaction[]> {
  try {
    const res = await fetch(`${API_BASE_URL}/users/${userId}`, {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Falha ao obter dados do usuário");
    }

    const user = await res.json();

    return (user.transactions || []).sort((a: Transaction, b: Transaction) => {
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

        return dateB.getTime() - dateA.getTime();
      } catch {
        return 0;
      }
    });
  } catch (error) {
    console.error("Erro ao buscar transações:", error);
    return [];
  }
}

export async function addTransaction(transaction: Transaction) {
  try {
    const res = await fetch(`${API_BASE_URL}/users/1`);

    if (!res.ok) {
      throw new Error("Falha ao obter dados do usuário");
    }

    const user = await res.json();
    const updatedTransactions = [...(user.transactions || []), transaction];

    const updateRes = await fetch(`${API_BASE_URL}/users/1`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ transactions: updatedTransactions }),
      cache: "no-store",
    });

    if (!updateRes.ok) {
      throw new Error("Falha ao atualizar transação");
    }

    revalidatePath("/");

    return { success: true };
  } catch (error) {
    console.error("Erro ao adicionar transação:", error);
    return { success: false, error: (error as Error).message };
  }
}

export async function updateTransaction(
  updatedTransaction: Transaction,
  userId: string = "1"
) {
  try {
    const res = await fetch(`${API_BASE_URL}/users/${userId}`);

    if (!res.ok) {
      throw new Error("Falha ao obter dados do usuário");
    }

    const user = await res.json();
    const updatedTransactions = user.transactions.map((t: Transaction) =>
      t.id === updatedTransaction.id ? updatedTransaction : t
    );

    const updateRes = await fetch(`${API_BASE_URL}/users/${userId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ transactions: updatedTransactions }),
      cache: "no-store",
    });

    if (!updateRes.ok) {
      throw new Error("Falha ao atualizar transação");
    }

    revalidatePath("/");

    return { success: true, transactions: updatedTransactions };
  } catch (error) {
    console.error("Erro ao atualizar transação:", error);
    return { success: false, error: (error as Error).message };
  }
}

export async function deleteTransaction(
  transactionId: string,
  userId: string = "1"
) {
  try {
    const res = await fetch(`${API_BASE_URL}/users/${userId}`);

    if (!res.ok) {
      throw new Error("Falha ao obter dados do usuário");
    }

    const user = await res.json();
    const updatedTransactions = user.transactions.filter(
      (t: Transaction) => t.id !== transactionId
    );

    const updateRes = await fetch(`${API_BASE_URL}/users/${userId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ transactions: updatedTransactions }),
      cache: "no-store",
    });

    if (!updateRes.ok) {
      throw new Error("Falha ao excluir transação");
    }

    revalidatePath("/");

    return { success: true, transactions: updatedTransactions };
  } catch (error) {
    console.error("Erro ao excluir transação:", error);
    return { success: false, error: (error as Error).message };
  }
}
