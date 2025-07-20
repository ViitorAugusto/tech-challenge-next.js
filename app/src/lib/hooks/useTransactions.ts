"use client";

import {
  getUserTransactions,
  addTransaction,
  updateTransaction,
  deleteTransaction,
} from "@/app/actions";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useTransactions = (userId: string = "1") => {
  const queryClient = useQueryClient();

  // Obter todas as transações
  const {
    data: transactions = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["transactions", userId],
    queryFn: () => getUserTransactions(userId),
  });

  // Adicionar transação
  const addMutation = useMutation({
    mutationFn: addTransaction,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["transactions", userId] });
    },
  });

  // Atualizar transação
  const updateMutation = useMutation({
    mutationFn: updateTransaction,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["transactions", userId] });
    },
  });

  // Excluir transação
  const deleteMutation = useMutation({
    mutationFn: (transactionId: string) =>
      deleteTransaction(userId, transactionId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["transactions", userId] });
    },
  });

  return {
    transactions,
    isLoading,
    error,
    addTransaction: addMutation.mutate,
    updateTransaction: updateMutation.mutate,
    deleteTransaction: deleteMutation.mutate,
    isAddingTransaction: addMutation.isPending,
    isUpdatingTransaction: updateMutation.isPending,
    isDeletingTransaction: deleteMutation.isPending,
  };
};
