'use client';

import { Tabs } from '@/components/tabs';
import { CardKPI } from '@/components/card-kpi';
import { galpones } from '@/lib/mock-data';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { Thermometer } from 'lucide-react';

const temperaturaDatos = [
  { hora: '00:00', G1: 21, G2: 23, G3: 25, G4: 20 },
  { hora: '04:00', G1: 20, G2: 22, G3: 24, G4: 19 },
  { hora: '08:00', G1: 22, G2: 24, G3: 26, G4: 21 },
  { hora: '12:00', G1: 23, G2: 25, G3: 27, G4: 22 },
  { hora: '16:00', G1: 22, G2: 24, G3: 26, G4: 21 },
  { hora: '20:00', G1: 21, G2: 23, G3: 25, G4: 20 },
];

const consumoDatos = [
  { galpone: 'G1', alimento: 45, agua: 65 },
  { galpone: 'G2', alimento: 68, agua: 98 },
  { galpone: 'G3', alimento: 92, agua: 132 },
  { galpone: 'G4', alimento: 38, agua: 55 },
];

export default function AmbientalPage() {
  const tabs = [
    {
      id: 'resumen',
      label: 'Resumen Ambiental',
      icon: null,
      content: (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {galpones.map((g) => (
              <CardKPI
                key={g.id}
                title={g.nombre}
                value={`${g.temperatura}°C`}
                unit={`${g.humedad}% HR`}
                icon={<Thermometer className="w-6 h-6" />}
                color={
                  g.estadoAmbiental === 'Óptimo'
                    ? 'emerald'
                    : g.estadoAmbiental === 'Aceptable'
                      ? 'blue'
                      : 'orange'
                }
              />
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
              <h3 className="text-lg font-bold text-slate-900 mb-4">Temperatura 24h</h3>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={temperaturaDatos}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis dataKey="hora" />
                  <YAxis domain={[18, 28]} />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="G1" stroke="#10b981" strokeWidth={2} />
                  <Line type="monotone" dataKey="G2" stroke="#3b82f6" strokeWidth={2} />
                  <Line type="monotone" dataKey="G3" stroke="#f59e0b" strokeWidth={2} />
                  <Line type="monotone" dataKey="G4" stroke="#8b5cf6" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </div>

            <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
              <h3 className="text-lg font-bold text-slate-900 mb-4">Consumo Diario</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={consumoDatos}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis dataKey="galpone" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="alimento" fill="#f59e0b" name="Alimento (kg)" />
                  <Bar dataKey="agua" fill="#3b82f6" name="Agua (L)" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'temperatura',
      label: 'Control Temperatura',
      icon: null,
      content: (
        <div className="space-y-4">
          <h3 className="text-lg font-bold text-slate-900 mb-4">Estado de Temperatura</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {galpones.map((g) => (
              <div key={g.id} className="bg-white rounded-xl border border-slate-200 p-6">
                <p className="font-semibold text-slate-900 mb-4">{g.nombre}</p>
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-4xl font-bold text-blue-600">{g.temperatura}°C</p>
                    <p className="text-sm text-slate-600 mt-1">Óptimo: 22-23°C</p>
                  </div>
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center">
                    <Thermometer className="w-10 h-10 text-blue-600" />
                  </div>
                </div>
                <div className="mt-4 h-2 bg-slate-200 rounded-full overflow-hidden">
                  <div
                    className={`h-full ${g.temperatura >= 22 && g.temperatura <= 23 ? 'bg-emerald-500' : 'bg-yellow-500'}`}
                    style={{
                      width: `${Math.max(0, Math.min(100, (g.temperatura / 30) * 100))}%`,
                    }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Gestión Ambiental</h1>
        <p className="text-slate-600 mt-1">Control de ambiente, consumo y parámetros climáticos</p>
      </div>

      <Tabs tabs={tabs} defaultTab="resumen" />
    </div>
  );
}
