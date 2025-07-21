"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Transaction } from "@/app/actions";
import {
  calculateTotalIncome,
  calculateTotalExpenses,
  getDefaultWidgets,
  SavingsGoalConfig,
  SpendingAlertConfig,
} from "./widgets/widgetUtils";
import { SavingsGoalWidget } from "./widgets/SavingsGoalWidget";
import { SpendingAlertWidget } from "./widgets/SpendingAlertWidget";

interface Widget {
  id: string;
  type: "savings-goal" | "spending-alert";
  config: SavingsGoalConfig | SpendingAlertConfig;
  enabled: boolean;
}

interface DashboardCustomizationProps {
  transactions: Transaction[];
}

export function DashboardCustomization({
  transactions,
}: DashboardCustomizationProps) {
  const [widgets, setWidgets] = useState<Widget[]>([]);
  const [isCustomizing, setIsCustomizing] = useState(false);
  const [showAddWidget, setShowAddWidget] = useState(false);

  // Carregar widgets salvos no localStorage
  useEffect(() => {
    const savedWidgets = localStorage.getItem("dashboard-widgets");
    if (savedWidgets) {
      setWidgets(JSON.parse(savedWidgets));
    } else {
      // Widgets padrão
      setWidgets([
        {
          id: "savings-1",
          type: "savings-goal",
          config: {
            title: "Meta de Economia",
            target: 5000,
            description: "Economia para viagem",
          },
          enabled: true,
        },
        {
          id: "alert-1",
          type: "spending-alert",
          config: {
            title: "Alerta de Gastos",
            limit: 2000,
            category: "Todas as categorias",
          },
          enabled: true,
        },
      ]);
    }
  }, []);

  // Salvar widgets no localStorage
  const saveWidgets = (newWidgets: Widget[]) => {
    setWidgets(newWidgets);
    localStorage.setItem("dashboard-widgets", JSON.stringify(newWidgets));
  };

  const toggleWidget = (widgetId: string) => {
    const updatedWidgets = widgets.map(widget =>
      widget.id === widgetId ? { ...widget, enabled: !widget.enabled } : widget
    );
    saveWidgets(updatedWidgets);
  };

  const updateWidget = (
    widgetId: string,
    config: Partial<Widget["config"]>
  ) => {
    const updatedWidgets = widgets.map(widget =>
      widget.id === widgetId
        ? { ...widget, config: { ...widget.config, ...config } }
        : widget
    );
    saveWidgets(updatedWidgets);
  };

  const addWidget = (type: "savings-goal" | "spending-alert") => {
    const newWidget: Widget = {
      id: `${type}-${Date.now()}`,
      type,
      config:
        type === "savings-goal"
          ? {
              title: "Nova Meta",
              target: 1000,
              description: "Descrição da meta",
            }
          : {
              title: "Novo Alerta",
              limit: 1000,
              category: "Todas as categorias",
            },
      enabled: true,
    };
    saveWidgets([...widgets, newWidget]);
    setShowAddWidget(false);
  };

  const removeWidget = (widgetId: string) => {
    const updatedWidgets = widgets.filter(widget => widget.id !== widgetId);
    saveWidgets(updatedWidgets);
  };

  // Calcular total de receitas para metas de economia
  const totalIncome = transactions
    .filter(
      t =>
        t.type === "deposit" ||
        (t.type === "transfer" && t.transferSign === "add")
    )
    .reduce(
      (sum, t) =>
        sum + parseFloat(t.value.replace(/[^\d,]/g, "").replace(",", ".")),
      0
    );

  // Calcular total de despesas para alertas
  const totalExpenses = transactions
    .filter(
      t =>
        t.type === "payment" ||
        (t.type === "transfer" && t.transferSign === "sub")
    )
    .reduce(
      (sum, t) =>
        sum + parseFloat(t.value.replace(/[^\d,]/g, "").replace(",", ".")),
      0
    );

  const renderWidget = (widget: Widget) => {
    if (!widget.enabled) return null;

    switch (widget.type) {
      case "savings-goal":
        return (
          <SavingsGoalWidget
            key={widget.id}
            id={widget.id}
            config={widget.config as SavingsGoalConfig}
            currentAmount={totalIncome - totalExpenses}
            isCustomizing={isCustomizing}
            onUpdate={(config: SavingsGoalConfig) =>
              updateWidget(widget.id, config)
            }
            onRemove={() => removeWidget(widget.id)}
          />
        );
      case "spending-alert":
        return (
          <SpendingAlertWidget
            key={widget.id}
            id={widget.id}
            config={widget.config as SpendingAlertConfig}
            currentSpending={totalExpenses}
            isCustomizing={isCustomizing}
            onUpdate={(config: SpendingAlertConfig) =>
              updateWidget(widget.id, config)
            }
            onRemove={() => removeWidget(widget.id)}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header de personalização */}
      <div className="flex items-center justify-between bg-white p-4 rounded-lg shadow-sm border border-gray-200">
        <div>
          <h2 className="text-xl font-bold text-gray-900">
            Widgets Personalizados
          </h2>
          <p className="text-gray-600">
            Configure seus widgets de metas e alertas
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            variant={isCustomizing ? "default" : "outline"}
            onClick={() => setIsCustomizing(!isCustomizing)}
            className="flex items-center gap-2"
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
                d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
            {isCustomizing ? "Finalizar" : "Personalizar"}
          </Button>
          {isCustomizing && (
            <Button
              onClick={() => setShowAddWidget(!showAddWidget)}
              className="flex items-center gap-2"
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
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                />
              </svg>
              Adicionar Widget
            </Button>
          )}
        </div>
      </div>

      {/* Menu de adicionar widget */}
      {showAddWidget && (
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold mb-4">Adicionar Novo Widget</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Button
              onClick={() => addWidget("savings-goal")}
              className="p-6 h-auto flex flex-col items-center gap-3 bg-gradient-to-r from-[#005566] to-[#007788] hover:from-[#004455] hover:to-[#006677] text-white"
            >
              <svg
                className="w-8 h-8"
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
              <div className="text-center">
                <div className="font-semibold">Meta de Economia</div>
                <div className="text-sm opacity-90">
                  Defina e acompanhe suas metas financeiras
                </div>
              </div>
            </Button>
            <Button
              onClick={() => addWidget("spending-alert")}
              className="p-6 h-auto flex flex-col items-center gap-3 bg-gradient-to-r from-[#007788] to-[#005566] hover:from-[#006677] hover:to-[#004455] text-white"
            >
              <svg
                className="w-8 h-8"
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
              <div className="text-center">
                <div className="font-semibold">Alerta de Gastos</div>
                <div className="text-sm opacity-90">
                  Monitore seus gastos e receba alertas
                </div>
              </div>
            </Button>
          </div>
        </div>
      )}

      {/* Lista de controle de widgets (modo personalização) */}
      {isCustomizing && (
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold mb-4">Gerenciar Widgets</h3>
          <div className="space-y-2">
            {widgets.map(widget => (
              <div
                key={widget.id}
                className="flex items-center justify-between p-3 border rounded-lg"
              >
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={widget.enabled}
                    onChange={() => toggleWidget(widget.id)}
                    className="w-4 h-4 text-blue-600 rounded"
                  />
                  <div>
                    <div className="font-medium">{widget.config.title}</div>
                    <div className="text-sm text-gray-500">
                      {widget.type === "savings-goal"
                        ? "Meta de Economia"
                        : "Alerta de Gastos"}
                    </div>
                  </div>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => removeWidget(widget.id)}
                  className="text-red-600 hover:text-red-700"
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
            ))}
          </div>
        </div>
      )}

      {/* Renderizar widgets ativos */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {widgets.map(renderWidget)}
      </div>
    </div>
  );
}
