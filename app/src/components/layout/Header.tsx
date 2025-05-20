"use client";
import { User } from "lucide-react";

interface HeaderProps {
  name?: string;
}

export function Header({ name = "Usuário" }: HeaderProps) {
  return (
    <>
      {/* Mobile Header */}
      <header className="md:hidden bg-[#005566] text-white p-4 flex justify-between items-center">
        <div></div>
        <div className="rounded-full border-2 border-orange-500 p-1">
          <User className="h-6 w-6 text-white" />
        </div>
      </header>

      {/* Desktop Header */}
      <header className="hidden md:flex bg-[#005566] text-white p-4 justify-end items-center">
        <div className="flex items-center gap-2">
          <span>{name}</span>
          <div className="rounded-full border-2 border-orange-500 p-1">
            <User className="h-6 w-6 text-white" />
          </div>
        </div>
      </header>
    </>
  );
}
