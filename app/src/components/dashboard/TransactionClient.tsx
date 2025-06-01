"use client";
import { Edit, Trash, MoreVertical } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Transaction, updateTransaction, deleteTransaction } from "@/app/actions";

interface EditModalProps {
  transaction: Transaction;
  onSave: (updatedTransaction: Transaction) => void;
  onCancel: () => void;
}

function EditModal({ transaction, onSave, onCancel }: EditModalProps) {
  const [editedTransaction, setEditedTransaction] = useState<Transaction>({ ...transaction });

  const formatCurrency = (value: string) => {
    const numericValue = value.replace(/\D/g, '');
    const floatValue = parseFloat(numericValue) / 100;
    return `R$ ${floatValue.toFixed(2).replace('.', ',').replace(/\B(?=(\d{3})+(?!\d))/g, '.')}`;
  };

  const handleValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value.replace(/[^\d]/g, '');
    const formattedValue = rawValue ? formatCurrency(rawValue) : '';

    setEditedTransaction({
      ...editedTransaction,
      value: formattedValue
    });
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div className="bg-white p-6 rounded-lg w-96 max-w-full">
        <h3 className="text-xl font-bold mb-4">Editar Transação</h3>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Tipo de Transação</label>
            <select
              className="w-full rounded-md border border-gray-300 p-2"
              value={`${editedTransaction.type}${editedTransaction.transferSign ? `_${editedTransaction.transferSign}` : ''}`}
              onChange={(e) => {
                const value = e.target.value;
                if (value === 'transfer_add') {
                  setEditedTransaction({ ...editedTransaction, type: 'transfer', transferSign: 'add' });
                } else if (value === 'transfer_sub') {
                  setEditedTransaction({ ...editedTransaction, type: 'transfer', transferSign: 'sub' });
                } else {
                  setEditedTransaction({ ...editedTransaction, type: value, transferSign: undefined });
                }
              }}
            >
              <option value="deposit">Depósito</option>
              <option value="transfer_add">Transferência Recebida</option>
              <option value="transfer_sub">Transferência Enviada</option>
              <option value="payment">Pagamento</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Valor</label>
            <input
              type="text"
              className="w-full rounded-md border border-gray-300 p-2"
              value={editedTransaction.value}
              onChange={handleValueChange}
            />
          </div>
        </div>

        <div className="flex justify-end space-x-2 mt-6">
          <Button variant="outline" onClick={onCancel}>Cancelar</Button>
          <Button onClick={() => onSave(editedTransaction)}>Salvar</Button>
        </div>
      </div>
    </div>
  );
}

const typeMap: Record<string, string> = {
  deposit: "Depósito",
  transfer_add: "Transferência Recebida",
  transfer_sub: "Transferência Enviada",
  payment: "Pagamento",
};

interface TransactionClientProps {
  transactions: Transaction[];
}

export function TransactionClient({ transactions }: TransactionClientProps) {
  const [localTransactions, setLocalTransactions] = useState<Transaction[]>(transactions);
  const [editingTransaction, setEditingTransaction] = useState<Transaction | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setLocalTransactions(transactions);
  }, [transactions]);

  useEffect(() => {
    const handler = () => {
    };

    window.addEventListener("transaction:added", handler);
    window.addEventListener("transaction:updated", handler);
    window.addEventListener("transaction:deleted", handler);

    return () => {
      window.removeEventListener("transaction:added", handler);
      window.removeEventListener("transaction:updated", handler);
      window.removeEventListener("transaction:deleted", handler);
    };
  }, []);

  const handleEdit = (transaction: Transaction) => {
    setEditingTransaction(transaction);
  };

  const handleDelete = async (transactionId: string) => {
    if (!window.confirm("Tem certeza que deseja excluir esta transação?")) {
      return;
    }

    setIsLoading(true);
    try {
      const result = await deleteTransaction(transactionId);

      if (result.success) {
        setLocalTransactions(prev =>
          prev.filter(t => t.id !== transactionId)
        );

        window.dispatchEvent(new CustomEvent("transaction:deleted"));
      } else {
        alert("Ocorreu um erro ao excluir a transação: " + result.error);
      }
    } catch (err) {
      console.error("Erro ao excluir transação:", err);
      alert("Ocorreu um erro ao excluir a transação. Por favor, tente novamente.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveEdit = async (updatedTransaction: Transaction) => {
    setIsLoading(true);
    try {
      const result = await updateTransaction(updatedTransaction);

      if (result.success) {
        setLocalTransactions(prev =>
          prev.map(t => t.id === updatedTransaction.id ? updatedTransaction : t)
        );

        window.dispatchEvent(new CustomEvent("transaction:updated"));
        setEditingTransaction(null);
      } else {
        alert("Ocorreu um erro ao atualizar a transação: " + result.error);
      }
    } catch (err) {
      console.error("Erro ao atualizar transação:", err);
      alert("Ocorreu um erro ao atualizar a transação. Por favor, tente novamente.");
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <div className="text-gray-500 text-center">Carregando...</div>;
  }

  return (
    <>
      {localTransactions.map((transaction, index) => {
        let typeKey = transaction.type;
        if (transaction.type === "transfer" && transaction.transferSign === "add") {
          typeKey = "transfer_add";
        } else if (transaction.type === "transfer" && transaction.transferSign === "sub") {
          typeKey = "transfer_sub";
        }
        const isNegative = transaction.type === "payment" || typeKey === "transfer_sub";

        return (
          <div key={transaction.id || index} className="pb-2 relative">
            <div className="flex justify-between">
              <div className="text-sm font-semibold text-green-600 mb-1">
                {transaction.month}
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="h-8 w-8 p-0">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem
                    className="flex items-center"
                    onClick={() => handleEdit(transaction)}
                  >
                    <Edit className="h-4 w-4 mr-2" /> Editar
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="flex items-center text-red-600"
                    onClick={() => handleDelete(transaction.id)}
                  >
                    <Trash className="h-4 w-4 mr-2" /> Excluir
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <div className="flex justify-between items-center mt-1 mb-3">
              <div className="space-y-2">
                <div className="font-normal text-base">
                  {typeMap[typeKey] || transaction.type}
                </div>
                <div className={cn("text-base font-semibold", isNegative ? "text-red-600" : "")}>
                  {isNegative ? `- ${transaction.value}` : transaction.value}
                </div>
              </div>
              <div className="text-[13px] font-normal text-gray-500 mb-4">
                {transaction.creation_date}
              </div>
            </div>
            <div className="border-b-2 border-green-400 w-[80%]"></div>
          </div>
        );
      })}

      {editingTransaction && (
        <EditModal
          transaction={editingTransaction}
          onSave={handleSaveEdit}
          onCancel={() => setEditingTransaction(null)}
        />
      )}
    </>
  );
}
