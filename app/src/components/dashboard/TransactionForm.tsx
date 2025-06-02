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
import Image from "next/image";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { addTransaction } from "@/app/actions";

function formatBRL(value: string) {
  let v = value.replace(/\D/g, "");
  if (!v) return "";
  v = (parseInt(v, 10) / 100).toFixed(2);
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

    try {
      const now = new Date();
      const onlyNumbers = value.replace(/\D/g, "");
      const numericValue = onlyNumbers ? parseInt(onlyNumbers, 10) / 100 : 0;
      let transactionType = type;
      const transactionValue = numericValue;

      if (type === "transfer" && transferSign === "sub") {
        transactionType = "payment";
      }

      const transaction = {
        id: uuidv4(),
        type: transactionType,
        month: getMonthName(now),
        creation_date: getTodayBR(),
        value: `R$ ${transactionValue.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
        transferSign: type === "transfer" ? transferSign : undefined
      };

      const result = await addTransaction(transaction);

      if (result.success) {
        setType("");
        setValue("");
        window.dispatchEvent(new Event("transaction:added"));
      } else {
        setError(`Erro ao adicionar transação: ${result.error || 'Falha desconhecida'}`);
      }
    } catch (err) {
      console.error("Erro ao processar transação:", err);
      setError("Ocorreu um erro ao processar sua transação. Tente novamente.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="relative bg-gray-400 p-6 md:m-4 rounded-lg overflow-hidden h-[350px] mx-4">
      <div className="absolute inset-0 z-10 pointer-events-none ">
        <Image
          src="/img/Pixels1.png"
          alt="Pixels Top"
          width={180}
          height={180}
          className="absolute top-0 right-0  z-0"
        />

        <Image
          src="/img/Pixels.png"
          alt="Pixels Bottom"
          width={200}
          height={200}
          className="absolute bottom-0 left-0 "
        />
      </div>

      <div className="relative z-10 w-1/2">
        <h3 className="text-lg font-medium mb-4">Nova transação</h3>
        {error && <div className="text-red-600 text-sm mb-2">{error}</div>}
        <form className="space-y-8" onSubmit={handleSubmit}>
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
    </div>
  );

}
