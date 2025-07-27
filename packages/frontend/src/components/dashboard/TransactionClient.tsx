"use client";
import { Edit, Trash, MoreVertical } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useEffect, useState, useRef } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Transaction, updateTransaction, deleteTransaction } from "@/app/actions";
import { TransactionFilter } from "./TransactionFilter";
import { useTransactionsStore } from "@/redux/store/transactionsStore";

interface EditModalProps {
  transaction: Transaction;
  onSave: (updatedTransaction: Transaction, receiptFile?: File | null) => void;
  onCancel: () => void;
}

function EditModal({ transaction, onSave, onCancel }: EditModalProps) {
  const [editedTransaction, setEditedTransaction] = useState<Transaction>({ ...transaction });
  const [receiptFile, setReceiptFile] = useState<File | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Formatar o valor monetário
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

    // Validação em tempo real
    if (rawValue === '') {
      setErrors({ ...errors, value: 'O valor é obrigatório' });
    } else if (parseFloat(rawValue) / 100 <= 0) {
      setErrors({ ...errors, value: 'O valor deve ser maior que zero' });
    } else {
      setErrors({ ...errors, value: '' });
    }
  };

  // Validar todo o formulário
  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!editedTransaction.type) {
      newErrors.type = 'O tipo de transação é obrigatório';
    }

    if (!editedTransaction.value) {
      newErrors.value = 'O valor é obrigatório';
    } else {
      const rawValue = editedTransaction.value.replace(/[^\d,]/g, '').replace(',', '.');
      if (parseFloat(rawValue) <= 0) {
        newErrors.value = 'O valor deve ser maior que zero';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Manipular o envio do formulário
  const handleSubmit = () => {
    if (validateForm()) {
      onSave(editedTransaction, receiptFile);
    }
  };

  // Manipular upload de arquivo
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      // Validação de tipo de arquivo
      const file = e.target.files[0];
      const allowedTypes = ['image/jpeg', 'image/png', 'application/pdf'];

      if (!allowedTypes.includes(file.type)) {
        setErrors({ ...errors, file: 'Formato de arquivo inválido. Use JPG, PNG ou PDF.' });
        return;
      }

      // Validação de tamanho (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setErrors({ ...errors, file: 'Arquivo muito grande. O tamanho máximo é 5MB.' });
        return;
      }

      setReceiptFile(file);
      setErrors({ ...errors, file: '' });
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div className="bg-white p-6 rounded-lg w-[500px] max-w-full max-h-[90vh] overflow-y-auto">
        <h3 className="text-xl font-bold mb-4">Editar Transação</h3>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Tipo de Transação</label>
            <select
              className={`w-full rounded-md border ${errors.type ? 'border-red-500' : 'border-gray-300'} p-2`}
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
                // Limpar erro
                setErrors({ ...errors, type: '' });
              }}
            >
              <option value="">Selecione um tipo</option>
              <option value="deposit">Depósito</option>
              <option value="transfer_add">Transferência Recebida</option>
              <option value="transfer_sub">Transferência Enviada</option>
              <option value="payment">Pagamento</option>
            </select>
            {errors.type && <p className="text-red-500 text-xs mt-1">{errors.type}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Valor</label>
            <input
              type="text"
              className={`w-full rounded-md border ${errors.value ? 'border-red-500' : 'border-gray-300'} p-2`}
              value={editedTransaction.value}
              onChange={handleValueChange}
              placeholder="R$ 0,00"
            />
            {errors.value && <p className="text-red-500 text-xs mt-1">{errors.value}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Anexar Comprovante</label>
            <div className="flex items-center gap-2">
              <input
                type="file"
                id="receipt"
                className="hidden"
                accept=".jpg,.jpeg,.png,.pdf"
                onChange={handleFileChange}
              />
              <label
                htmlFor="receipt"
                className="flex-1 cursor-pointer border border-gray-300 rounded-md py-2 px-3 text-sm flex items-center justify-center bg-gray-50 hover:bg-gray-100"
              >
                {receiptFile ? receiptFile.name : "Escolher arquivo"}
              </label>
              {receiptFile && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setReceiptFile(null)}
                >
                  Remover
                </Button>
              )}
            </div>
            {errors.file && <p className="text-red-500 text-xs mt-1">{errors.file}</p>}
            <p className="text-gray-500 text-xs mt-1">
              Formatos aceitos: JPG, PNG, PDF. Tamanho máximo: 5MB.
            </p>
          </div>
        </div>

        <div className="flex justify-end space-x-2 mt-6">
          <Button variant="outline" onClick={onCancel}>Cancelar</Button>
          <Button onClick={handleSubmit}>Salvar</Button>
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
  // Estado do filtro e paginação
  const { filter, setFilter } = useTransactionsStore();
  const [filteredTransactions, setFilteredTransactions] = useState<Transaction[]>([]);
  const [totalPages, setTotalPages] = useState(1);

  // Referência para controle do scroll infinito
  const observerRef = useRef<IntersectionObserver | null>(null);
  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setLocalTransactions(transactions);
  }, [transactions]);

  // Filtrar transações quando os filtros ou transações mudarem
  useEffect(() => {
    let result = [...localTransactions];

    // Aplicar filtro por tipo
    if (filter.type) {
      if (filter.type === 'transfer_add') {
        result = result.filter(t => t.type === 'transfer' && t.transferSign === 'add');
      } else if (filter.type === 'transfer_sub') {
        result = result.filter(t => t.type === 'transfer' && t.transferSign === 'sub');
      } else {
        result = result.filter(t => t.type === filter.type);
      }
    }

    // Aplicar filtro por mês
    if (filter.month) {
      result = result.filter(t => t.month === filter.month);
    }

    // Aplicar filtro por valor mínimo
    if (filter.minValue) {
      const minValue = parseFloat(filter.minValue.replace(/[^\d,]/g, '').replace(',', '.'));
      result = result.filter(t => {
        const value = parseFloat(t.value.replace(/[^\d,]/g, '').replace(',', '.'));
        return value >= minValue;
      });
    }

    // Aplicar filtro por valor máximo
    if (filter.maxValue) {
      const maxValue = parseFloat(filter.maxValue.replace(/[^\d,]/g, '').replace(',', '.'));
      result = result.filter(t => {
        const value = parseFloat(t.value.replace(/[^\d,]/g, '').replace(',', '.'));
        return value <= maxValue;
      });
    }

    // Aplicar filtro por termo de busca
    if (filter.searchTerm) {
      const searchTermLower = filter.searchTerm.toLowerCase();
      result = result.filter(t =>
        t.type.toLowerCase().includes(searchTermLower) ||
        t.month.toLowerCase().includes(searchTermLower) ||
        t.value.toLowerCase().includes(searchTermLower) ||
        t.creation_date.toLowerCase().includes(searchTermLower)
      );
    }

    setFilteredTransactions(result);
    setTotalPages(Math.ceil(result.length / filter.itemsPerPage));
  }, [localTransactions, filter]);

  // Calculamos os itens paginados diretamente no render, então não precisamos desse efeito
  const getDisplayedTransactions = () => {
    const startIndex = 0;
    const endIndex = filter.page * filter.itemsPerPage;
    return filteredTransactions.slice(startIndex, endIndex);
  };

  // Configurar o scroll infinito
  useEffect(() => {
    if (filter.page < totalPages) {
      observerRef.current = new IntersectionObserver(entries => {
        if (entries[0].isIntersecting) {
          setFilter({ page: filter.page + 1 });
        }
      }, { threshold: 1.0 });

      const currentRef = loadMoreRef.current;
      if (currentRef) {
        observerRef.current.observe(currentRef);
      }

      return () => {
        if (observerRef.current && currentRef) {
          observerRef.current.unobserve(currentRef);
        }
      };
    }
  }, [filter.page, totalPages, setFilter]);

  useEffect(() => {
    const handler = () => { };

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

  const handleSaveEdit = async (updatedTransaction: Transaction, receiptFile?: File | null) => {
    setIsLoading(true);
    try {
      // Aqui você enviaria o arquivo para um serviço de armazenamento (como S3, Firebase Storage, etc)
      // e guardaria a URL ou referência do arquivo
      //...

      // Agora atualize a transação
      const result = await updateTransaction(updatedTransaction);

      if (result.success) {
        setLocalTransactions(prev =>
          prev.map(t => t.id === updatedTransaction.id ? updatedTransaction : t)
        );

        window.dispatchEvent(new CustomEvent("transaction:updated"));
        setEditingTransaction(null);

        if (receiptFile) {
          // Mostra mensagem de sucesso do upload
          alert("Transação atualizada e comprovante anexado com sucesso!");
        }
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

  // Função para renderizar transações paginadas
  const displayedTransactions = getDisplayedTransactions();

  if (isLoading) {
    return <div className="text-gray-500 text-center">Carregando...</div>;
  }

  return (
    <>
      <TransactionFilter />

      {filteredTransactions.length === 0 ? (
        <div className="text-gray-500 text-center py-4">
          Nenhuma transação encontrada com os filtros aplicados.
        </div>
      ) : (
        <>
          {displayedTransactions.map((transaction, index) => {
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

          {/* Elemento para observar para scroll infinito */}
          {filter.page < totalPages && (
            <div ref={loadMoreRef} className="py-2 text-center text-gray-500 text-sm">
              Carregando mais transações...
            </div>
          )}
        </>
      )}

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
