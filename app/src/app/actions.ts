"use server";

import { revalidatePath } from "next/cache";

// Tipos
interface Transaction {
  id: string;
  type: string;
  month: string;
  creation_date: string;
  value: string;
  transferSign?: "add" | "sub";
}

export async function addTransaction(transaction: Transaction) {
  try {
    const res = await fetch("http://localhost:3001/users/1");

    if (!res.ok) {
      throw new Error("Falha ao obter dados do usuário");
    }

    const user = await res.json();
    const updatedTransactions = [...(user.transactions || []), transaction];

    const updateRes = await fetch("http://localhost:3001/users/1", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ transactions: updatedTransactions }),
      cache: "no-store",
    });

    if (!updateRes.ok) {
      throw new Error("Falha ao atualizar transação");
    }

    // Revalidar a página para atualizar os dados em SSR
    revalidatePath("/");

    return { success: true };
  } catch (error) {
    console.error("Erro ao adicionar transação:", error);
    return { success: false, error: (error as Error).message };
  }
}
