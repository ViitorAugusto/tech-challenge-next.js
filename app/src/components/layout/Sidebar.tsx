export function Sidebar() {
  return (
    <aside className="hidden lg:block w-64 bg-white p-6">
      <nav>
        <ul className="space-y-6">
          <li className="py-2 text-green-600 font-medium border-b border-green-500">
            Início
          </li>
          <li className="py-2 border-b border-gray-300 text-gray-300" aria-disabled>Transferências</li>
          <li className="py-2 border-b border-gray-300 text-gray-300" aria-disabled>Investimentos</li>
          <li className="py-2 border-b border-gray-300 text-gray-300" aria-disabled>Outros serviços</li>
        </ul>
      </nav>
    </aside>
  );
}
