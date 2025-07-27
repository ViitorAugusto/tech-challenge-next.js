"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { useTransactionsStore } from "@/redux/store/transactionsStore";
import { Eraser } from "lucide-react";

export function TransactionFilter() {
  const { filter, setFilter, resetFilter } = useTransactionsStore();
  const [showFilters, setShowFilters] = useState(false);

  // Escuta o evento de toggle do botão
  useEffect(() => {
    const handleToggleFilters = (event: CustomEvent) => {
      setShowFilters(event.detail.show);
    };

    // Adicionamos o listener de evento
    window.addEventListener('toggle-filters', handleToggleFilters as EventListener);

    // Limpamos o listener quando o componente for desmontado
    return () => {
      window.removeEventListener('toggle-filters', handleToggleFilters as EventListener);
    };
  }, []);

  // Limpar os filtros
  const clearFilters = () => {
    resetFilter();
    setShowFilters(false);

    // Notificar o botão de toggle que os filtros foram fechados
    const event = new CustomEvent("toggle-filters", {
      detail: { show: false }
    });
    window.dispatchEvent(event);
  };


  return (
    <div className="bg-white rounded-lg mb-4" style={{ display: showFilters ? 'block' : 'none' }}>
      {showFilters && (
        <div className="p-3 border rounded-md bg-gray-50">

          <div className="flex flex-col w-full gap-3">
            <div>
              <div className="flex justify-between items-center mb-3">
                <h3 className="font-medium text-md">Filtros avançados</h3>
                <Button variant="ghost" size="sm" onClick={clearFilters} className="px-0" title="Limpar filtros">
                  <Eraser className="h-4 w-4 stroke-red-400" />
                </Button>
              </div>

              <label className="text-xs font-medium block mb-1">Tipo</label>

              <Select
                value={filter.type || "all"}
                onValueChange={(value) => setFilter({ type: value === 'all' ? null : value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Todos os tipos" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos os tipos</SelectItem>
                  <SelectItem value="deposit">Depósito</SelectItem>
                  <SelectItem value="payment">Pagamento</SelectItem>
                  <SelectItem value="transfer">Transferência</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-xs font-medium block mb-1">Mês</label>
              <Select
                value={filter.month && filter.month !== "" ? filter.month : "all"}
                onValueChange={(value) => setFilter({ month: value === 'all' ? null : value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Todos os meses" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos os meses</SelectItem>
                  <SelectItem value="Janeiro">Janeiro</SelectItem>
                  <SelectItem value="Fevereiro">Fevereiro</SelectItem>
                  <SelectItem value="Março">Março</SelectItem>
                  <SelectItem value="Abril">Abril</SelectItem>
                  <SelectItem value="Maio">Maio</SelectItem>
                  <SelectItem value="Junho">Junho</SelectItem>
                  <SelectItem value="Julho">Julho</SelectItem>
                  <SelectItem value="Agosto">Agosto</SelectItem>
                  <SelectItem value="Setembro">Setembro</SelectItem>
                  <SelectItem value="Outubro">Outubro</SelectItem>
                  <SelectItem value="Novembro">Novembro</SelectItem>
                  <SelectItem value="Dezembro">Dezembro</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="text-xs font-medium block mb-1">Valor mínimo</label>
                <Input
                  type="number"
                  placeholder="R$ 0,00"
                  value={filter.minValue || ''}
                  onChange={(e) => setFilter(({ minValue: e.target.value }))}
                />
              </div>

              <div>
                <label className="text-xs font-medium block mb-1">Valor máximo</label>
                <Input
                  type="number"
                  placeholder="R$ 0,00"
                  value={filter.maxValue || ''}
                  onChange={(e) => setFilter(({ maxValue: e.target.value }))}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
