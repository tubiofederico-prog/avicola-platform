'use client';

import { CardKPI } from '@/components/card-kpi';
import { sensores } from '@/lib/mock-data';
import { Zap, Plus } from 'lucide-react';

export default function IntegracionesPage() {
  const conectados = sensores.filter(s => s.estado === 'Conectado').length;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Integraciones IoT</h1>
          <p className="text-slate-600 mt-1">Gestión de sensores y dispositivos conectados</p>
        </div>
        <button className="px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 text-sm font-medium flex items-center gap-2">
          <Plus className="w-4 h-4" /> Agregar Sensor
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <CardKPI title="Sensores Total" value={sensores.length} unit="dispositivos" icon={<Zap className="w-6 h-6" />} color="blue" />
        <CardKPI title="Conectados" value={conectados} unit="activos" icon={<Zap className="w-6 h-6" />} color="emerald" />
        <CardKPI title="Desconectados" value={sensores.filter(s => s.estado === 'Desconectado').length} unit="requieren atención" icon={<Zap className="w-6 h-6" />} color="red" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {sensores.map((sensor) => (
          <div key={sensor.id} className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
            <div className="flex justify-between items-start mb-3">
              <h3 className="font-semibold text-slate-900">{sensor.tipo}</h3>
              <span className={`text-xs font-bold px-2 py-1 rounded ${
                sensor.estado === 'Conectado' 
                  ? 'bg-emerald-100 text-emerald-700' 
                  : 'bg-red-100 text-red-700'
              }`}>
                {sensor.estado}
              </span>
            </div>
            <p className="text-sm text-slate-600 mb-2">{sensor.galpone}</p>
            <p className="text-2xl font-bold text-slate-900 mb-2">{sensor.ultimaLectura}
              <span className="text-sm text-slate-600 ml-2">
                {sensor.tipo === 'Temperatura' ? '°C' : sensor.tipo === 'Alimento' ? 'kg' : 'L'}
              </span>
            </p>
            <p className="text-xs text-slate-500">Última lectura: {sensor.fecha}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
