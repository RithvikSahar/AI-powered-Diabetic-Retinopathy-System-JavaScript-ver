import { Activity, Info } from 'lucide-react';

export function Header() {
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-blue-600 p-2 rounded-lg">
              <Activity className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-semibold text-gray-900">
                DR Vision AI
              </h1>
              <p className="text-sm text-gray-500">
                Diabetic Retinopathy Detection System
              </p>
            </div>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
            <Info className="w-4 h-4" />
            About
          </button>
        </div>
      </div>
    </header>
  );
}
