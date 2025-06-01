"use client";

import { useState } from "react";
import { MobileMenu } from "@/components/layout/MobileMenu";

export function ClientBankingWrapper() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      {menuOpen && <MobileMenu onClose={() => setMenuOpen(false)} />}

      <button
        onClick={() => setMenuOpen(!menuOpen)}
        className="absolute top-4 left-4 md:hidden z-10"
      >
        <div className="w-6 h-0.5 bg-green-500 mb-1.5" />
        <div className="w-6 h-0.5 bg-green-500 mb-1.5" />
        <div className="w-6 h-0.5 bg-green-500" />
      </button>
    </>
  );
}
