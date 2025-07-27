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
    <header className="flex items-center justify-between p-2 relative bg-[#005566]">
      <div className="flex items-center">
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden z-10 mr-3"
        >
          <div className="w-6 h-0.5 bg-green-500 mb-1.5" />
          <div className="w-6 h-0.5 bg-green-500 mb-1.5" />
          <div className="w-6 h-0.5 bg-green-500" />
        </button>

        <div className="hidden md:flex items-end">
          <Image
            src="/img/logo.png"
            alt="Logo"
            width={36}
            height={36}
            className="object-contain cursor-pointer"
          />
          <h1 className="text-white text-2xl font-bold ml-4">Prime Bank</h1>
        </div>
      </div>

      <div>
        <Avatar name={name} />
      </div>

      {menuOpen && <MobileMenu onClose={() => setMenuOpen(false)} />}
    </header>
  );
}
