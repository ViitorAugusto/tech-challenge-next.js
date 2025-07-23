"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Filter } from "lucide-react";
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

  // Aplicar os filtros
  const applyFilters = () => {
    setFilter({
      ...filter,
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
            value={filter.searchTerm || ''}
            onChange={(e) => {
              setFilter(({  searchTerm: e.target.value }));
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
          { showFilters && (
            
            <div className="mt-3 p-3 border rounded-md bg-gray-50">

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
                    onValueChange={(value) => setFilter({type: value === 'all' ? null :   value })}
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
                    onValueChange={(value) => setFilter({month: value === 'all' ? null :   value })}
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
                      onChange={(e) => setFilter(({  minValue: e.target.value }))}
                    />
                  </div>
                  
                  <div>
                    <label className="text-xs font-medium block mb-1">Valor máximo</label>
                    <Input
                      type="number"
                      placeholder="R$ 0,00"
                      value={filter.maxValue || ''}
                      onChange={(e) => setFilter(({  maxValue: e.target.value }))}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
    </div>
  );
}
