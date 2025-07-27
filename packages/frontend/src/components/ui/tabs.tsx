"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function Tabs() {
  const pathname = usePathname();

  // Mesmas opções da Sidebar
  const tabItems = [
    { name: "Início", href: "/", active: pathname === "/" },
    { name: "Análises Financeiras", href: "/analytics", active: pathname === "/analytics" }
  ];

  return (
    <div className="w-full px-6 pt-4 hidden md:block lg:hidden">
      <div className="border-b flex gap-4 border-gray-300">
        {tabItems.map((tab) => (
          <Link
            key={tab.name}
            href={tab.href}
            className={`flex-1 pb-2 border-b-2 text-center ${tab.active
                ? "border-green-600 text-green-600"
                : "border-transparent text-gray-600 hover:text-green-600 hover:border-green-400"
              }`}
          >
            {tab.name}
          </Link>
        ))}
      </div>
    </div>
  );
}
