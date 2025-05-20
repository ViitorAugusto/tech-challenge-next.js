"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function TransactionForm() {
  return (
    <div className="bg-gray-300 p-6 md:m-4 md:rounded-lg">
      <h3 className="text-lg font-medium mb-4">Nova transação</h3>

      <div className="space-y-4">
        <Select>
          <SelectTrigger className="w-full bg-white">
            <SelectValue placeholder="Selecione o tipo de transação" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="transferencia">Transferência</SelectItem>
            <SelectItem value="deposito">Depósito</SelectItem>
            <SelectItem value="pagamento">Pagamento</SelectItem>
          </SelectContent>
        </Select>

        <div>
          <p className="mb-2">Valor</p>
          <Input type="text" placeholder="00,00" className="bg-white" />
        </div>

        <Button className="w-full bg-[#005566] hover:bg-[#004455]">
          Concluir transação
        </Button>
      </div>
    </div>
  );
}
