import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { TrendingUp } from 'lucide-react';

const data = [
  { stage: 'None', count: 450, color: '#10b981' },
  { stage: 'Mild', count: 180, color: '#eab308' },
  { stage: 'Moderate', count: 95, color: '#f97316' },
  { stage: 'Severe', count: 42, color: '#ef4444' },
  { stage: 'PDR', count: 28, color: '#dc2626' },
];

export function StatisticsPanel() {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <div className="flex items-center gap-3 mb-6">
        <TrendingUp className="w-5 h-5 text-blue-600" />
        <div>
          <h3 className="font-semibold text-gray-900">Detection Statistics</h3>
          <p className="text-xs text-gray-500">Sample distribution from clinical studies</p>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={200}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis 
            dataKey="stage" 
            tick={{ fontSize: 12 }} 
            stroke="#6b7280"
          />
          <YAxis 
            tick={{ fontSize: 12 }} 
            stroke="#6b7280"
          />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: '#fff', 
              border: '1px solid #e5e7eb',
              borderRadius: '8px',
              fontSize: '12px'
            }} 
          />
          <Bar dataKey="count" radius={[8, 8, 0, 0]}>
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>

      <div className="mt-4 pt-4 border-t border-gray-200">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-2xl font-semibold text-gray-900">795</div>
            <div className="text-xs text-gray-500">Total Scans</div>
          </div>
          <div>
            <div className="text-2xl font-semibold text-green-600">95.2%</div>
            <div className="text-xs text-gray-500">Accuracy</div>
          </div>
          <div>
            <div className="text-2xl font-semibold text-blue-600">2.3s</div>
            <div className="text-xs text-gray-500">Avg Time</div>
          </div>
        </div>
      </div>
    </div>
  );
}
