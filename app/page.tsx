'use client';

import Link from 'next/link';
import {
  BarChart3,
  TrendingUp,
  AlertCircle,
  Egg,
  Activity,
  Wind,
  ArrowRight,
  Clock,
} from 'lucide-react';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { galpones, alertas, registrosProductivos, ventas } from '@/lib/mock-data';

const produccionData = [
  { día: 'Lun', producción: 105000, apto: 100800, rotos: 2100, sucios: 2100 },
  { día: 'Mar', producción: 110000, apto: 105600, rotos: 2200, sucios: 2200 },
  { día: 'Mié', producción: 112000, apto: 107520, rotos: 2240, sucios: 2240 },
  { día: 'Jue', producción: 115000, apto: 110400, rotos: 2300, sucios: 2300 },
  { día: 'Vie', producción: 118000, apto: 113280, rotos: 2360, sucios: 2360 },
  { día: 'Sab', producción: 120000, apto: 115200, rotos: 2400, sucios: 2400 },
  { día: 'Dom', producción: 141600, apto: 136032, rotos: 2832, sucios: 2736 },
];

const consumoData = [
  { galpone: 'G1', alimento: 45, agua: 65 },
  { galpone: 'G2', alimento: 68, agua: 98 },
  { galpone: 'G3', alimento: 92, agua: 132 },
  { galpone: 'G4', alimento: 38, agua: 55 },
];

const ventasData = [
  { mes: 'Ene', ventas: 52000 },
  { mes: 'Feb', ventas: 58000 },
  { mes: 'Mar', ventas: 61000 },
  { mes: 'Abr', ventas: 65000 },
  { mes: 'May', ventas: 72000 },
  { mes: 'Jun', ventas: 78000 },
];

const COLORS = ['#10b981', '#3b82f6', '#f59e0b', '#ef4444'];

