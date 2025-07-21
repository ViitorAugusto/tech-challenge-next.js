import * as React from "react";
import Image from "next/image";

export function Tabs() {
  return (
    <div className="w-full px-6 pt-4 hidden md:block lg:hidden">
      <div className="flex items-center justify-start mb-6">
        <Image
          src="/img/logo.png"
          alt="Logo"
          width={80}
          height={24}
          className="object-contain"
        />
      </div>
      <div className="border-b flex gap-4 border-gray-300">
        <button
          value="inicio"
          className="flex-1 pb-2 border-b-2 border-lime-600 text-lime-600"
        >
          Início
        </button>
        <button
          value="transferencias"
          className="flex-1 pb-2 text-gray-300"
          disabled
        >
          Transferências
        </button>
        <button
          value="investimentos"
          className="flex-1 pb-2 text-gray-300"
          disabled
        >
          Investimentos
        </button>
        <button value="outros" className="flex-1 pb-2 text-gray-300" disabled>
          Outros serviços
        </button>
      </div>
    </div>
  );
}
