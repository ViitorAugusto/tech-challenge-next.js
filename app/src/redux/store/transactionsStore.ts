import { create } from "zustand";
import { Transaction } from "@/app/actions";

interface TransactionsState {
  transactions: Transaction[];
  isLoading: boolean;
  filter: {
    type: string | null;
    month: string | null;
    minValue: string | null;
    maxValue: string | null;
    searchTerm: string;
    page: number;
    itemsPerPage: number;
  };

  setTransactions: (transactions: Transaction[]) => void;
  addTransaction: (transaction: Transaction) => void;
  updateTransaction: (transaction: Transaction) => void;
  removeTransaction: (id: string) => void;
  setFilter: (filter: Partial<TransactionsState["filter"]>) => void;
  resetFilter: () => void;
  setLoading: (isLoading: boolean) => void;
}

export const useTransactionsStore = create<TransactionsState>((set) => ({
  transactions: [],
  isLoading: false,
  filter: {
    type: null,
    month: null,
    minValue: null,
    maxValue: null,
    searchTerm: "",
    page: 1,
    itemsPerPage: 10,
  },

  setTransactions: (transactions) => set({ transactions }),

  addTransaction: (transaction) =>
    set((state) => ({
      transactions: [...state.transactions, transaction],
    })),

  updateTransaction: (updatedTransaction) =>
    set((state) => ({
      transactions: state.transactions.map((t) =>
        t.id === updatedTransaction.id ? updatedTransaction : t
      ),
    })),

  removeTransaction: (id) =>
    set((state) => ({
      transactions: state.transactions.filter((t) => t.id !== id),
    })),

  setFilter: (filter) =>
    set((state) => ({
      filter: {
        ...state.filter,
        ...filter,
      },
    })),

  resetFilter: () =>
    set({
      filter: {
        type: null,
        month: null,
        minValue: null,
        maxValue: null,
        searchTerm: "",
        page: 1,
        itemsPerPage: 10,
      },
    }),

  setLoading: (isLoading) => set({ isLoading }),
}));
