"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SavingsGoalConfig } from "./widgetUtils";

interface SavingsGoalWidgetProps {
  id: string;
  config: SavingsGoalConfig;
  currentAmount: number;
  isCustomizing: boolean;
  onUpdate: (config: SavingsGoalConfig) => void;
  onRemove: () => void;
}

export function SavingsGoalWidget({
  id,
  config,
  currentAmount,
  isCustomizing,
  onUpdate,
  onRemove,
}: SavingsGoalWidgetProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editConfig, setEditConfig] = useState(config);

  const progress = Math.min((currentAmount / config.target) * 100, 100);
  const remaining = Math.max(config.target - currentAmount, 0);

  const handleSave = () => {
    onUpdate(editConfig);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditConfig(config);
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Título da Meta
            </label>
            <Input
              value={editConfig.title}
              onChange={e =>
                setEditConfig({ ...editConfig, title: e.target.value })
              }
              placeholder="Ex: Viagem para Europa"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Valor da Meta (R$)
            </label>
            <Input
              type="number"
              value={editConfig.target}
              onChange={e =>
                setEditConfig({ ...editConfig, target: Number(e.target.value) })
              }
              placeholder="Ex: 5000"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Descrição
            </label>
            <Input
              value={editConfig.description}
              onChange={e =>
                setEditConfig({ ...editConfig, description: e.target.value })
              }
              placeholder="Ex: Economia para viagem dos sonhos"
            />
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
    <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-xl shadow-sm border border-green-100 relative">
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
        <div className="w-12 h-12 bg-[#005566] rounded-full flex items-center justify-center mr-4">
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
              d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
            />
          </svg>
        </div>
        <div>
          <h3 className="text-lg font-bold text-gray-900">{config.title}</h3>
          <p className="text-sm text-gray-600">{config.description}</p>
        </div>
      </div>

      {/* Progresso da meta */}
      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <span className="text-sm font-medium text-gray-700">Progresso</span>
          <span className="text-sm font-bold text-[#005566]">
            {progress.toFixed(1)}%
          </span>
        </div>

        <div className="w-full bg-gray-200 rounded-full h-3">
          <div
            className="bg-gradient-to-r from-green-500 to-emerald-600 h-3 rounded-full transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="grid grid-cols-2 gap-4 mt-4">
          <div className="text-center">
            <p className="text-sm text-gray-600">Economizado</p>
            <p className="text-lg font-bold text-[#005566]">
              R${" "}
              {currentAmount.toLocaleString("pt-BR", {
                minimumFractionDigits: 2,
              })}
            </p>
          </div>
          <div className="text-center">
            <p className="text-sm text-gray-600">Faltam</p>
            <p className="text-lg font-bold text-gray-900">
              R${" "}
              {remaining.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
            </p>
          </div>
        </div>

        {/* Status da meta */}
        {progress >= 100 ? (
          <div className="mt-4 p-3 bg-[#005566]/10 border border-[#005566]/20 rounded-lg">
            <div className="flex items-center">
              <svg
                className="w-5 h-5 text-green-600 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span className="text-[#005566] font-medium">
                Meta alcançada! 🎉
              </span>
            </div>
          </div>
        ) : progress >= 75 ? (
          <div className="mt-4 p-3 bg-[#007788]/10 border border-[#007788]/20 rounded-lg">
            <div className="flex items-center">
              <svg
                className="w-5 h-5 text-yellow-600 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
              <span className="text-[#007788] font-medium">
                Quase lá! Continue assim!
              </span>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}
