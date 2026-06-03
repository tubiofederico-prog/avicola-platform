'use client';

import Link from 'next/link';
import { useState } from 'react';
import {
  Plus,
  Eye,
  Edit2,
  Trash2,
  AlertCircle,
  TrendingUp,
  ThermometerSun,
  Droplets,
  BarChart3,
  Download,
  Filter,
  ArrowRight,
  CheckCircle,
  Clock,
  Activity,
} from 'lucide-react';
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from 'recharts';
import { StatusBadge } from '@/components/status-badge';
import { CardKPI } from '@/components/card-kpi';
import { galpones } from '@/lib/mock-data';

const COLORS = ['#10b981', '#3b82f6', '#f59e0b', '#ef4444'];

// Mock data for additional features
const estadoGalpones = [
  { nombre: 'G001', ocupacion: 95, eficiencia: 96.5, sanidad: 92, ambiental: 98 },
  { nombre: 'G002', ocupacion: 93, eficiencia: 95.1, sanidad: 88, ambiental: 85 },
  { nombre: 'G003', ocupacion: 97, eficiencia: 90.0, sanidad: 75, ambiental: 70 },
  { nombre: 'G004', ocupacion: 96, eficiencia: 94.0, sanidad: 95, ambiental: 96 },
];

const tiendoTemperatura = [
  { fecha: '06:00', g001: 20, g002: 21, g003: 22, g004: 20 },
  { fecha: '09:00', g001: 22, g002: 23, g003: 25, g004: 22 },
  { fecha: '12:00', g001: 24, g002: 25, g003: 27, g004: 24 },
  { fecha: '15:00', g001: 25, g002: 26, g003: 28, g004: 25 },
  { fecha: '18:00', g001: 23, g002: 24, g003: 26, g004: 23 },
  { fecha: '21:00', g001: 22, g002: 23, g003: 24, g004: 22 },
];

const alertasGalpones = [
  {
    id: 1,
    galpone: 'G003',
    tipo: 'Temperatura Alta',
    descripcion: 'Temperatura superior a 25°C detectada',
    nivel: 'critical',
    fecha: '2026-06-03 14:30',
  },
  {
    id: 2,
    galpone: 'G002',
    tipo: 'Humedad Elevada',
    descripcion: 'Humedad relativa en 72%, revisar ventilación',
    nivel: 'warning',
    fecha: '2026-06-03 13:15',
  },
  {
    id: 3,
    galpone: 'G001',
    tipo: 'Consumo Anómalo',
    descripcion: 'Consumo de agua 15% por debajo de lo esperado',
    nivel: 'info',
    fecha: '2026-06-03 12:00',
  },
];

const performanceMetricas = [
  { metrica: 'Ocupación', valor: 95.25 },
  { metrica: 'Eficiencia', valor: 93.9 },
  { metrica: 'Sanidad', valor: 87.5 },
  { metrica: 'Ambiental', valor: 87.25 },
];

