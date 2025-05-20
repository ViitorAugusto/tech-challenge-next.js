export function Sidebar() {
  return (
    <aside className="hidden md:block w-64 bg-white p-6">
      <nav>
        <ul className="space-y-6">
          <li className="py-2 text-green-600 font-medium border-b border-green-500">
            Início
          </li>
          <li className="py-2 border-b border-gray-300">Transferências</li>
          <li className="py-2 border-b border-gray-300">Investimentos</li>
          <li className="py-2 border-b border-gray-300">Outros serviços</li>
        </ul>
      </nav>
    </aside>
  );
}
