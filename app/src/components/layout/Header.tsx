"use client";
import { useState } from "react";
import Image from "next/image";

import { Avatar } from "@/components/ui/avatar";
import { MobileMenu } from "@/components/layout/MobileMenu";

interface HeaderProps {
  name?: string;
}

export function Header({ name = "Joana da Silva Oliveira" }: HeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="flex items-center justify-between p-4 relative bg-[#005566]">
      <div className="flex items-center">
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden z-10 mr-3"
        >
          <div className="w-6 h-0.5 bg-green-500 mb-1.5" />
          <div className="w-6 h-0.5 bg-green-500 mb-1.5" />
          <div className="w-6 h-0.5 bg-green-500" />
        </button>

        <div className="hidden md:flex items-center ">
          <Image
            src="/img/logo.png"
            alt="Logo"
            width={80}
            height={80}
            className="object-contain curosr-pointer"
          />
        </div>
      </div>

      <div>
        <Avatar name={name} />
      </div>

      {menuOpen && <MobileMenu onClose={() => setMenuOpen(false)} />}
    </header>
  );
}
