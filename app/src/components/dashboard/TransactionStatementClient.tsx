"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { Transaction } from "@/app/actions";
import { TransactionClient } from "./TransactionClient";
import { getPaginatedTransactions } from "@/app/transactionActions";

interface TransactionStatementClientProps {
  initialTransactions: Transaction[];
  userId: string;
  initialHasMore: boolean;
  totalCount: number;
}

export function TransactionStatementClient({
  initialTransactions,
  userId,
  initialHasMore,
  totalCount
}: TransactionStatementClientProps) {
  // Estado para armazenar todas as transações carregadas
  const [transactions, setTransactions] = useState<Transaction[]>(initialTransactions);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(initialHasMore);

  const observerRef = useRef<IntersectionObserver | null>(null);
  const loaderRef = useRef<HTMLDivElement | null>(null);

  // Função para carregar mais transações com useCallback para evitar recriações desnecessárias
  const loadMoreTransactions = useCallback(async () => {
    if (isLoading || !hasMore) return;

    setIsLoading(true);
    try {
      const nextPage = page + 1;
      const result = await getPaginatedTransactions({
        userId,
        page: nextPage,
        limit: 5 // Mantemos consistente com o limite inicial
      });

      if (result.transactions.length > 0) {
        setTransactions(prev => [...prev, ...result.transactions]);
        setPage(nextPage);
        setHasMore(result.hasMore);
      } else {
        setHasMore(false);
      }
    } catch (error) {
      console.error("Erro ao carregar mais transações:", error);
    } finally {
      setIsLoading(false);
    }
  }, [hasMore, isLoading, page, userId]);

  // Configurar o observador de interseção para detectar quando o usuário chega ao final da lista
  useEffect(() => {
    if (!hasMore) return;

    observerRef.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && !isLoading) {
        loadMoreTransactions();
      }
    }, { threshold: 0.1 });

    // Observar o elemento loader
    const currentLoaderRef = loaderRef.current;
    if (currentLoaderRef) {
      observerRef.current.observe(currentLoaderRef);
    }

    return () => {
      if (observerRef.current && currentLoaderRef) {
        observerRef.current.unobserve(currentLoaderRef);
      }
    };
  }, [hasMore, isLoading, loadMoreTransactions]);

  return (
    <div className="space-y-4 overflow-y-auto max-h-[400px] pr-2" style={{ scrollbarWidth: 'thin' }}>
      {transactions.length === 0 ? (
        <div className="text-gray-500 text-center">Nenhuma transação encontrada.</div>
      ) : (
        <>
          <TransactionClient transactions={transactions} />

          {/* Elemento observado para o scroll infinito */}
          {hasMore && (
            <div ref={loaderRef} className="h-8 flex justify-center items-center">
              {isLoading ? (
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-green-500"></div>
              ) : (
                <div className="h-4"></div>
              )}
            </div>
          )}

          {/* Mensagem quando não há mais itens */}
          {!hasMore && transactions.length > 0 && (
            <div className="text-xs text-center text-gray-500 py-2">
              {transactions.length === totalCount ? "Fim das transações" : `Mostrando ${transactions.length} de ${totalCount} transações`}
            </div>
          )}
        </>
      )}
    </div>
  );
}
