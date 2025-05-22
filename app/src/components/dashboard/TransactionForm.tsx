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
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

function formatBRL(value: string) {
  // Remove tudo que não for número
  let v = value.replace(/\D/g, "");
  if (!v) return "";
  // Converte para centavos
  v = (parseInt(v, 10) / 100).toFixed(2);
  // Formata para BRL
  const brl = v
    .replace(".", ",")
    .replace(/(\d)(?=(\d{3})+,)/g, "$1.")
    .replace(/^(\d+),(\d{2})$/, (m, int, dec) => {
      return (
        int.replace(/\B(?=(\d{3})+(?!\d))/g, ".") + "," + dec
      );
    });
  return `R$ ${brl}`;
}

export function TransactionForm() {
  const [type, setType] = useState("");
  const [value, setValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [transferSign, setTransferSign] = useState<"add" | "sub">("add");

  function getMonthName(date: Date) {
    const mes = date.toLocaleString("pt-BR", { month: "long" });
    return mes.charAt(0).toUpperCase() + mes.slice(1);
  }

  function getTodayBR() {
    const d = new Date();
    const day = String(d.getDate()).padStart(2, "0");
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const year = String(d.getFullYear()).slice(-2);
    const hours = String(d.getHours()).padStart(2, "0");
    const minutes = String(d.getMinutes()).padStart(2, "0");
    const seconds = String(d.getSeconds()).padStart(2, "0");
    return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
  }

  const handleTypeChange = (val: string) => {
    setType(val);
    if (val && value) setError("");
    else if (!val) setError("Preencha o tipo e o valor da transação.");
  };

  const handleValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    if (type && e.target.value) setError("");
    else if (!e.target.value) setError("Preencha o tipo e o valor da transação.");
  };

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!type || !value) {
      setError("Preencha o tipo e o valor da transação.");
      return;
    }
    setError("");
    setLoading(true);
    const now = new Date();
    const onlyNumbers = value.replace(/\D/g, "");
    const numericValue = onlyNumbers ? parseInt(onlyNumbers, 10) / 100 : 0;
    let transactionType = type;
    const transactionValue = numericValue;
    // Se for transferência subtrativa, salva como payment
    if (type === "transfer" && transferSign === "sub") {
      transactionType = "payment";
    }
    const transaction = {
      id: uuidv4(),
      type: transactionType,
      month: getMonthName(now),
      creation_date: getTodayBR(),
      value: `R$ ${transactionValue.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
    };
    // Busca o usuário atual (id 1)
    const res = await fetch("http://localhost:3001/users/1");
    const user = await res.json();
    // Adiciona a transação ao array existente
    const updatedTransactions = [...(user.transactions || []), transaction];
    // Atualiza o usuário
    await fetch("http://localhost:3001/users/1", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ transactions: updatedTransactions }),
    });
    // Dispara evento global para atualizar extrato
    window.dispatchEvent(new Event("transaction:added"));
    setType("");
    setValue("");
    setLoading(false);
  }

  return (
    <div className="bg-gray-300 p-6 md:m-4 md:rounded-lg">
      <h3 className="text-lg font-medium mb-4">Nova transação</h3>
      {error && (
        <div className="text-red-600 text-sm mb-2">{error}</div>
      )}
      <form className="space-y-4" onSubmit={handleSubmit}>
        <Select value={type} onValueChange={handleTypeChange}>
          <SelectTrigger className="w-full bg-white">
            <SelectValue placeholder="Selecione o tipo de transação" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="transfer">Transferência</SelectItem>
            <SelectItem value="deposit">Depósito</SelectItem>
            <SelectItem value="payment">Pagamento</SelectItem>
          </SelectContent>
        </Select>
        {type === "transfer" && (
          <div className="flex items-center gap-2">
            <label className="text-sm">Tipo de transferência:</label>
            <select
              className="bg-white border rounded px-2 py-1 text-sm"
              value={transferSign}
              onChange={e => setTransferSign(e.target.value as "add" | "sub")}
            >
              <option value="add">Recebida</option>
              <option value="sub">Enviada</option>
            </select>
          </div>
        )}
        <div>
          <p className="mb-2">Valor</p>
          <Input
            type="text"
            placeholder="R$ 00,00"
            className="bg-white"
            value={formatBRL(value)}
            onChange={handleValueChange}
            inputMode="numeric"
            maxLength={12}
          />
        </div>
        <Button
          className="w-full bg-[#005566] hover:bg-[#004455]"
          type="submit"
          disabled={loading}
        >
          {loading ? "Salvando..." : "Concluir transação"}
        </Button>
      </form>
    </div>
  );
}
