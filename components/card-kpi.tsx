import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface CardKPIProps {
  title: string;
  value: string | number;
  unit?: string;
  icon: ReactNode;
  color?: 'emerald' | 'blue' | 'red' | 'purple' | 'orange' | 'indigo';
  trend?: string;
  onClick?: () => void;
}

export function CardKPI({
  title,
  value,
  unit,
  icon,
  color = 'emerald',
  trend,
  onClick,
}: CardKPIProps) {
  const colorClasses: Record<string, string> = {
    emerald: 'from-emerald-50 to-emerald-100 text-emerald-600',
    blue: 'from-blue-50 to-blue-100 text-blue-600',
    red: 'from-red-50 to-red-100 text-red-600',
    purple: 'from-purple-50 to-purple-100 text-purple-600',
    orange: 'from-orange-50 to-orange-100 text-orange-600',
    indigo: 'from-indigo-50 to-indigo-100 text-indigo-600',
  };

  return (
    <div
      onClick={onClick}
      className={cn(
        'bg-white rounded-xl border border-slate-200 p-6 shadow-sm hover:shadow-md transition-all',
        onClick && 'cursor-pointer'
      )}
    >
      <div className="flex justify-between items-start mb-4">
        <div>
          <p className="text-sm text-slate-600 font-medium">{title}</p>
          <div className="mt-2">
            <h3 className="text-2xl font-bold text-slate-900">{value}</h3>
            {unit && <p className="text-xs text-slate-500 mt-1">{unit}</p>}
          </div>
        </div>
        <div className={`p-3 rounded-lg bg-gradient-to-br ${colorClasses[color]}`}>{icon}</div>
      </div>
      {trend && (
        <div className="flex items-center gap-2 text-xs">
          <span className="text-emerald-600 font-semibold">{trend}</span>
          <span className="text-slate-500">vs. período anterior</span>
        </div>
      )}
    </div>
  );
}