export default function GalponesPage() {
  const [activeTab, setActiveTab] = useState('resumen');
  const [filtro, setFiltro] = useState('todos');

  const totalCapacidad = galpones.reduce((a, g) => a + g.capacidad, 0);
  const totalAves = galpones.reduce((a, g) => a + g.gallinasActuales, 0);
  const ocupacionPromedio = ((totalAves / totalCapacidad) * 100).toFixed(1);
  const eficienciaPromedio = (galpones.reduce((a, g) => a + g.eficiencia, 0) / galpones.length).toFixed(1);

  return (
    <div className="space-y-6">
      {/* Encabezado */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Gestión de Galpones</h1>
          <p className="text-slate-600 mt-1">Administración de galpones y su estado operativo</p>
        </div>
        <div className="flex gap-3">
          <Link
            href="/galpones/nuevo"
            className="px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors text-sm font-medium flex items-center gap-2 shadow-sm hover:shadow-md"
          >
            <Plus className="w-4 h-4" />
            Nuevo Galpón
          </Link>
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
              <p className="text-sm text-slate-600 font-medium">Galpones Activos</p>
              <h3 className="text-2xl font-bold text-slate-900 mt-2">{galpones.length}</h3>
              <p className="text-xs text-slate-500 mt-1">operativos</p>
            </div>
            <div className="p-3 rounded-lg bg-gradient-to-br from-emerald-50 to-emerald-100 text-emerald-600">
              <Activity className="w-6 h-6" />
            </div>
          </div>
          <span className="text-xs text-emerald-600 font-semibold">100% disponibles</span>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-sm text-slate-600 font-medium">Población Total</p>
              <h3 className="text-2xl font-bold text-slate-900 mt-2">{totalAves.toLocaleString()}</h3>
              <p className="text-xs text-slate-500 mt-1">aves</p>
            </div>
            <div className="p-3 rounded-lg bg-gradient-to-br from-blue-50 to-blue-100 text-blue-600">
              <BarChart3 className="w-6 h-6" />
            </div>
          </div>
          <span className="text-xs text-blue-600 font-semibold">{ocupacionPromedio}% ocupación</span>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-sm text-slate-600 font-medium">Capacidad Total</p>
              <h3 className="text-2xl font-bold text-slate-900 mt-2">{totalCapacidad.toLocaleString()}</h3>
              <p className="text-xs text-slate-500 mt-1">aves máximo</p>
            </div>
            <div className="p-3 rounded-lg bg-gradient-to-br from-purple-50 to-purple-100 text-purple-600">
              <TrendingUp className="w-6 h-6" />
            </div>
          </div>
          <span className="text-xs text-purple-600 font-semibold">
            {((totalCapacidad - totalAves).toLocaleString())} disponibles
          </span>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-sm text-slate-600 font-medium">Eficiencia Promedio</p>
              <h3 className="text-2xl font-bold text-slate-900 mt-2">{eficienciaPromedio}%</h3>
              <p className="text-xs text-slate-500 mt-1">operativa</p>
            </div>
            <div className="p-3 rounded-lg bg-gradient-to-br from-emerald-50 to-emerald-100 text-emerald-600">
              <CheckCircle className="w-6 h-6" />
            </div>
          </div>
          <span className="text-xs text-emerald-600 font-semibold">+1.2% vs semana anterior</span>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-sm text-slate-600 font-medium">Alertas Activas</p>
              <h3 className="text-2xl font-bold text-slate-900 mt-2">{alertasGalpones.length}</h3>
              <p className="text-xs text-slate-500 mt-1">requieren atención</p>
            </div>
            <div className="p-3 rounded-lg bg-gradient-to-br from-orange-50 to-orange-100 text-orange-600">
              <AlertCircle className="w-6 h-6" />
            </div>
          </div>
          <span className="text-xs text-orange-600 font-semibold">1 crítica</span>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm">
        <div className="flex border-b border-slate-200 overflow-x-auto">
          {[
            { id: 'resumen', label: 'Resumen General' },
            { id: 'listado', label: 'Listado Completo' },
            { id: 'monitoreo', label: 'Monitoreo Ambiental' },
            { id: 'rendimiento', label: 'Rendimiento' },
            { id: 'alertas', label: 'Alertas y Problemas' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-6 py-4 border-b-2 transition-colors font-medium text-sm whitespace-nowrap ${
                activeTab === tab.id
                  ? 'text-emerald-600 border-emerald-500'
                  : 'text-slate-600 border-transparent hover:text-slate-900'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="p-6">
          {/* Resumen General */}
          {activeTab === 'resumen' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Gráfico de Performance */}
                <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
                  <h3 className="text-lg font-bold text-slate-900 mb-4">Performance Operativo</h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <RadarChart data={estadoGalpones}>
                      <PolarGrid stroke="#e2e8f0" />
                      <PolarAngleAxis dataKey="nombre" fontSize={12} />
                      <PolarRadiusAxis angle={90} domain={[0, 100]} fontSize={11} />
                      <Radar name="Ocupación" dataKey="ocupacion" stroke="#10b981" fill="#10b981" fillOpacity={0.25} />
                      <Radar name="Eficiencia" dataKey="eficiencia" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.25} />
                      <Legend />
                      <Tooltip />
                    </RadarChart>
                  </ResponsiveContainer>
                </div>

                {/* Ocupación por Galpón */}
                <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
                  <h3 className="text-lg font-bold text-slate-900 mb-4">Ocupación por Galpón</h3>
                  <div className="space-y-4">
                    {galpones.map((g) => (
                      <div key={g.id} className="space-y-1">
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-medium text-slate-700">{g.nombre}</span>
                          <span className="text-sm font-bold text-slate-900">
                            {((g.gallinasActuales / g.capacidad) * 100).toFixed(1)}%
                          </span>
                        </div>
                        <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-emerald-400 to-emerald-600"
                            style={{ width: `${(g.gallinasActuales / g.capacidad) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Tarjetas de Galpones */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {galpones.map((galpone) => (
                  <Link
                    key={galpone.id}
                    href={`/galpones/${galpone.id}`}
                    className="bg-white rounded-xl border border-slate-200 p-5 hover:border-emerald-300 hover:shadow-lg transition-all group"
                  >
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="text-sm font-bold text-slate-900 group-hover:text-emerald-600 transition-colors">
                        {galpone.nombre}
                      </h3>
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        galpone.alertasActivas === 0
                          ? 'bg-emerald-100 text-emerald-700'
                          : 'bg-orange-100 text-orange-700'
                      }`}>
                        {galpone.alertasActivas === 0 ? 'Óptimo' : `${galpone.alertasActivas} alerta${galpone.alertasActivas > 1 ? 's' : ''}`}
                      </span>
                    </div>
                    <div className="space-y-3 text-sm">
                      <div>
                        <p className="text-slate-600 text-xs">Población</p>
                        <p className="font-bold text-slate-900">{galpone.gallinasActuales.toLocaleString()} / {galpone.capacidad.toLocaleString()}</p>
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <p className="text-slate-600 text-xs">Eficiencia</p>
                          <p className="font-bold text-emerald-600">{galpone.eficiencia}%</p>
                        </div>
                        <div>
                          <p className="text-slate-600 text-xs">Producción</p>
                          <p className="font-bold text-blue-600">{(galpone.produccionDiaria / 1000).toFixed(0)}K</p>
                        </div>
                      </div>
                      <div className="flex gap-2 pt-2">
                        <div className="flex items-center gap-1 text-xs text-slate-600">
                          <ThermometerSun className="w-3 h-3" /> {galpone.temperatura}°C
                        </div>
                        <div className="flex items-center gap-1 text-xs text-slate-600">
                          <Droplets className="w-3 h-3" /> {galpone.humedad}%
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Listado Completo */}
          {activeTab === 'listado' && (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-bold text-slate-900">Todos los Galpones</h3>
                <button className="px-3 py-2 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 transition-colors text-sm font-medium flex items-center gap-2">
                  <Filter className="w-4 h-4" />
                  Filtrar
                </button>
              </div>
              <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-slate-200 bg-slate-50">
                        <th className="text-left py-4 px-6 font-semibold text-slate-600">Nombre</th>
                        <th className="text-left py-4 px-6 font-semibold text-slate-600">Lote</th>
                        <th className="text-left py-4 px-6 font-semibold text-slate-600">Población</th>
                        <th className="text-left py-4 px-6 font-semibold text-slate-600">Capacidad</th>
                        <th className="text-left py-4 px-6 font-semibold text-slate-600">Ocupación</th>
                        <th className="text-left py-4 px-6 font-semibold text-slate-600">Producción/Día</th>
                        <th className="text-left py-4 px-6 font-semibold text-slate-600">Eficiencia</th>
                        <th className="text-left py-4 px-6 font-semibold text-slate-600">Sanidad</th>
                        <th className="text-left py-4 px-6 font-semibold text-slate-600">Ambiente</th>
                        <th className="text-center py-4 px-6 font-semibold text-slate-600">Acciones</th>
                      </tr>
                    </thead>
                    <tbody>
                      {galpones.map((galpone) => (
                        <tr key={galpone.id} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                          <td className="py-4 px-6 font-semibold text-slate-900">{galpone.nombre}</td>
                          <td className="py-4 px-6 text-slate-700">{galpone.loteActual}</td>
                          <td className="py-4 px-6 text-slate-900">{galpone.gallinasActuales.toLocaleString()}</td>
                          <td className="py-4 px-6 text-slate-900">{galpone.capacidad.toLocaleString()}</td>
                          <td className="py-4 px-6">
                            <div className="flex items-center gap-2">
                              <div className="w-20 h-2 bg-slate-200 rounded-full overflow-hidden">
                                <div
                                  className="h-full bg-emerald-500"
                                  style={{ width: `${(galpone.gallinasActuales / galpone.capacidad) * 100}%` }}
                                ></div>
                              </div>
                              <span className="text-xs font-bold text-slate-600">
                                {((galpone.gallinasActuales / galpone.capacidad) * 100).toFixed(0)}%
                              </span>
                            </div>
                          </td>
                          <td className="py-4 px-6 text-slate-900 font-medium">{galpone.produccionDiaria.toLocaleString()}</td>
                          <td className="py-4 px-6">
                            <span className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-700">
                              {galpone.eficiencia}%
                            </span>
                          </td>
                          <td className="py-4 px-6">
                            <StatusBadge status={galpone.estadoSanitario} variant="success" size="sm" />
                          </td>
                          <td className="py-4 px-6">
                            <StatusBadge status={galpone.estadoAmbiental} variant="success" size="sm" />
                          </td>
                          <td className="py-4 px-6 text-center">
                            <div className="flex items-center justify-center gap-2">
                              <Link
                                href={`/galpones/${galpone.id}`}
                                className="inline-flex items-center justify-center w-8 h-8 rounded hover:bg-blue-100 transition-colors text-blue-600"
                                title="Ver detalles"
                              >
                                <Eye className="w-4 h-4" />
                              </Link>
                              <button
                                className="inline-flex items-center justify-center w-8 h-8 rounded hover:bg-emerald-100 transition-colors text-emerald-600"
                                title="Editar"
                              >
                                <Edit2 className="w-4 h-4" />
                              </button>
                              <button
                                className="inline-flex items-center justify-center w-8 h-8 rounded hover:bg-red-100 transition-colors text-red-600"
                                title="Eliminar"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* Monitoreo Ambiental */}
          {activeTab === 'monitoreo' && (
            <div className="space-y-6">
              <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
                <h3 className="text-lg font-bold text-slate-900 mb-4">Temperatura Dentro de Galpones</h3>
                <ResponsiveContainer width="100%" height={350}>
                  <LineChart data={tiendoTemperatura}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                    <XAxis dataKey="fecha" fontSize={12} />
                    <YAxis fontSize={12} domain={[15, 30]} label={{ value: '°C', angle: -90, position: 'insideLeft' }} />
                    <Tooltip formatter={(value) => `${value}°C`} />
                    <Legend />
                    <Line type="monotone" dataKey="g001" stroke="#10b981" strokeWidth={2} name="G001" dot={{ r: 4 }} />
                    <Line type="monotone" dataKey="g002" stroke="#3b82f6" strokeWidth={2} name="G002" dot={{ r: 4 }} />
                    <Line type="monotone" dataKey="g003" stroke="#f59e0b" strokeWidth={2} name="G003" dot={{ r: 4 }} />
                    <Line type="monotone" dataKey="g004" stroke="#8b5cf6" strokeWidth={2} name="G004" dot={{ r: 4 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
                  <h3 className="text-lg font-bold text-slate-900 mb-4">Consumo de Alimento</h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={galpones.map((g) => ({ nombre: g.nombre, consumo: g.consumoAlimento }))}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                      <XAxis dataKey="nombre" fontSize={12} />
                      <YAxis fontSize={12} label={{ value: 'kg/día', angle: -90, position: 'insideLeft' }} />
                      <Tooltip />
                      <Bar dataKey="consumo" fill="#10b981" radius={[8, 8, 0, 0]} name="Alimento (kg)" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>

                <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
                  <h3 className="text-lg font-bold text-slate-900 mb-4">Consumo de Agua</h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={galpones.map((g) => ({ nombre: g.nombre, consumo: g.consumoAgua }))}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                      <XAxis dataKey="nombre" fontSize={12} />
                      <YAxis fontSize={12} label={{ value: 'L/día', angle: -90, position: 'insideLeft' }} />
                      <Tooltip />
                      <Bar dataKey="consumo" fill="#3b82f6" radius={[8, 8, 0, 0]} name="Agua (L)" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl border border-blue-200 p-6">
                <h3 className="text-lg font-bold text-slate-900 mb-4">Parámetros Ambientales Actuales</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {galpones.map((g) => (
                    <div key={g.id} className="bg-white rounded-lg p-4 border border-blue-100">
                      <p className="text-sm font-semibold text-slate-900 mb-3">{g.nombre}</p>
                      <div className="space-y-2 text-xs">
                        <div className="flex items-center justify-between">
                          <span className="text-slate-600">Temperatura:</span>
                          <span className="font-bold text-slate-900">{g.temperatura}°C</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-slate-600">Humedad:</span>
                          <span className="font-bold text-slate-900">{g.humedad}%</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-slate-600">Alimento:</span>
                          <span className="font-bold text-slate-900">{g.consumoAlimento} kg</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-slate-600">Agua:</span>
                          <span className="font-bold text-slate-900">{g.consumoAgua} L</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Rendimiento */}
          {activeTab === 'rendimiento' && (
            <div className="space-y-6">
              <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
                <h3 className="text-lg font-bold text-slate-900 mb-4">Análisis de Rendimiento</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <RadarChart data={performanceMetricas}>
                    <PolarGrid stroke="#e2e8f0" />
                    <PolarAngleAxis dataKey="metrica" fontSize={11} />
                    <PolarRadiusAxis angle={90} domain={[0, 100]} fontSize={10} />
                    <Radar
                      name="Rendimiento"
                      dataKey="valor"
                      stroke="#10b981"
                      fill="#10b981"
                      fillOpacity={0.6}
                    />
                    <Tooltip formatter={(value: any) => value ? `${(value as number).toFixed(1)}%` : '0%'} />
                  </RadarChart>
                </ResponsiveContainer>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {galpones.map((g) => (
                  <div
                    key={g.id}
                    className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm hover:shadow-md transition-shadow"
                  >
                    <h4 className="text-sm font-bold text-slate-900 mb-4">{g.nombre}</h4>
                    <div className="space-y-3">
                      <div>
                        <div className="flex justify-between items-center mb-1">
                          <p className="text-xs text-slate-600">Eficiencia</p>
                          <p className="text-xs font-bold text-slate-900">{g.eficiencia}%</p>
                        </div>
                        <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-emerald-500"
                            style={{ width: `${g.eficiencia}%` }}
                          ></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between items-center mb-1">
                          <p className="text-xs text-slate-600">Producción/Día</p>
                          <p className="text-xs font-bold text-slate-900">{(g.produccionDiaria / 1000).toFixed(1)}K</p>
                        </div>
                        <div className="text-xs text-blue-600 font-semibold">
                          {g.produccionDiaria.toLocaleString()} huevos
                        </div>
                      </div>
                      <div className="flex items-center gap-1 text-xs text-slate-500 pt-2 border-t border-slate-100">
                        <CheckCircle className="w-3 h-3 text-emerald-600" />
                        Operativo
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
                <h3 className="text-lg font-bold text-slate-900 mb-4">Comparativa de Producción</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={galpones.map((g) => ({ nombre: g.nombre, produccion: g.produccionDiaria, eficiencia: g.eficiencia }))}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                    <XAxis dataKey="nombre" fontSize={12} />
                    <YAxis yAxisId="left" fontSize={12} label={{ value: 'Huevos', angle: -90, position: 'insideLeft' }} />
                    <YAxis yAxisId="right" orientation="right" fontSize={12} label={{ value: '%', angle: 90, position: 'insideRight' }} />
                    <Tooltip />
                    <Legend />
                    <Bar yAxisId="left" dataKey="produccion" fill="#10b981" name="Producción Diaria" radius={[8, 8, 0, 0]} />
                    <Bar yAxisId="right" dataKey="eficiencia" fill="#3b82f6" name="Eficiencia %" radius={[8, 8, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          )}

          {/* Alertas y Problemas */}
          {activeTab === 'alertas' && (
            <div className="space-y-6">
              <h3 className="text-lg font-bold text-slate-900">Alertas y Problemas Detectados</h3>
              <div className="space-y-3">
                {alertasGalpones.map((alerta) => (
                  <div
                    key={alerta.id}
                    className={`p-4 rounded-lg border-l-4 ${
                      alerta.nivel === 'critical'
                        ? 'bg-red-50 border-l-red-500'
                        : alerta.nivel === 'warning'
                        ? 'bg-orange-50 border-l-orange-500'
                        : 'bg-blue-50 border-l-blue-500'
                    }`}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex items-start gap-3">
                        {alerta.nivel === 'critical' && (
                          <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                        )}
                        {alerta.nivel === 'warning' && (
                          <AlertCircle className="w-5 h-5 text-orange-600 flex-shrink-0 mt-0.5" />
                        )}
                        {alerta.nivel === 'info' && (
                          <Clock className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                        )}
                        <div>
                          <p className={`font-semibold text-sm ${
                            alerta.nivel === 'critical'
                              ? 'text-red-900'
                              : alerta.nivel === 'warning'
                              ? 'text-orange-900'
                              : 'text-blue-900'
                          }`}>
                            {alerta.tipo} - {alerta.galpone}
                          </p>
                          <p className="text-sm text-slate-600 mt-1">{alerta.descripcion}</p>
                        </div>
                      </div>
                      <span className="text-xs text-slate-500 whitespace-nowrap ml-4">{alerta.fecha}</span>
                    </div>
                    <div className="flex gap-2 ml-8">
                      <button className="text-xs px-3 py-1 rounded hover:bg-slate-200 font-medium text-slate-700 transition-colors">
                        Ver Detalles
                      </button>
                      <button className="text-xs px-3 py-1 rounded bg-slate-200 hover:bg-slate-300 font-medium text-slate-700 transition-colors">
                        Resolver
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-xl border border-emerald-200 p-6">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-slate-900">Recomendaciones de Mejora</p>
                    <ul className="text-sm text-slate-700 mt-2 space-y-1">
                      <li>• Revisar sistema de ventilación en G003 para controlar temperatura</li>
                      <li>• Realizar mantenimiento preventivo de sensores en G002</li>
                      <li>• Verificar abastecimiento de agua en G001</li>
                      <li>• Inspeccionar nidales en G003 para reducir huevos sucios</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Acciones Rápidas */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
        <h3 className="text-lg font-bold text-slate-900 mb-4">Acciones Rápidas</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <Link
            href="/galpones/nuevo"
            className="p-4 bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-lg hover:shadow-md transition-shadow border border-emerald-200"
          >
            <Plus className="w-6 h-6 text-emerald-600 mb-2" />
            <p className="text-sm font-semibold text-slate-900">Crear Galpón</p>
          </Link>
          <button className="p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg hover:shadow-md transition-shadow border border-blue-200">
            <Download className="w-6 h-6 text-blue-600 mb-2" />
            <p className="text-sm font-semibold text-slate-900">Exportar Datos</p>
          </button>
          <button className="p-4 bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg hover:shadow-md transition-shadow border border-purple-200">
            <BarChart3 className="w-6 h-6 text-purple-600 mb-2" />
            <p className="text-sm font-semibold text-slate-900">Análisis Avanzado</p>
          </button>
          <button className="p-4 bg-gradient-to-br from-orange-50 to-orange-100 rounded-lg hover:shadow-md transition-shadow border border-orange-200">
            <AlertCircle className="w-6 h-6 text-orange-600 mb-2" />
            <p className="text-sm font-semibold text-slate-900">Ver Alertas</p>
          </button>
        </div>
      </div>
    </div>
  );
}
