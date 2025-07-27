"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SpendingAlertConfig } from "./widgetUtils";

interface SpendingAlertWidgetProps {
  id: string;
  config: SpendingAlertConfig;
  currentSpending: number;
  isCustomizing: boolean;
  onUpdate: (config: SpendingAlertConfig) => void;
  onRemove: () => void;
}

export function SpendingAlertWidget({
  config,
  currentSpending,
  isCustomizing,
  onUpdate,
  onRemove,
}: SpendingAlertWidgetProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editConfig, setEditConfig] = useState(config);

  const percentage = (currentSpending / config.limit) * 100;
  const remaining = Math.max(config.limit - currentSpending, 0);
  const isOverLimit = currentSpending > config.limit;
  const isNearLimit = percentage >= 80 && !isOverLimit;

  const handleSave = () => {
    onUpdate(editConfig);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditConfig(config);
    setIsEditing(false);
  };

  // const getAlertColor = () => {
  //   if (isOverLimit) return "red";
  //   if (isNearLimit) return "yellow";
  //   return "green";
  // };

  const getAlertMessage = () => {
    if (isOverLimit) {
      const excess = currentSpending - config.limit;
      return `Limite excedido em R$ ${excess.toLocaleString("pt-BR", {
        minimumFractionDigits: 2,
      })}`;
    }
    if (isNearLimit) {
      return `Atenção! Você já gastou ${percentage.toFixed(1)}% do seu limite`;
    }
    return `Gastos controlados. Restam R$ ${remaining.toLocaleString("pt-BR", {
      minimumFractionDigits: 2,
    })}`;
  };

  if (isEditing) {
    return (
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Título do Alerta
            </label>
            <Input
              value={editConfig.title}
              onChange={e =>
                setEditConfig({ ...editConfig, title: e.target.value })
              }
              placeholder="Ex: Alerta de Gastos Mensais"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Limite de Gastos (R$)
            </label>
            <Input
              type="number"
              value={editConfig.limit}
              onChange={e =>
                setEditConfig({ ...editConfig, limit: Number(e.target.value) })
              }
              placeholder="Ex: 2000"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Categoria
            </label>
            <Select
              value={editConfig.category}
              onValueChange={value =>
                setEditConfig({ ...editConfig, category: value })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Selecione uma categoria" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Todas as categorias">
                  Todas as categorias
                </SelectItem>
                <SelectItem value="Alimentação">Alimentação</SelectItem>
                <SelectItem value="Transporte">Transporte</SelectItem>
                <SelectItem value="Entretenimento">Entretenimento</SelectItem>
                <SelectItem value="Compras">Compras</SelectItem>
                <SelectItem value="Contas">Contas</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex gap-2">
            <Button onClick={handleSave} size="sm">
              Salvar
            </Button>
            <Button onClick={handleCancel} variant="outline" size="sm">
              Cancelar
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`p-6 rounded-xl shadow-sm border relative ${
        isOverLimit
          ? "bg-gradient-to-br from-red-50 to-red-100 border-red-200"
          : isNearLimit
          ? "bg-gradient-to-br from-yellow-50 to-orange-50 border-yellow-200"
          : "bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200"
      }`}
    >
      {/* Botões de customização */}
      {isCustomizing && (
        <div className="absolute top-2 right-2 flex gap-1">
          <Button
            onClick={() => setIsEditing(true)}
            size="sm"
            variant="outline"
            className="w-8 h-8 p-0"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
              />
            </svg>
          </Button>
          <Button
            onClick={onRemove}
            size="sm"
            variant="outline"
            className="w-8 h-8 p-0 text-red-600 hover:text-red-700"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              />
            </svg>
          </Button>
        </div>
      )}

      {/* Cabeçalho do widget */}
      <div className="flex items-center mb-4">
        <div
          className={`w-12 h-12 rounded-full flex items-center justify-center mr-4 ${
            isOverLimit
              ? "bg-gray-600"
              : isNearLimit
              ? "bg-[#007788]"
              : "bg-[#005566]"
          }`}
        >
          <svg
            className="w-6 h-6 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
        </div>
        <div>
          <h3 className="text-lg font-bold text-gray-900">{config.title}</h3>
          <p className="text-sm text-gray-600">{config.category}</p>
        </div>
      </div>

      {/* Indicador de gastos */}
      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <span className="text-sm font-medium text-gray-700">
            Gastos do período
          </span>
          <span
            className={`text-sm font-bold ${
              isOverLimit
                ? "text-gray-600"
                : isNearLimit
                ? "text-[#007788]"
                : "text-[#005566]"
            }`}
          >
            {Math.min(percentage, 100).toFixed(1)}%
          </span>
        </div>

        <div className="w-full bg-gray-200 rounded-full h-3">
          <div
            className={`h-3 rounded-full transition-all duration-500 ${
              isOverLimit
                ? "bg-gradient-to-r from-gray-500 to-gray-600"
                : isNearLimit
                ? "bg-gradient-to-r from-[#007788] to-[#005566]"
                : "bg-gradient-to-r from-[#005566] to-[#007788]"
            }`}
            style={{ width: `${Math.min(percentage, 100)}%` }}
          />
        </div>

        <div className="grid grid-cols-2 gap-4 mt-4">
          <div className="text-center">
            <p className="text-sm text-gray-600">Gasto Atual</p>
            <p
              className={`text-lg font-bold ${
                isOverLimit ? "text-gray-600" : "text-gray-900"
              }`}
            >
              R${" "}
              {currentSpending.toLocaleString("pt-BR", {
                minimumFractionDigits: 2,
              })}
            </p>
          </div>
          <div className="text-center">
            <p className="text-sm text-gray-600">Limite</p>
            <p className="text-lg font-bold text-gray-900">
              R${" "}
              {config.limit.toLocaleString("pt-BR", {
                minimumFractionDigits: 2,
              })}
            </p>
          </div>
        </div>

        {/* Mensagem de status */}
        <div
          className={`mt-4 p-3 rounded-lg border ${
            isOverLimit
              ? "bg-gray-100 border-gray-200"
              : isNearLimit
              ? "bg-[#007788]/10 border-[#007788]/20"
              : "bg-[#005566]/10 border-[#005566]/20"
          }`}
        >
          <div className="flex items-center">
            <svg
              className={`w-5 h-5 mr-2 ${
                isOverLimit
                  ? "text-gray-600"
                  : isNearLimit
                  ? "text-[#007788]"
                  : "text-[#005566]"
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isOverLimit ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              ) : isNearLimit ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              )}
            </svg>
            <span
              className={`font-medium ${
                isOverLimit
                  ? "text-gray-700"
                  : isNearLimit
                  ? "text-[#007788]"
                  : "text-[#005566]"
              }`}
            >
              {getAlertMessage()}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
