"use client";

import { useState, useEffect, useRef } from "react";
import { Transaction } from "@/app/actions";
import { TransactionClient } from "./TransactionClient";

interface TransactionStatementClientProps {
  transactions: Transaction[];
}

export function TransactionStatementClient({ transactions }: TransactionStatementClientProps) {
  // Ordenar transações da mais recente para a mais antiga
  const sortedTransactions = [...transactions].sort((a, b) => {
    try {
      const dateParts = a.creation_date.split(" ");
      const [da, ma, ya] = dateParts[0].split("/").map(Number);
      const timeA = dateParts[1] ? dateParts[1].split(":") : ["0", "0", "0"];

      const datePartsB = b.creation_date.split(" ");
      const [db, mb, yb] = datePartsB[0].split("/").map(Number);
      const timeB = datePartsB[1] ? datePartsB[1].split(":") : ["0", "0", "0"];

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

  // Estado para controlar quantos itens estão visíveis
  const [visibleItems, setVisibleItems] = useState(3);
  const [isLoading, setIsLoading] = useState(false);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const loaderRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // Configurar o observador de interseção apenas se houver mais que 3 transações
    if (sortedTransactions.length <= 3) return;

    // Função para carregar mais itens quando o usuário rolar até o final
    const loadMoreItems = () => {
      setIsLoading(true);
      // Simular um pequeno atraso para mostrar o carregamento
      setTimeout(() => {
        setVisibleItems(prev => 
          Math.min(prev + 3, sortedTransactions.length)
        );
        setIsLoading(false);
      }, 300);
    };

    // Configurar o observer
    observerRef.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && visibleItems < sortedTransactions.length && !isLoading) {
        loadMoreItems();
      }
    }, { threshold: 0.1 });

    // Observar o elemento loader
    const currentLoaderRef = loaderRef.current;
    if (currentLoaderRef) {
      observerRef.current.observe(currentLoaderRef);
    }

    return () => {
      if (observerRef.current && currentLoaderRef) {
        observerRef.current.disconnect();
      }
    };
  }, [sortedTransactions.length, visibleItems, isLoading]);

  // Renderizar apenas os itens visíveis
  const itemsToDisplay = sortedTransactions.slice(0, visibleItems);

  return (
    <div className="space-y-4 overflow-y-auto max-h-[400px] pr-2" style={{ scrollbarWidth: 'thin' }}>
      <TransactionClient transactions={itemsToDisplay} />

      {/* Elemento observado para o scroll infinito */}
      {sortedTransactions.length > 3 && visibleItems < sortedTransactions.length && (
        <div ref={loaderRef} className="h-8 flex justify-center items-center">
          {isLoading ? (
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-green-500"></div>
          ) : (
            <div className="h-4"></div>
          )}
        </div>
      )}

      {/* Mensagem quando não há mais itens */}
      {sortedTransactions.length > 3 && visibleItems >= sortedTransactions.length && (
        <div className="text-xs text-center text-gray-500 py-2">
          Fim das transações
        </div>
      )}
    </div>
  );
}
