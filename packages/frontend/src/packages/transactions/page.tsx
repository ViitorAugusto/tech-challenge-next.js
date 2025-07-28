import { ModuleLoader } from "@/common/loader/ModuleLoader";

interface TransactionsModuleProps {
  host?: string;
}

export default function TransactionsModule({
  host = "http://localhost:3003",
}: TransactionsModuleProps) {
  return (
    <div className="container mx-auto my-8 p-4">
      <h1 className="text-2xl font-bold mb-6">Gerenciamento de Transações</h1>

      <ModuleLoader
        name="transactionsApp"
        host={host}
        fallback={
          <div className="bg-gray-100 p-8 rounded-lg text-center">
            <p className="text-gray-600">
              Carregando gerenciador de transações...
            </p>
          </div>
        }
      />
    </div>
  );
}
