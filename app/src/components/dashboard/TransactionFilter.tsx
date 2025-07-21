"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Filter, X } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { useTransactionsStore } from "@/redux/store/transactionsStore";

export function TransactionFilter() {
  const { filter, setFilter, resetFilter } = useTransactionsStore();
  const [showFilters, setShowFilters] = useState(false);

  // Estado local para os inputs
  const [localFilter, setLocalFilter] = useState({
    searchTerm: filter.searchTerm,
    type: filter.type,
    month: filter.month,
    minValue: filter.minValue,
    maxValue: filter.maxValue
  });

  // Atualizar o estado local quando o filtro global mudar
  useEffect(() => {
    setLocalFilter({
      searchTerm: filter.searchTerm,
      type: filter.type,
      month: filter.month,
      minValue: filter.minValue,
      maxValue: filter.maxValue
    });
  }, [filter]);

  // Aplicar os filtros
  const applyFilters = () => {
    setFilter({
      ...localFilter,
      page: 1 // Reset para a primeira página ao filtrar
    });
  };

  // Limpar os filtros
  const clearFilters = () => {
    resetFilter();
    setShowFilters(false);
  };

  return (
    <div className="bg-white p-4 rounded-lg mb-4">
      <div className="flex items-center gap-2">
        <div className="flex-1 relative">
          <Input
            type="text"
            placeholder="Buscar transações..."
            value={localFilter.searchTerm || ''}
            onChange={(e) => {
              setLocalFilter(prev => ({ ...prev, searchTerm: e.target.value }));
              if (e.target.value === '') {
                setFilter({ searchTerm: '' });
              }
            }}
            className="pl-9"
            onKeyDown={(e) => {
              if (e.key === 'Enter') applyFilters();
            }}
          />
          <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
        </div>

        <Button
          variant="outline"
          size="icon"
          onClick={() => setShowFilters(!showFilters)}
          className={showFilters ? "bg-gray-100" : ""}
        >
          <Filter className="h-4 w-4" />
        </Button>

        <Button onClick={applyFilters}>Buscar</Button>
      </div>

      {showFilters && (
        <div className="mt-3 p-3 border rounded-md bg-gray-50">
          <div className="flex justify-between items-center mb-3">
            <h3 className="font-medium">Filtros avançados</h3>
            <Button variant="ghost" size="sm" onClick={clearFilters}>
              <X className="h-4 w-4 mr-1" /> Limpar filtros
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div>
              <label className="text-sm font-medium block mb-1">Tipo</label>
              <Select
                value={localFilter.type || "all"}
                onValueChange={(value) => setLocalFilter(prev => ({ ...prev, type: value || null }))}
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
              <label className="text-sm font-medium block mb-1">Mês</label>
              <Select
                value={localFilter.type && localFilter.type !== "" ? localFilter.type : "all"}
                onValueChange={(value) => setLocalFilter(prev => ({ ...prev, month: value || null }))}
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
                <label className="text-sm font-medium block mb-1">Valor mínimo</label>
                <Input
                  type="text"
                  placeholder="R$ 0,00"
                  value={localFilter.minValue || ''}
                  onChange={(e) => setLocalFilter(prev => ({ ...prev, minValue: e.target.value || null }))}
                />
              </div>
              <div>
                <label className="text-sm font-medium block mb-1">Valor máximo</label>
                <Input
                  type="text"
                  placeholder="R$ 0,00"
                  value={localFilter.maxValue || ''}
                  onChange={(e) => setLocalFilter(prev => ({ ...prev, maxValue: e.target.value || null }))}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
