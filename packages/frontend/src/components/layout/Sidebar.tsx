"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function Sidebar() {
  const pathname = usePathname();

  const menuItems = [
    { name: "Início", href: "/", active: pathname === "/", disabled: false },
    {
      name: "Análise Financeiras",
      href: "/analytics",
      active: pathname === "/analytics",
      disabled: false
    },
    /*     { name: "Transferências", href: "#", active: false, disabled: true },
        { name: "Investimentos", href: "#", active: false, disabled: true },
        { name: "Outros serviços", href: "#", active: false, disabled: true }, */
  ];

  return (
    <aside className="hidden lg:block w-64 bg-white p-6">
      <nav>
        <ul className="space-y-6">
          {menuItems.map(item => (
            <li key={item.name}>
              {item.disabled ? (
                <span className="py-2 border-b border-gray-300 text-gray-300 block cursor-not-allowed">
                  {item.name}
                </span>
              ) : (
                <Link
                  href={item.href}
                  className={`py-2 border-b font-medium block transition-colors ${item.active
                    ? "text-green-600 border-green-500"
                    : "text-gray-700 border-gray-300 hover:text-green-600 hover:border-green-400"
                    }`}
                >
                  {item.name}
                </Link>
              )}
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}
