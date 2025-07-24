import { ModuleLoader } from '@/common/loader/ModuleLoader';

export default function DashboardModule() {
  return (
    <div className="container mx-auto my-8 p-4">
      <h1 className="text-2xl font-bold mb-6">Dashboard Financeiro</h1>

      <ModuleLoader
        name="dashboardApp"
        host="http://localhost:3002"
        fallback={
          <div className="bg-gray-100 p-8 rounded-lg text-center">
            <p className="text-gray-600">Carregando dashboard financeiro...</p>
          </div>
        }
      />
    </div>
  );
}