export default function Dashboard() {
  const totalProduccionHoy = registrosProductivos.reduce((acc, r) => acc + r.totalHuevos, 0);
  const totalApto = registrosProductivos.reduce((acc, r) => acc + r.huevsAptos, 0);
  const alertasCriticas = alertas.filter((a) => a.prioridad === 'Crítica').length;
  const galponesMal = galpones.filter((g) => g.estadoSanitario === 'Crítico').length;
  const ingresosMes = ventas.reduce((acc, v) => acc + v.total, 0);

  const kpis = [
    {
      title: 'Producción Hoy',
      value: totalProduccionHoy.toLocaleString(),
      unit: 'huevos',
      icon: Egg,
      color: 'emerald',
      trend: '+2.5%',
    },
    {
      title: 'Huevos Aptos',
      value: totalApto.toLocaleString(),
      unit: '(96.2%)',
      icon: TrendingUp,
      color: 'blue',
      trend: '+1.2%',
    },
    {
      title: 'Alertas Críticas',
      value: alertasCriticas,
      unit: 'activas',
      icon: AlertCircle,
      color: 'red',
      trend: '↑ 1',
    },
    {
      title: 'Galpones Activos',
      value: galpones.length,
      unit: 'operativos',
      icon: BarChart3,
      color: 'purple',
      trend: 'normal',
    },
    {
      title: 'Ingresos Mes',
      value: `$${ingresosMes.toLocaleString()}`,
      unit: 'COP',
      icon: TrendingUp,
      color: 'green',
      trend: '+8.5%',
    },
    {
      title: 'Eficiencia Promedio',
      value: '93.9%',
      unit: 'granja',
      icon: Activity,
      color: 'indigo',
      trend: '+0.8%',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Título */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Dashboard Ejecutivo</h1>
          <p className="text-slate-600 mt-1">Visión general de la granja avícola</p>
        </div>
        <div className="flex gap-3">
          <button className="px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors text-sm font-medium">
            Exportar Reporte
          </button>
          <button className="px-4 py-2 bg-slate-200 text-slate-900 rounded-lg hover:bg-slate-300 transition-colors text-sm font-medium">
            Filtrar
          </button>
        </div>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {kpis.map((kpi, idx) => {
          const Icon = kpi.icon;
          const colorClasses: Record<string, string> = {
            emerald: 'from-emerald-50 to-emerald-100 text-emerald-600',
            blue: 'from-blue-50 to-blue-100 text-blue-600',
            red: 'from-red-50 to-red-100 text-red-600',
            purple: 'from-purple-50 to-purple-100 text-purple-600',
            green: 'from-green-50 to-green-100 text-green-600',
            indigo: 'from-indigo-50 to-indigo-100 text-indigo-600',
          };

          return (
            <div
              key={idx}
              className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <p className="text-sm text-slate-600 font-medium">{kpi.title}</p>
                  <div className="mt-2">
                    <h3 className="text-2xl font-bold text-slate-900">{kpi.value}</h3>
                    <p className="text-xs text-slate-500 mt-1">{kpi.unit}</p>
                  </div>
                </div>
                <div className={`p-3 rounded-lg bg-gradient-to-br ${colorClasses[kpi.color]}`}>
                  <Icon className="w-6 h-6" />
                </div>
              </div>
              <div className="flex items-center gap-2 text-xs">
                <span className="text-emerald-600 font-semibold">{kpi.trend}</span>
                <span className="text-slate-500">vs. día anterior</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Gráficos principales */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Producción por día */}
        <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
          <h3 className="text-lg font-bold text-slate-900 mb-4">Producción Semanal</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={produccionData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="día" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="producción"
                stroke="#10b981"
                strokeWidth={2}
                name="Total"
              />
              <Line
                type="monotone"
                dataKey="apto"
                stroke="#3b82f6"
                strokeWidth={2}
                name="Apto"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Consumo por galpón */}
        <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
          <h3 className="text-lg font-bold text-slate-900 mb-4">Consumo Diario por Galpón</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={consumoData}>
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

        {/* Ventas mensuales */}
        <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
          <h3 className="text-lg font-bold text-slate-900 mb-4">Ingresos Últimos 6 Meses</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={ventasData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="mes" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="ventas" fill="#10b981" name="Ingresos" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Estado por galpón */}
        <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
          <h3 className="text-lg font-bold text-slate-900 mb-4">Eficiencia por Galpón</h3>
          <div className="space-y-3">
            {galpones.map((g) => (
              <div key={g.id} className="flex items-center justify-between">
                <span className="text-sm font-medium text-slate-700">{g.nombre}</span>
                <div className="flex-1 mx-3 h-2 bg-slate-200 rounded-full overflow-hidden">
                  <div
                    className={`h-full transition-all ${
                      g.eficiencia >= 95
                        ? 'bg-emerald-500'
                        : g.eficiencia >= 90
                          ? 'bg-yellow-500'
                          : 'bg-red-500'
                    }`}
                    style={{ width: `${g.eficiencia}%` }}
                  ></div>
                </div>
                <span className="text-sm font-bold text-slate-900 w-12 text-right">
                  {g.eficiencia}%
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Alertas y accesos rápidos */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Alertas recientes */}
        <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-bold text-slate-900">Alertas Activas</h3>
            <Link
              href="/alertas"
              className="text-sm text-emerald-600 hover:text-emerald-700 font-medium flex items-center gap-1"
            >
              Ver todas <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="space-y-3">
            {alertas.slice(0, 3).map((alerta) => (
              <div
                key={alerta.id}
                className={`p-3 rounded-lg border-l-4 ${
                  alerta.prioridad === 'Crítica'
                    ? 'bg-red-50 border-red-500'
                    : alerta.prioridad === 'Alta'
                      ? 'bg-orange-50 border-orange-500'
                      : 'bg-yellow-50 border-yellow-500'
                }`}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm font-semibold text-slate-900">{alerta.descripcion}</p>
                    <p className="text-xs text-slate-500 mt-1">
                      {alerta.galpone} • {alerta.fecha}
                    </p>
                  </div>
                  <span
                    className={`text-xs font-bold px-2 py-1 rounded ${
                      alerta.prioridad === 'Crítica'
                        ? 'bg-red-200 text-red-800'
                        : alerta.prioridad === 'Alta'
                          ? 'bg-orange-200 text-orange-800'
                          : 'bg-yellow-200 text-yellow-800'
                    }`}
                  >
                    {alerta.prioridad}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Accesos rápidos */}
        <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
          <h3 className="text-lg font-bold text-slate-900 mb-4">Accesos Rápidos</h3>
          <div className="grid grid-cols-2 gap-3">
            <Link
              href="/productiva"
              className="p-4 bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-lg hover:shadow-md transition-shadow cursor-pointer border border-emerald-200"
            >
              <Egg className="w-6 h-6 text-emerald-600 mb-2" />
              <p className="text-sm font-semibold text-slate-900">Registrar Producción</p>
            </Link>
            <Link
              href="/sanitaria"
              className="p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg hover:shadow-md transition-shadow cursor-pointer border border-blue-200"
            >
              <Activity className="w-6 h-6 text-blue-600 mb-2" />
              <p className="text-sm font-semibold text-slate-900">Evento Sanitario</p>
            </Link>
            <Link
              href="/galpones"
              className="p-4 bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg hover:shadow-md transition-shadow cursor-pointer border border-purple-200"
            >
              <BarChart3 className="w-6 h-6 text-purple-600 mb-2" />
              <p className="text-sm font-semibold text-slate-900">Ver Galpones</p>
            </Link>
            <Link
              href="/reportes"
              className="p-4 bg-gradient-to-br from-indigo-50 to-indigo-100 rounded-lg hover:shadow-md transition-shadow cursor-pointer border border-indigo-200"
            >
              <Clock className="w-6 h-6 text-indigo-600 mb-2" />
              <p className="text-sm font-semibold text-slate-900">Generar Reporte</p>
            </Link>
          </div>
        </div>
      </div>

      {/* Ranking de galpones */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
        <h3 className="text-lg font-bold text-slate-900 mb-4">Ranking de Galpones por Rendimiento</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="text-left py-3 px-4 font-semibold text-slate-600">Galpón</th>
                <th className="text-left py-3 px-4 font-semibold text-slate-600">Producción Hoy</th>
                <th className="text-left py-3 px-4 font-semibold text-slate-600">Eficiencia</th>
                <th className="text-left py-3 px-4 font-semibold text-slate-600">Estado Sanitario</th>
                <th className="text-left py-3 px-4 font-semibold text-slate-600">Alertas</th>
              </tr>
            </thead>
            <tbody>
              {galpones
                .sort((a, b) => b.eficiencia - a.eficiencia)
                .map((galpone) => (
                  <tr key={galpone.id} className="border-b border-slate-100 hover:bg-slate-50">
                    <td className="py-3 px-4 font-semibold text-slate-900">{galpone.nombre}</td>
                    <td className="py-3 px-4 text-slate-700">{galpone.produccionDiaria.toLocaleString()}</td>
                    <td className="py-3 px-4">
                      <span className="font-bold text-emerald-600">{galpone.eficiencia}%</span>
                    </td>
                    <td className="py-3 px-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          galpone.estadoSanitario === 'Excelente'
                            ? 'bg-emerald-100 text-emerald-700'
                            : galpone.estadoSanitario === 'Bueno'
                              ? 'bg-blue-100 text-blue-700'
                              : 'bg-yellow-100 text-yellow-700'
                        }`}
                      >
                        {galpone.estadoSanitario}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      {galpone.alertasActivas > 0 ? (
                        <span className="inline-flex items-center gap-1 px-2 py-1 bg-red-100 text-red-700 rounded text-xs font-semibold">
                          <AlertCircle className="w-3 h-3" />
                          {galpone.alertasActivas}
                        </span>
                      ) : (
                        <span className="text-slate-500">—</span>
                      )}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
