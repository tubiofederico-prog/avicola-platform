'use client';

import React, { useState } from 'react';
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
  Area,
  AreaChart,
} from 'recharts';
import {
  FileText,
  Download,
  Plus,
  Edit2,
  Trash2,
  Filter,
  Calendar,
  TrendingUp,
  BarChart3,
  PieChart as PieChartIcon,
  Eye,
  Share2,
  Settings,
  ChevronDown,
} from 'lucide-react';

// Mock data for reports
const reportesData = [
  {
    id: 1,
    nombre: 'Producción Mensual',
    tipo: 'Generado',
    fechaCreacion: '2024-06-15',
    ultimaActualizacion: '2024-06-20',
    estado: 'Activo',
    descripcion: 'Reporte detallado de producción del mes',
    descargas: 245,
  },
  {
    id: 2,
    nombre: 'Análisis de Costos',
    tipo: 'Programado',
    fechaCreacion: '2024-05-10',
    ultimaActualizacion: '2024-06-18',
    estado: 'Activo',
    descripcion: 'Análisis comparativo de costos operativos',
    descargas: 128,
  },
  {
    id: 3,
    nombre: 'Rendimiento Aviario',
    tipo: 'Generado',
    fechaCreacion: '2024-04-20',
    ultimaActualizacion: '2024-06-19',
    estado: 'Activo',
    descripcion: 'Métricas de desempeño por aviario',
    descargas: 312,
  },
  {
    id: 4,
    nombre: 'Inventario',
    tipo: 'Programado',
    fechaCreacion: '2024-03-05',
    ultimaActualizacion: '2024-06-17',
    estado: 'Inactivo',
    descripcion: 'Movimiento de inventario y stock',
    descargas: 89,
  },
];

// Mock data for production chart
const produccionChartData = [
  { mes: 'Ene', huevos: 4200, alimento: 3800, mortalidad: 2.1 },
  { mes: 'Feb', huevos: 4500, alimento: 3900, mortalidad: 1.9 },
  { mes: 'Mar', huevos: 4800, alimento: 4100, mortalidad: 2.0 },
  { mes: 'Abr', huevos: 5100, alimento: 4200, mortalidad: 1.8 },
  { mes: 'May', huevos: 5400, alimento: 4300, mortalidad: 1.7 },
  { mes: 'Jun', huevos: 5600, alimento: 4400, mortalidad: 1.6 },
];

// Mock data for distribution
const distribucionData = [
  { name: 'Aviario A', value: 2200, color: '#0EA5E9' },
  { name: 'Aviario B', value: 1800, color: '#06B6D4' },
  { name: 'Aviario C', value: 1600, color: '#10B981' },
  { name: 'Aviario D', value: 1400, color: '#8B5CF6' },
];

// Mock data for costs
const costosData = [
  { categoria: 'Alimento', valor: 45000, porcentaje: 35 },
  { categoria: 'Personal', valor: 30000, porcentaje: 23 },
  { categoria: 'Servicios', valor: 25000, porcentaje: 19 },
  { categoria: 'Medicinas', valor: 18000, porcentaje: 14 },
  { categoria: 'Mantenimiento', valor: 12000, porcentaje: 9 },
];

// Mock data for KPIs
const kpisData = [
  {
    id: 1,
    titulo: 'Producción Total',
    valor: '5,600',
    unidad: 'huevos/día',
    cambio: '+12.5%',
    trend: 'up',
    color: 'from-blue-500 to-cyan-500',
  },
  {
    id: 2,
    titulo: 'Tasa de Conversión',
    valor: '2.45',
    unidad: 'kg alimento/kg huevo',
    cambio: '-3.2%',
    trend: 'down',
    color: 'from-emerald-500 to-teal-500',
  },
  {
    id: 3,
    titulo: 'Mortalidad',
    valor: '1.6%',
    unidad: 'de población',
    cambio: '-0.8%',
    trend: 'down',
    color: 'from-purple-500 to-pink-500',
  },
  {
    id: 4,
    titulo: 'Costo x Huevo',
    valor: '$0.24',
    unidad: 'unitario',
    cambio: '-5.1%',
    trend: 'down',
    color: 'from-orange-500 to-red-500',
  },
];

