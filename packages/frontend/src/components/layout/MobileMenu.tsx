"use client";
import { X as CloseIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function MobileMenu({ onClose }: { onClose: () => void }) {
  const pathname = usePathname();

  // Mesmas opções da Sidebar
  const menuItems = [
    { name: "Início", href: "/", active: pathname === "/", disabled: false },
    {
      name: "Análises Financeiras",
      href: "/analytics",
      active: pathname === "/analytics",
      disabled: false
    },
  ];

  return (
    <div className="fixed inset-0 bg-white z-50 md:hidden">
      <div className="flex justify-end p-4">
        <button onClick={onClose} className="text-green-500">
          <CloseIcon className="h-6 w-6" />
        </button>
      </div>
      <nav className="p-4">
        <ul>
          {menuItems.map((item) => (
            <li key={item.name}>
              {item.disabled ? (
                <span className="py-3 block border-b border-gray-300 text-gray-300 cursor-not-allowed">
                  {item.name}
                </span>
              ) : (
                <Link
                  href={item.href}
                  onClick={onClose}
                  className={`py-3 block border-b font-medium ${item.active
                    ? "text-green-600 border-green-500"
                    : "text-gray-700 border-gray-300 hover:text-green-600"
                    }`}
                >
                  {item.name}
                </Link>
              )}
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
