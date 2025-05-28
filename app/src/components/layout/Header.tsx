import { useState } from "react";

import { Avatar } from "@/components/ui/avatar";
import { MobileMenu } from "@/components/layout/MobileMenu";

interface HeaderProps {
  name?: string;
}

export function Header({ name = "Joana da Silva Oliveira" }: HeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="flex items-center justify-between p-4 relative bg-[#005566]">
      <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden z-10">
        <div className="w-6 h-0.5 bg-green-500 mb-1.5" />
        <div className="w-6 h-0.5 bg-green-500 mb-1.5" />
        <div className="w-6 h-0.5 bg-green-500" />
      </button>

      <div className="flex-1 hidden md:flex items-center justify-center bg-amber-600" />

      <div>
        <Avatar name={name} />
      </div>

      {menuOpen && <MobileMenu onClose={() => setMenuOpen(false)} />}
    </header>
  );
}
