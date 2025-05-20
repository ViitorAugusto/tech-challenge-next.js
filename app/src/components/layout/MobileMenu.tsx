"use client";
import { X } from "lucide-react";

export function MobileMenu({ onClose }: { onClose: () => void }) {
  return (
    <div className="fixed inset-0 bg-white z-50 md:hidden">
      <div className="flex justify-end p-4">
        <button onClick={onClose} className="text-green-500">
          <X className="h-6 w-6" />
        </button>
      </div>
      <nav className="p-4">
        <ul>
          <li className="py-3 text-orange-500 font-medium border-b border-green-500">
            Início
          </li>
          <li className="py-3 border-b border-gray-300">Transferências</li>
          <li className="py-3 border-b border-gray-300">Investimentos</li>
          <li className="py-3 border-b border-gray-300">Outros serviços</li>
        </ul>
      </nav>
    </div>
  );
}
