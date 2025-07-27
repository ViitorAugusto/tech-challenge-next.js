"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Filter } from "lucide-react";
import { useTransactionsStore } from "@/redux/store/transactionsStore";

export function FilterToggleButton() {
  const { filter } = useTransactionsStore();
  const [showFilters, setShowFilters] = useState(false);

  // Função para alternar a visibilidade dos filtros
  const toggleFilters = () => {
    // Disparamos um evento personalizado para comunicar com o componente TransactionFilter
    const event = new CustomEvent("toggle-filters", {
      detail: { show: !showFilters }
    });
    window.dispatchEvent(event);
    setShowFilters(!showFilters);
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleFilters}
      className={`ml-2 p-1 h-8 w-8 ${showFilters ? "bg-gray-100" : ""} ${(filter.type || filter.month || filter.minValue || filter.maxValue)
          ? "text-green-600 hover:text-green-700"
          : ""
        }`}
      title="Filtrar transações"
    >
      <Filter className="h-4 w-4" />
    </Button>
  );
}
