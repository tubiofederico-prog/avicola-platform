'use client';

import Link from 'next/link';
import { useState } from 'react';
import {
  Egg,
  TrendingUp,
  AlertCircle,
  BarChart3,
  ArrowRight,
  Download,
  Filter,
  Plus,
  ChevronRight,
  Calendar,
  Users,
  Percent,
  Heart,
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
import { galpones, registrosProductivos, lotes } from '@/lib/mock-data';

const COLORS = ['#10b981', '#3b82f6', '#f59e0b', '#ef4444'];

// Mock data for detailed analysis
const produccionDetallada = [
  { fecha: '2026-05-28', total: 119000, apto: 114320, rotos: 2380, sucios: 2300 },
  { fecha: '2026-05-29', total: 121000, apto: 116160, rotos: 2420, sucios: 2420 },
  { fecha: '2026-05-30', total: 118500, apto: 113760, rotos: 2370, sucios: 2370 },
  { fecha: '2026-05-31', total: 120000, apto: 115200, rotos: 2400, sucios: 2400 },
  { fecha: '2026-06-01', total: 125000, apto: 120000, rotos: 2500, sucios: 2500 },
  { fecha: '2026-06-02', total: 127000, apto: 121920, rotos: 2540, sucios: 2540 },
  { fecha: '2026-06-03', total: 119160, apto: 114614, rotos: 2383, sucios: 2163 },
];

const caldesByGalpon = [
  { galpone: 'G001', apto: 96.8, rotos: 2.0, sucios: 1.2 },
  { galpone: 'G002', apto: 95.0, rotos: 3.0, sucios: 2.0 },
  { galpone: 'G003', apto: 90.0, rotos: 2.5, sucios: 7.5 },
  { galpone: 'G004', apto: 94.0, rotos: 2.0, sucios: 4.0 },
];

const huevoPorCategoria = [
  { categoria: 'Extra', cantidad: 45000, porcentaje: 38 },
  { categoria: 'Primera', cantidad: 35000, porcentaje: 29 },
  { categoria: 'Segunda', cantidad: 25000, porcentaje: 21 },
  { categoria: 'Rechazo', cantidad: 10000, porcentaje: 12 },
];

const registrosPorHora = [
  { hora: '06:00', huevos: 4800 },
  { hora: '08:00', huevos: 12500 },
  { hora: '10:00', huevos: 15200 },
  { hora: '12:00', huevos: 14800 },
  { hora: '14:00', huevos: 16200 },
  { hora: '16:00', huevos: 18100 },
  { hora: '18:00', huevos: 19500 },
  { hora: '20:00', huevos: 15060 },
];

export default function ProductivaModule() {
  const [activeTab, setActiveTab] = useState('resumen');
  const [selectedGalpone, setSelectedGalpone] = useState('');

  const totalProduccionHoy = registrosProductivos.reduce((acc, r) => acc + r.totalHuevos, 0);
  const totalApto = registrosProductivos.reduce((acc, r) => acc + r.huevsAptos, 0);
  const totalRotos = registrosProductivos.reduce((acc, r) => acc + r.huevsRotos, 0);
  const totalSucios = registrosProductivos.reduce((acc, r) => acc + r.huevsSucios, 0);
  const eficienciaPromedio =
    (registrosProductivos.reduce((acc, r) => acc + r.eficiencia, 0) / registrosProductivos.length).toFixed(1);

  const tabs = [
    { id: 'resumen', label: 'Resumen General', icon: BarChart3 },
    { id: 'registros', label: 'Registros Detallados', icon: Calendar },
    { id: 'calidad', label: 'Análisis de Calidad', icon: Percent },
    { id: 'produccion', label: 'Tendencias', icon: TrendingUp },
  ];

  return (
    <div className="space-y-6">
      {/* Encabezado */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Gestión Productiva</h1>
          <p className="text-slate-600 mt-1">Registro y análisis de producción de huevos</p>
        </div>
        <div className="flex gap-3">
          <button className="px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors text-sm font-medium flex items-center gap-2">
            <Plus className="w-4 h-4" />
            Nuevo Registro
          </button>
          <button className="px-4 py-2 bg-slate-200 text-slate-900 rounded-lg hover:bg-slate-300 transition-colors text-sm font-medium flex items-center gap-2">
            <Download className="w-4 h-4" />
            Exportar
          </button>
        </div>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-sm text-slate-600 font-medium">Total Producción Hoy</p>
              <h3 className="text-2xl font-bold text-slate-900 mt-2">{totalProduccionHoy.toLocaleString()}</h3>
              <p className="text-xs text-slate-500 mt-1">huevos</p>
            </div>
            <div className="p-3 rounded-lg bg-gradient-to-br from-emerald-50 to-emerald-100 text-emerald-600">
              <Egg className="w-6 h-6" />
            </div>
          </div>
          <span className="text-xs text-emerald-600 font-semibold">+2.3% vs ayer</span>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-sm text-slate-600 font-medium">Huevos Aptos</p>
              <h3 className="text-2xl font-bold text-slate-900 mt-2">{totalApto.toLocaleString()}</h3>
              <p className="text-xs text-slate-500 mt-1">calidad premium</p>
            </div>
            <div className="p-3 rounded-lg bg-gradient-to-br from-blue-50 to-blue-100 text-blue-600">
              <TrendingUp className="w-6 h-6" />
            </div>
          </div>
          <span className="text-xs text-blue-600 font-semibold">{eficienciaPromedio}% eficiencia</span>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-sm text-slate-600 font-medium">Huevos Rotos</p>
              <h3 className="text-2xl font-bold text-slate-900 mt-2">{totalRotos.toLocaleString()}</h3>
              <p className="text-xs text-slate-500 mt-1">a descartar</p>
            </div>
            <div className="p-3 rounded-lg bg-gradient-to-br from-orange-50 to-orange-100 text-orange-600">
              <AlertCircle className="w-6 h-6" />
            </div>
          </div>
          <span className="text-xs text-orange-600 font-semibold">
            {((totalRotos / totalProduccionHoy) * 100).toFixed(1)}% del total
          </span>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-sm text-slate-600 font-medium">Huevos Sucios</p>
              <h3 className="text-2xl font-bold text-slate-900 mt-2">{totalSucios.toLocaleString()}</h3>
              <p className="text-xs text-slate-500 mt-1">requieren limpieza</p>
            </div>
            <div className="p-3 rounded-lg bg-gradient-to-br from-red-50 to-red-100 text-red-600">
              <Heart className="w-6 h-6" />
            </div>
          </div>
          <span className="text-xs text-red-600 font-semibold">
            {((totalSucios / totalProduccionHoy) * 100).toFixed(1)}% del total
          </span>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-sm text-slate-600 font-medium">Galpones Activos</p>
              <h3 className="text-2xl font-bold text-slate-900 mt-2">{galpones.length}</h3>
              <p className="text-xs text-slate-500 mt-1">operativos</p>
            </div>
            <div className="p-3 rounded-lg bg-gradient-to-br from-purple-50 to-purple-100 text-purple-600">
              <BarChart3 className="w-6 h-6" />
            </div>
          </div>
          <span className="text-xs text-purple-600 font-semibold">100% disponibles</span>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm">
        <div className="flex border-b border-slate-200">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-6 py-4 border-b-2 transition-colors font-medium text-sm ${
                  activeTab === tab.id
                    ? 'text-emerald-600 border-emerald-500'
                    : 'text-slate-600 border-transparent hover:text-slate-900'
                }`}
              >
                <Icon className="w-4 h-4" />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Tab Content */}
        <div className="p-6">
          {/* Resumen General */}
          {activeTab === 'resumen' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Producción Últimos 7 días */}
                <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
                  <h3 className="text-lg font-bold text-slate-900 mb-4">Producción Últimos 7 Días</h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={produccionDetallada}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                      <XAxis dataKey="fecha" fontSize={12} />
                      <YAxis fontSize={12} />
                      <Tooltip />
                      <Legend />
                      <Line
                        type="monotone"
                        dataKey="total"
                        stroke="#10b981"
                        strokeWidth={2}
                        name="Total"
                        dot={{ fill: '#10b981', r: 4 }}
                      />
                      <Line
                        type="monotone"
                        dataKey="apto"
                        stroke="#3b82f6"
                        strokeWidth={2}
                        name="Apto"
                        dot={{ fill: '#3b82f6', r: 4 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>

                {/* Distribución de Defectos */}
                <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
                  <h3 className="text-lg font-bold text-slate-900 mb-4">Distribución por Categoría</h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={huevoPorCategoria}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ value }) => {
                          const item = huevoPorCategoria.find(h => h.porcentaje === value);
                          return item ? `${item.categoria}: ${item.porcentaje}%` : '';
                        }}
                        outerRadius={100}
                        fill="#8884d8"
                        dataKey="porcentaje"
                      >
                        {huevoPorCategoria.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Registros Productivos Hoy */}
              <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-bold text-slate-900">Registros Productivos Hoy</h3>
                  <Link
                    href="/productiva/registros"
                    className="text-sm text-emerald-600 hover:text-emerald-700 font-medium flex items-center gap-1"
                  >
                    Ver detalle <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-slate-200">
                        <th className="text-left py-3 px-4 font-semibold text-slate-600">Galpón</th>
                        <th className="text-left py-3 px-4 font-semibold text-slate-600">Lote</th>
                        <th className="text-right py-3 px-4 font-semibold text-slate-600">Total Huevos</th>
                        <th className="text-right py-3 px-4 font-semibold text-slate-600">Aptos</th>
                        <th className="text-right py-3 px-4 font-semibold text-slate-600">Rotos</th>
                        <th className="text-right py-3 px-4 font-semibold text-slate-600">Sucios</th>
                        <th className="text-right py-3 px-4 font-semibold text-slate-600">Eficiencia</th>
                        <th className="text-center py-3 px-4 font-semibold text-slate-600">Acción</th>
                      </tr>
                    </thead>
                    <tbody>
                      {registrosProductivos.map((registro) => (
                        <tr key={registro.id} className="border-b border-slate-100 hover:bg-slate-50">
                          <td className="py-3 px-4 font-semibold text-slate-900">{registro.galpone}</td>
                          <td className="py-3 px-4 text-slate-700">{registro.lote}</td>
                          <td className="py-3 px-4 text-right text-slate-900 font-medium">
                            {registro.totalHuevos.toLocaleString()}
                          </td>
                          <td className="py-3 px-4 text-right text-emerald-600 font-semibold">
                            {registro.huevsAptos.toLocaleString()}
                          </td>
                          <td className="py-3 px-4 text-right text-orange-600 font-semibold">
                            {registro.huevsRotos}
                          </td>
                          <td className="py-3 px-4 text-right text-red-600 font-semibold">
                            {registro.huevsSucios}
                          </td>
                          <td className="py-3 px-4 text-right">
                            <span className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-700">
                              {registro.eficiencia}%
                            </span>
                          </td>
                          <td className="py-3 px-4 text-center">
                            <Link
                              href={`/productiva/${registro.id}`}
                              className="inline-flex items-center justify-center w-8 h-8 rounded hover:bg-slate-200 transition-colors"
                            >
                              <ChevronRight className="w-4 h-4 text-slate-600" />
                            </Link>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* Registros Detallados */}
          {activeTab === 'registros' && (
            <div className="space-y-6">
              <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-bold text-slate-900">Producción por Hora</h3>
                  <button className="px-3 py-2 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 transition-colors text-sm font-medium flex items-center gap-2">
                    <Filter className="w-4 h-4" />
                    Filtrar
                  </button>
                </div>
                <ResponsiveContainer width="100%" height={350}>
                  <BarChart data={registrosPorHora}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                    <XAxis dataKey="hora" fontSize={12} />
                    <YAxis fontSize={12} />
                    <Tooltip />
                    <Bar dataKey="huevos" fill="#10b981" name="Huevos Recolectados" radius={[8, 8, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-xl border border-emerald-200 p-6 shadow-sm">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="text-sm font-semibold text-slate-900">Registro Promedio</h4>
                    <Egg className="w-5 h-5 text-emerald-600" />
                  </div>
                  <p className="text-2xl font-bold text-emerald-700">{(totalProduccionHoy / 8).toLocaleString()}</p>
                  <p className="text-xs text-slate-600 mt-2">huevos por hora (promedio)</p>
                </div>

                <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl border border-blue-200 p-6 shadow-sm">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="text-sm font-semibold text-slate-900">Pico Máximo</h4>
                    <TrendingUp className="w-5 h-5 text-blue-600" />
                  </div>
                  <p className="text-2xl font-bold text-blue-700">19,500</p>
                  <p className="text-xs text-slate-600 mt-2">huevos (20:00 hrs)</p>
                </div>

                <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl border border-purple-200 p-6 shadow-sm">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="text-sm font-semibold text-slate-900">Rendimiento</h4>
                    <Percent className="w-5 h-5 text-purple-600" />
                  </div>
                  <p className="text-2xl font-bold text-purple-700">95.4%</p>
                  <p className="text-xs text-slate-600 mt-2">promedio de eficiencia</p>
                </div>
              </div>

              {/* Tabla de Registros por Galpón */}
              <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
                <h3 className="text-lg font-bold text-slate-900 mb-4">Observaciones de Producción</h3>
                <div className="space-y-3">
                  {registrosProductivos.map((registro) => (
                    <div
                      key={registro.id}
                      className="p-4 border border-slate-200 rounded-lg hover:border-emerald-300 hover:bg-slate-50 transition-colors"
                    >
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h4 className="font-semibold text-slate-900">
                            {registro.galpone} - {registro.lote}
                          </h4>
                          <p className="text-sm text-slate-600 mt-1">{registro.observaciones}</p>
                        </div>
                        <Link
                          href={`/productiva/${registro.id}`}
                          className="text-emerald-600 hover:text-emerald-700 font-medium text-sm"
                        >
                          Ver detalle →
                        </Link>
                      </div>
                      <div className="flex gap-4 text-xs">
                        <span className="text-slate-500">Responsable: {registro.responsable}</span>
                        <span className="text-slate-500">Fecha: {registro.fecha}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Análisis de Calidad */}
          {activeTab === 'calidad' && (
            <div className="space-y-6">
              <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
                <h3 className="text-lg font-bold text-slate-900 mb-4">Calidad por Galpón</h3>
                <ResponsiveContainer width="100%" height={350}>
                  <BarChart data={caldesByGalpon}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                    <XAxis dataKey="galpone" fontSize={12} />
                    <YAxis fontSize={12} />
                    <Tooltip formatter={(value) => `${value}%`} />
                    <Legend />
                    <Bar dataKey="apto" fill="#10b981" name="Apto %" radius={[8, 8, 0, 0]} />
                    <Bar dataKey="rotos" fill="#f59e0b" name="Rotos %" radius={[8, 8, 0, 0]} />
                    <Bar dataKey="sucios" fill="#ef4444" name="Sucios %" radius={[8, 8, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Métricas de Calidad */}
                <div className="space-y-4">
                  <h3 className="text-lg font-bold text-slate-900">Estándares de Calidad</h3>
                  {[
                    {
                      nombre: 'Huevos Aptos',
                      actual: 95.4,
                      objetivo: 96.0,
                      color: 'emerald',
                    },
                    {
                      nombre: 'Huevos Rotos',
                      actual: 2.1,
                      objetivo: 2.0,
                      color: 'orange',
                    },
                    {
                      nombre: 'Huevos Sucios',
                      actual: 2.5,
                      objetivo: 2.0,
                      color: 'red',
                    },
                  ].map((metrica, idx) => (
                    <div key={idx} className="bg-white rounded-lg border border-slate-200 p-4">
                      <div className="flex justify-between items-center mb-2">
                        <p className="font-medium text-slate-900">{metrica.nombre}</p>
                        <span className="text-sm font-bold text-slate-600">{metrica.actual}%</span>
                      </div>
                      <div className="h-2 bg-slate-200 rounded-full overflow-hidden mb-2">
                        <div
                          className={`h-full bg-${metrica.color}-500`}
                          style={{ width: `${metrica.actual}%` }}
                        ></div>
                      </div>
                      <p className="text-xs text-slate-500">Objetivo: {metrica.objetivo}%</p>
                    </div>
                  ))}
                </div>

                {/* Comparativa */}
                <div className="space-y-4">
                  <h3 className="text-lg font-bold text-slate-900">Comparativa Galpones</h3>
                  {galpones.map((galpone) => {
                    const registro = registrosProductivos.find((r) => r.galpone === galpone.id);
                    return (
                      <Link
                        key={galpone.id}
                        href={`/productiva/${registro?.id}`}
                        className="bg-white rounded-lg border border-slate-200 p-4 hover:border-emerald-300 hover:bg-slate-50 transition-colors cursor-pointer"
                      >
                        <div className="flex justify-between items-center mb-2">
                          <p className="font-medium text-slate-900">{galpone.nombre}</p>
                          <span className={`text-sm font-bold px-2 py-1 rounded ${registro?.eficiencia! >= 95 ? 'bg-emerald-100 text-emerald-700' : 'bg-yellow-100 text-yellow-700'}`}>
                            {registro?.eficiencia}%
                          </span>
                        </div>
                        <div className="flex gap-2 text-xs">
                          <span className="text-emerald-600">Apto: {registro?.huevsAptos}</span>
                          <span className="text-orange-600">Rotos: {registro?.huevsRotos}</span>
                          <span className="text-red-600">Sucios: {registro?.huevsSucios}</span>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </div>

              {/* Alertas de Calidad */}
              <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
                <h3 className="text-lg font-bold text-slate-900 mb-4">Alertas de Calidad</h3>
                <div className="space-y-3">
                  <div className="p-4 border-l-4 border-orange-500 bg-orange-50 rounded-lg">
                    <p className="text-sm font-semibold text-slate-900">Tasa de huevos sucios elevada en G003</p>
                    <p className="text-xs text-slate-600 mt-1">
                      7.5% vs 3% normal. Se recomienda revisar sistema de nidales.
                    </p>
                  </div>
                  <div className="p-4 border-l-4 border-yellow-500 bg-yellow-50 rounded-lg">
                    <p className="text-sm font-semibold text-slate-900">Rotura de huevos en aumento</p>
                    <p className="text-xs text-slate-600 mt-1">
                      G002 presenta 3% de roturas vs 2.1% promedio. Revisar sistemas de transporte.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Tendencias */}
          {activeTab === 'produccion' && (
            <div className="space-y-6">
              <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
                <h3 className="text-lg font-bold text-slate-900 mb-4">Tendencia de Producción - Últimas 2 Semanas</h3>
                <ResponsiveContainer width="100%" height={400}>
                  <LineChart data={produccionDetallada}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                    <XAxis dataKey="fecha" fontSize={12} />
                    <YAxis fontSize={12} />
                    <Tooltip />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="total"
                      stroke="#10b981"
                      strokeWidth={3}
                      name="Total Producción"
                      dot={{ fill: '#10b981', r: 5 }}
                      activeDot={{ r: 7 }}
                    />
                    <Line
                      type="monotone"
                      dataKey="apto"
                      stroke="#3b82f6"
                      strokeWidth={2}
                      name="Huevos Aptos"
                      dot={{ fill: '#3b82f6', r: 4 }}
                    />
                    <Line
                      type="monotone"
                      dataKey="rotos"
                      stroke="#f59e0b"
                      strokeWidth={2}
                      name="Huevos Rotos"
                      dot={{ fill: '#f59e0b', r: 4 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
                  <h4 className="font-semibold text-slate-900 mb-3">Crecimiento Promedio</h4>
                  <p className="text-3xl font-bold text-emerald-600">+2.1%</p>
                  <p className="text-sm text-slate-600 mt-2">respecto a la semana anterior</p>
                </div>

                <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
                  <h4 className="font-semibold text-slate-900 mb-3">Producción Máxima</h4>
                  <p className="text-3xl font-bold text-blue-600">127,000</p>
                  <p className="text-sm text-slate-600 mt-2">huevos (2 de junio)</p>
                </div>

                <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
                  <h4 className="font-semibold text-slate-900 mb-3">Proyección Semanal</h4>
                  <p className="text-3xl font-bold text-purple-600">~850,000</p>
                  <p className="text-sm text-slate-600 mt-2">estimado para esta semana</p>
                </div>
              </div>

              {/* Análisis por Lote */}
              <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
                <h3 className="text-lg font-bold text-slate-900 mb-4">Análisis por Lote</h3>
                <div className="space-y-3">
                  {lotes.map((lote) => {
                    const registro = registrosProductivos.find((r) => r.lote === lote.codigo);
                    const diasVida = lote.edad;
                    const diasRestantes = lote.vidaUtilEstimada - diasVida;
                    const porcentajeVida = (diasVida / lote.vidaUtilEstimada) * 100;

                    return (
                      <Link
                        key={lote.id}
                        href={`/productiva/${registro?.id}`}
                        className="p-4 border border-slate-200 rounded-lg hover:border-emerald-300 hover:bg-slate-50 transition-colors"
                      >
                        <div className="flex justify-between items-start mb-3">
                          <div>
                            <h4 className="font-semibold text-slate-900">{lote.codigo}</h4>
                            <p className="text-xs text-slate-600 mt-1">
                              {lote.galpone} • {lote.cantidadAves.toLocaleString()} aves • Etapa: {lote.etapa}
                            </p>
                          </div>
                          <span className="text-sm font-bold text-slate-900">Edad: {diasVida} días</span>
                        </div>
                        <div className="mb-3">
                          <div className="flex justify-between text-xs mb-1">
                            <span className="text-slate-600">Vida útil</span>
                            <span className="text-slate-600">
                              {diasVida} / {lote.vidaUtilEstimada} días
                            </span>
                          </div>
                          <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
                            <div
                              className={`h-full transition-all ${
                                porcentajeVida < 70 ? 'bg-emerald-500' : porcentajeVida < 90 ? 'bg-yellow-500' : 'bg-orange-500'
                              }`}
                              style={{ width: `${porcentajeVida}%` }}
                            ></div>
                          </div>
                        </div>
                        <div className="grid grid-cols-3 gap-2 text-xs">
                          <div>
                            <p className="text-slate-600">Producción Acumulada</p>
                            <p className="font-bold text-slate-900">{(lote.produccionAcumulada / 1000000).toFixed(2)}M</p>
                          </div>
                          <div>
                            <p className="text-slate-600">Estado Sanitario</p>
                            <p className="font-bold text-emerald-600">{lote.estadoSanitario}</p>
                          </div>
                          <div>
                            <p className="text-slate-600">Próximo Recambio</p>
                            <p className="font-bold text-slate-900">{lote.fechaRecambio}</p>
                          </div>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Acciones rápidas */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
        <h3 className="text-lg font-bold text-slate-900 mb-4">Acciones Rápidas</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <Link
            href="/productiva/nuevo"
            className="p-4 bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-lg hover:shadow-md transition-shadow border border-emerald-200"
          >
            <Plus className="w-6 h-6 text-emerald-600 mb-2" />
            <p className="text-sm font-semibold text-slate-900">Registrar Producción</p>
          </Link>
          <button className="p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg hover:shadow-md transition-shadow border border-blue-200">
            <Download className="w-6 h-6 text-blue-600 mb-2" />
            <p className="text-sm font-semibold text-slate-900">Exportar Reporte</p>
          </button>
          <Link
            href="/productiva/analisis"
            className="p-4 bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg hover:shadow-md transition-shadow border border-purple-200"
          >
            <BarChart3 className="w-6 h-6 text-purple-600 mb-2" />
            <p className="text-sm font-semibold text-slate-900">Análisis Avanzado</p>
          </Link>
          <Link
            href="/productiva/configuracion"
            className="p-4 bg-gradient-to-br from-indigo-50 to-indigo-100 rounded-lg hover:shadow-md transition-shadow border border-indigo-200"
          >
            <Users className="w-6 h-6 text-indigo-600 mb-2" />
            <p className="text-sm font-semibold text-slate-900">Configurar Umbrales</p>
          </Link>
        </div>
      </div>
    </div>
  );
}
