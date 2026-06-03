'use client';

import { CardKPI } from '@/components/card-kpi';
import { Smartphone, Clock } from 'lucide-react';

export default function CampoPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">App Operativa de Campo</h1>
        <p className="text-slate-600 mt-1">Interfaz móvil para operarios en campo</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
          <h3 className="text-lg font-bold text-slate-900 mb-4">Carga Rápida de Producción</h3>
          <div className="space-y-3">
            <div className="p-4 bg-slate-50 rounded-lg">
              <p className="text-sm font-medium text-slate-900">Galpón</p>
              <select className="w-full mt-1 px-3 py-2 border border-slate-200 rounded-lg text-sm">
                <option>Galpón 1</option>
                <option>Galpón 2</option>
                <option>Galpón 3</option>
              </select>
            </div>
            <div className="p-4 bg-slate-50 rounded-lg">
              <p className="text-sm font-medium text-slate-900">Cantidad Huevos</p>
              <input type="number" placeholder="0" className="w-full mt-1 px-3 py-2 border border-slate-200 rounded-lg text-sm" />
            </div>
            <button className="w-full px-4 py-3 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 text-sm font-bold">
              Registrar
            </button>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
          <h3 className="text-lg font-bold text-slate-900 mb-4">Registros Recientes</h3>
          <div className="space-y-2">
            <div className="p-3 bg-emerald-50 rounded-lg border border-emerald-200">
              <p className="text-sm font-semibold text-slate-900">Galpón 1 • 27,500 huevos</p>
              <p className="text-xs text-slate-600">Hace 2 horas</p>
            </div>
            <div className="p-3 bg-emerald-50 rounded-lg border border-emerald-200">
              <p className="text-sm font-semibold text-slate-900">Galpón 2 • 39,900 huevos</p>
              <p className="text-xs text-slate-600">Hace 3 horas</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <CardKPI title="Tareas Asignadas" value={5} unit="pendientes" icon={<Smartphone className="w-6 h-6" />} color="blue" />
        <CardKPI title="Alertas en Campo" value={2} unit="requieren atención" icon={<Clock className="w-6 h-6" />} color="orange" />
      </div>
    </div>
  );
}