export default function ReportesPage() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [selectedReport, setSelectedReport] = useState<number | null>(null);
  const [filterStatus, setFilterStatus] = useState('todos');
  const [dateRange, setDateRange] = useState({ start: '', end: '' });
  const [showFilters, setShowFilters] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-50">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-white border-b border-slate-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500">
                <BarChart3 className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-slate-900">
                  Reportes y Analítica
                </h1>
                <p className="text-sm text-slate-600">
                  Generación de reportes integrados y análisis de datos
                </p>
              </div>
            </div>
            <button className="px-4 py-2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-lg hover:shadow-lg transition-shadow flex items-center gap-2 font-medium">
              <Plus className="w-5 h-5" />
              Nuevo Reporte
            </button>
          </div>

          {/* Tabs */}
          <div className="flex gap-1 border-b border-slate-200">
            {[
              { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
              { id: 'reportes', label: 'Mis Reportes', icon: FileText },
              { id: 'analisis', label: 'Análisis Detallado', icon: TrendingUp },
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-4 py-3 font-medium flex items-center gap-2 transition-all border-b-2 -mb-[2px] ${
                    activeTab === tab.id
                      ? 'text-blue-600 border-blue-600'
                      : 'text-slate-600 border-transparent hover:text-slate-900'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Dashboard Tab */}
        {activeTab === 'dashboard' && (
          <div className="space-y-8 animate-in fade-in duration-300">
            {/* KPIs Section */}
            <div>
              <h2 className="text-xl font-bold text-slate-900 mb-4">
                Indicadores Clave de Desempeño
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {kpisData.map((kpi) => (
                  <div
                    key={kpi.id}
                    className="bg-white rounded-xl border border-slate-200 p-6 hover:shadow-lg transition-all hover:border-slate-300"
                  >
                    <div className={`bg-gradient-to-br ${kpi.color} p-3 rounded-lg w-fit mb-3`}>
                      <TrendingUp className="w-5 h-5 text-white" />
                    </div>
                    <h3 className="text-sm text-slate-600 font-medium mb-1">
                      {kpi.titulo}
                    </h3>
                    <div className="flex items-baseline justify-between mb-2">
                      <span className="text-2xl font-bold text-slate-900">
                        {kpi.valor}
                      </span>
                      <span
                        className={`text-xs font-semibold ${
                          kpi.trend === 'up'
                            ? 'text-emerald-600 bg-emerald-50'
                            : 'text-blue-600 bg-blue-50'
                        } px-2 py-1 rounded`}
                      >
                        {kpi.cambio}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500">{kpi.unidad}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Production Chart */}
              <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200 p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-lg font-bold text-slate-900">
                      Tendencia de Producción
                    </h3>
                    <p className="text-sm text-slate-600">
                      Últimos 6 meses
                    </p>
                  </div>
                  <button className="p-2 hover:bg-slate-100 rounded-lg transition-colors">
                    <Settings className="w-5 h-5 text-slate-600" />
                  </button>
                </div>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={produccionChartData}>
                    <defs>
                      <linearGradient
                        id="colorHuevos"
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                      >
                        <stop offset="5%" stopColor="#0EA5E9" stopOpacity={0.8} />
                        <stop
                          offset="95%"
                          stopColor="#0EA5E9"
                          stopOpacity={0.1}
                        />
                      </linearGradient>
                    </defs>
                    <CartesianGrid
                      strokeDasharray="3 3"
                      stroke="#e2e8f0"
                      vertical={false}
                    />
                    <XAxis dataKey="mes" stroke="#94a3b8" />
                    <YAxis stroke="#94a3b8" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: '#1e293b',
                        border: 'none',
                        borderRadius: '8px',
                        color: '#fff',
                      }}
                    />
                    <Legend />
                    <Area
                      type="monotone"
                      dataKey="huevos"
                      stroke="#0EA5E9"
                      fillOpacity={1}
                      fill="url(#colorHuevos)"
                      name="Huevos (docenas)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>

              {/* Distribution Pie Chart */}
              <div className="bg-white rounded-xl border border-slate-200 p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-lg font-bold text-slate-900">
                      Distribución Aviarios
                    </h3>
                    <p className="text-sm text-slate-600">Producción actual</p>
                  </div>
                </div>
                <ResponsiveContainer width="100%" height={250}>
                  <PieChart>
                    <Pie
                      data={distribucionData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={90}
                      paddingAngle={2}
                      dataKey="value"
                    >
                      {distribucionData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{
                        backgroundColor: '#1e293b',
                        border: 'none',
                        borderRadius: '8px',
                        color: '#fff',
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
                <div className="mt-4 space-y-2">
                  {distribucionData.map((item, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between text-sm"
                    >
                      <div className="flex items-center gap-2">
                        <div
                          className="w-2 h-2 rounded-full"
                          style={{ backgroundColor: item.color }}
                        />
                        <span className="text-slate-700">{item.name}</span>
                      </div>
                      <span className="font-semibold text-slate-900">
                        {item.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Cost Analysis */}
            <div className="bg-white rounded-xl border border-slate-200 p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-lg font-bold text-slate-900">
                    Análisis de Costos Operativos
                  </h3>
                  <p className="text-sm text-slate-600">Distribución por categoría</p>
                </div>
                <button className="p-2 hover:bg-slate-100 rounded-lg transition-colors">
                  <Download className="w-5 h-5 text-slate-600" />
                </button>
              </div>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={costosData}>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="#e2e8f0"
                    vertical={false}
                  />
                  <XAxis dataKey="categoria" stroke="#94a3b8" />
                  <YAxis stroke="#94a3b8" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#1e293b',
                      border: 'none',
                      borderRadius: '8px',
                      color: '#fff',
                    }}
                  />
                  <Legend />
                  <Bar
                    dataKey="valor"
                    fill="#06B6D4"
                    radius={[8, 8, 0, 0]}
                    name="Valor ($)"
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {/* Reportes Tab */}
        {activeTab === 'reportes' && (
          <div className="space-y-6 animate-in fade-in duration-300">
            {/* Filters */}
            <div className="bg-white rounded-xl border border-slate-200 p-4">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2 text-slate-900 font-medium hover:text-blue-600 transition-colors"
              >
                <Filter className="w-5 h-5" />
                Filtros
                <ChevronDown
                  className={`w-5 h-5 transition-transform ${
                    showFilters ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {showFilters && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4 pt-4 border-t border-slate-200">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Estado
                    </label>
                    <select
                      value={filterStatus}
                      onChange={(e) => setFilterStatus(e.target.value)}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="todos">Todos</option>
                      <option value="activo">Activos</option>
                      <option value="inactivo">Inactivos</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Fecha Inicio
                    </label>
                    <input
                      type="date"
                      value={dateRange.start}
                      onChange={(e) =>
                        setDateRange({ ...dateRange, start: e.target.value })
                      }
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Fecha Fin
                    </label>
                    <input
                      type="date"
                      value={dateRange.end}
                      onChange={(e) =>
                        setDateRange({ ...dateRange, end: e.target.value })
                      }
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Reports Table */}
            <div className="bg-white rounded-xl border border-slate-200 overflow-hidden hover:shadow-lg transition-shadow">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gradient-to-r from-slate-50 to-slate-100 border-b border-slate-200">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-bold text-slate-900 uppercase">
                        Nombre
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-bold text-slate-900 uppercase">
                        Tipo
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-bold text-slate-900 uppercase">
                        Creación
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-bold text-slate-900 uppercase">
                        Última Actualización
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-bold text-slate-900 uppercase">
                        Estado
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-bold text-slate-900 uppercase">
                        Descargas
                      </th>
                      <th className="px-6 py-3 text-center text-xs font-bold text-slate-900 uppercase">
                        Acciones
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    {reportesData.map((report) => (
                      <tr
                        key={report.id}
                        className="hover:bg-slate-50 transition-colors"
                      >
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="p-2 bg-blue-100 rounded-lg">
                              <FileText className="w-4 h-4 text-blue-600" />
                            </div>
                            <div>
                              <p className="font-semibold text-slate-900">
                                {report.nombre}
                              </p>
                              <p className="text-xs text-slate-500">
                                {report.descripcion}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span
                            className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                              report.tipo === 'Generado'
                                ? 'bg-blue-100 text-blue-700'
                                : 'bg-purple-100 text-purple-700'
                            }`}
                          >
                            {report.tipo}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm text-slate-600">
                          {report.fechaCreacion}
                        </td>
                        <td className="px-6 py-4 text-sm text-slate-600">
                          {report.ultimaActualizacion}
                        </td>
                        <td className="px-6 py-4">
                          <span
                            className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                              report.estado === 'Activo'
                                ? 'bg-emerald-100 text-emerald-700'
                                : 'bg-slate-100 text-slate-700'
                            }`}
                          >
                            {report.estado}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm font-medium text-slate-900">
                          {report.descargas}
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center justify-center gap-2">
                            <button
                              onClick={() => setSelectedReport(report.id)}
                              className="p-2 hover:bg-blue-100 rounded-lg transition-colors text-blue-600"
                              title="Ver"
                            >
                              <Eye className="w-4 h-4" />
                            </button>
                            <button
                              className="p-2 hover:bg-amber-100 rounded-lg transition-colors text-amber-600"
                              title="Editar"
                            >
                              <Edit2 className="w-4 h-4" />
                            </button>
                            <button
                              className="p-2 hover:bg-emerald-100 rounded-lg transition-colors text-emerald-600"
                              title="Descargar"
                            >
                              <Download className="w-4 h-4" />
                            </button>
                            <button
                              className="p-2 hover:bg-red-100 rounded-lg transition-colors text-red-600"
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

        {/* Análisis Detallado Tab */}
        {activeTab === 'analisis' && (
          <div className="space-y-6 animate-in fade-in duration-300">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Detailed Production Chart */}
              <div className="bg-white rounded-xl border border-slate-200 p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-lg font-bold text-slate-900">
                      Análisis de Producción Detallado
                    </h3>
                    <p className="text-sm text-slate-600">
                      Comparativo mensual
                    </p>
                  </div>
                  <button className="p-2 hover:bg-slate-100 rounded-lg transition-colors">
                    <Share2 className="w-5 h-5 text-slate-600" />
                  </button>
                </div>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={produccionChartData}>
                    <CartesianGrid
                      strokeDasharray="3 3"
                      stroke="#e2e8f0"
                      vertical={false}
                    />
                    <XAxis dataKey="mes" stroke="#94a3b8" />
                    <YAxis stroke="#94a3b8" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: '#1e293b',
                        border: 'none',
                        borderRadius: '8px',
                        color: '#fff',
                      }}
                    />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="huevos"
                      stroke="#0EA5E9"
                      strokeWidth={2}
                      dot={{ fill: '#0EA5E9', r: 4 }}
                      activeDot={{ r: 6 }}
                      name="Producción Huevos"
                    />
                    <Line
                      type="monotone"
                      dataKey="alimento"
                      stroke="#F59E0B"
                      strokeWidth={2}
                      dot={{ fill: '#F59E0B', r: 4 }}
                      activeDot={{ r: 6 }}
                      name="Consumo Alimento"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              {/* Mortalidad Analysis */}
              <div className="bg-white rounded-xl border border-slate-200 p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-lg font-bold text-slate-900">
                      Tasa de Mortalidad
                    </h3>
                    <p className="text-sm text-slate-600">
                      Seguimiento por aviario
                    </p>
                  </div>
                </div>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={produccionChartData}>
                    <CartesianGrid
                      strokeDasharray="3 3"
                      stroke="#e2e8f0"
                      vertical={false}
                    />
                    <XAxis dataKey="mes" stroke="#94a3b8" />
                    <YAxis stroke="#94a3b8" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: '#1e293b',
                        border: 'none',
                        borderRadius: '8px',
                        color: '#fff',
                      }}
                    />
                    <Legend />
                    <Bar
                      dataKey="mortalidad"
                      fill="#EF4444"
                      radius={[8, 8, 0, 0]}
                      name="Mortalidad (%)"
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Cost Breakdown Cards */}
            <div className="bg-white rounded-xl border border-slate-200 p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-lg font-bold text-slate-900">
                    Desglose Detallado de Costos
                  </h3>
                  <p className="text-sm text-slate-600">
                    Presupuesto total: $130,000
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                {costosData.map((costo, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-lg border border-slate-200 hover:border-slate-300 transition-colors"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-sm font-medium text-slate-600">
                        {costo.categoria}
                      </span>
                      <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded">
                        {costo.porcentaje}%
                      </span>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-2 mb-2">
                      <div
                        className="bg-gradient-to-r from-blue-500 to-cyan-500 h-2 rounded-full"
                        style={{ width: `${costo.porcentaje}%` }}
                      />
                    </div>
                    <p className="text-lg font-bold text-slate-900">
                      ${costo.valor.toLocaleString()}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Export Section */}
            <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl border border-blue-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-bold text-slate-900 mb-1">
                    Exportar Análisis Completo
                  </h3>
                  <p className="text-sm text-slate-600">
                    Descarga todos los datos y gráficos en diferentes formatos
                  </p>
                </div>
                <div className="flex gap-3">
                  <button className="px-4 py-2 bg-white border border-slate-300 text-slate-900 rounded-lg hover:bg-slate-50 transition-colors font-medium flex items-center gap-2">
                    <Download className="w-4 h-4" />
                    PDF
                  </button>
                  <button className="px-4 py-2 bg-white border border-slate-300 text-slate-900 rounded-lg hover:bg-slate-50 transition-colors font-medium flex items-center gap-2">
                    <Download className="w-4 h-4" />
                    Excel
                  </button>
                  <button className="px-4 py-2 bg-white border border-slate-300 text-slate-900 rounded-lg hover:bg-slate-50 transition-colors font-medium flex items-center gap-2">
                    <Share2 className="w-4 h-4" />
                    Compartir
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
