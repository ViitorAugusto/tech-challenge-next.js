"use client";

import React, { useEffect, useRef, ReactNode } from "react";

interface MicroFrontendProps {
  name: string;
  host: string;
  containerId?: string;
  fallback?: ReactNode;
}

/**
 * Componente que carrega e renderiza um micro-frontend
 */
export function MicroFrontend({
  name,
  host,
  containerId = `${name}-container`,
  fallback = <div>Carregando micro-frontend...</div>,
}: MicroFrontendProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<Error | null>(null);

  useEffect(() => {
    // Salvar uma referência ao container atual
    const container = containerRef.current;

    // Verificar se o script já foi carregado
    const scriptId = `micro-frontend-script-${name}`;
    const existingScript = document.getElementById(scriptId);

    if (!existingScript) {
      const script = document.createElement("script");
      script.id = scriptId;
      script.crossOrigin = "";
      script.src = `${host}/remoteEntry.js`;
      script.onerror = () => {
        setError(new Error(`Falha ao carregar o script do microfrontend ${name}`));
        setLoading(false);
      };

      script.onload = () => {
        // Depois que o script é carregado, inicialize o microfrontend
        // @ts-expect-error - A variável global window[name] é definida pelo script carregado
        if (window[name]) {
          try {
            // @ts-expect-error - Chamando função init do microfrontend
            window[name].init(container);
            setLoading(false);
          } catch (err) {
            setError(err instanceof Error ? err : new Error(`Erro ao inicializar o microfrontend ${name}`));
            setLoading(false);
          }
        } else {
          setError(new Error(`Microfrontend ${name} não exportou uma função init`));
          setLoading(false);
        }
      };

      document.head.appendChild(script);
    } else {
      // Se o script já estiver carregado, apenas inicialize o microfrontend
      try {
        // @ts-expect-error - Chamando função init do microfrontend já carregado
        window[name].init(container);
        setLoading(false);
      } catch (err) {
        setError(err instanceof Error ? err : new Error(`Erro ao inicializar o microfrontend ${name}`));
        setLoading(false);
      }
    }

    return () => {
      // Cleanup: Desmontar o microfrontend quando o componente é desmontado
      try {
        // @ts-expect-error - Verificando a existência da função de desmontagem
        if (window[name] && typeof window[name].unmount === "function") {
          // @ts-expect-error - Chamando função de desmontagem do microfrontend
          window[name].unmount(container);
        }
      } catch (err) {
        console.error(`Erro ao desmontar o microfrontend ${name}:`, err);
      }
    };
  }, [name, host]);

  return (
    <>
      {loading && fallback}
      {error && <div className="text-red-500">Erro ao carregar o microfrontend: {error.message}</div>}
      <div ref={containerRef} id={containerId} />
    </>
  );
}
