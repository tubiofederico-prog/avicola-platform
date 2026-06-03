'use client';

import { useState } from 'react';
import { Tabs } from '@/components/tabs';
import { StatusBadge } from '@/components/status-badge';
import { CardKPI } from '@/components/card-kpi';
import { alertas, galpones } from '@/lib/mock-data';
import {
  AlertCircle,
  Clock,
  CheckCircle,
  Eye,
  Edit,
  Trash2,
  Plus,
  Filter,
  TrendingUp,
  Bell,
  AlertTriangle,
  Activity,
} from 'lucide-react';
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar } from 'recharts';

// Mock data for charts
const alertasTimeline = [
  { fecha: 'Lunes', criticas: 3, altas: 5, medias: 8 },
  { fecha: 'Martes', criticas: 2, altas: 6, medias: 7 },
  { fecha: 'Miércoles', criticas: 4, altas: 4, medias: 9 },
  { fecha: 'Jueves', criticas: 1, altas: 7, medias: 6 },
  { fecha: 'Viernes', criticas: 2, altas: 5, medias: 8 },
  { fecha: 'Sábado', criticas: 3, altas: 6, medias: 7 },
  { fecha: 'Domingo', criticas: 1, altas: 4, medias: 5 },
];

const alertasPorTipo = [
  { tipo: 'Productiva', cantidad: 4, color: '#3b82f6' },
  { tipo: 'Sanitaria', cantidad: 2, color: '#ef4444' },
  { tipo: 'Ambiental', cantidad: 1, color: '#f59e0b' },
  { tipo: 'Consumo', cantidad: 1, color: '#8b5cf6' },
];

interface AlertaDetalle {
  id: string;
  tipo: string;
  prioridad: string;
  fecha: string;
  galpone: string;
  lote?: string;
  descripcion: string;
  estado: string;
  accionRecomendada: string;
  galponeNombre?: string;
}

export default function AlertasPage() {
  const [filterEstado, setFilterEstado] = useState<string>('todas');
  const [filterPrioridad, setFilterPrioridad] = useState<string>('todas');
  const [filterTipo, setFilterTipo] = useState<string>('todas');
  const [searchTerm, setSearchTerm] = useState<string>('');

  // Enriquece las alertas con nombres de galpones
  const alertasEnriquecidas: AlertaDetalle[] = alertas.map(a => ({
    ...a,
    galponeNombre: galpones.find(g => g.id === a.galpone)?.nombre || a.galpone,
  }));

  // Filtrado de alertas
  const alertasFiltradas = alertasEnriquecidas.filter(a => {
    const estadoMatch = filterEstado === 'todas' || a.estado === filterEstado;
    const prioridadMatch = filterPrioridad === 'todas' || a.prioridad === filterPrioridad;
    const tipoMatch = filterTipo === 'todas' || a.tipo === filterTipo;
    const searchMatch = a.descripcion.toLowerCase().includes(searchTerm.toLowerCase());
    return estadoMatch && prioridadMatch && tipoMatch && searchMatch;
  });

  // Estadísticas
  const criticas = alertasEnriquecidas.filter(a => a.prioridad === 'Crítica').length;
  const activas = alertasEnriquecidas.filter(a => a.estado === 'Activa').length;
  const resueltas = alertasEnriquecidas.filter(a => a.estado === 'Resuelta').length;
  const enRevision = alertasEnriquecidas.filter(a => a.estado === 'En revisión').length;
  const tiempoPromedio = 4.2; // horas

  const getPrioridadColor = (prioridad: string) => {
    switch (prioridad) {
      case 'Crítica':
        return 'bg-red-50 border-red-500 text-red-900';
      case 'Alta':
        return 'bg-orange-50 border-orange-500 text-orange-900';
      case 'Media':
        return 'bg-yellow-50 border-yellow-500 text-yellow-900';
      default:
        return 'bg-blue-50 border-blue-500 text-blue-900';
    }
  };

  const getTipoBadgeColor = (tipo: string) => {
    switch (tipo) {
      case 'Sanitaria':
        return 'bg-red-100 text-red-800';
      case 'Productiva':
        return 'bg-blue-100 text-blue-800';
      case 'Ambiental':
        return 'bg-orange-100 text-orange-800';
      case 'Consumo':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-slate-100 text-slate-800';
    }
  };

  // Tab: Todas las alertas (con tabla mejorada)
  const tabTodas = (
    <div className="space-y-6">
      {/* Filtros */}
      <div className="bg-white rounded-lg border border-slate-200 p-4">
        <div className="flex flex-wrap gap-3 items-center">
          <Filter className="w-5 h-5 text-slate-600" />

          <input
            type="text"
            placeholder="Buscar alertas..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
          />

          <select
            value={filterEstado}
            onChange={(e) => setFilterEstado(e.target.value)}
            className="px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
          >
            <option value="todas">Todos los estados</option>
            <option value="Activa">Activa</option>
            <option value="En revisión">En revisión</option>
            <option value="Resuelta">Resuelta</option>
          </select>

          <select
            value={filterPrioridad}
            onChange={(e) => setFilterPrioridad(e.target.value)}
            className="px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
          >
            <option value="todas">Todas las prioridades</option>
            <option value="Crítica">Crítica</option>
            <option value="Alta">Alta</option>
            <option value="Media">Media</option>
            <option value="Baja">Baja</option>
          </select>

          <select
            value={filterTipo}
            onChange={(e) => setFilterTipo(e.target.value)}
            className="px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
          >
            <option value="todas">Todos los tipos</option>
            <option value="Sanitaria">Sanitaria</option>
            <option value="Productiva">Productiva</option>
            <option value="Ambiental">Ambiental</option>
            <option value="Consumo">Consumo</option>
          </select>
        </div>
      </div>

      {/* Tabla de alertas */}
      <div className="bg-white rounded-lg border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-700 uppercase">ID</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-700 uppercase">Descripción</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-700 uppercase">Tipo</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-700 uppercase">Galpón</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-700 uppercase">Prioridad</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-700 uppercase">Estado</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-700 uppercase">Fecha</th>
                <th className="px-6 py-3 text-center text-xs font-semibold text-slate-700 uppercase">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {alertasFiltradas.length > 0 ? (
                alertasFiltradas.map((a) => (
                  <tr key={a.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4 text-sm font-medium text-slate-900">{a.id}</td>
                    <td className="px-6 py-4 text-sm text-slate-700 max-w-xs truncate">{a.descripcion}</td>
                    <td className="px-6 py-4 text-sm">
                      <span className={`inline-block px-2.5 py-1 rounded-full text-xs font-medium ${getTipoBadgeColor(a.tipo)}`}>
                        {a.tipo}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-700">{a.galponeNombre}</td>
                    <td className="px-6 py-4 text-sm">
                      <span className={`inline-block px-2.5 py-1 rounded-full text-xs font-medium ${
                        a.prioridad === 'Crítica' ? 'bg-red-100 text-red-800' :
                        a.prioridad === 'Alta' ? 'bg-orange-100 text-orange-800' :
                        a.prioridad === 'Media' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-blue-100 text-blue-800'
                      }`}>
                        {a.prioridad}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <span className={`inline-block px-2.5 py-1 rounded-full text-xs font-medium ${
                        a.estado === 'Activa' ? 'bg-red-100 text-red-800' :
                        a.estado === 'En revisión' ? 'bg-blue-100 text-blue-800' :
                        'bg-emerald-100 text-emerald-800'
                      }`}>
                        {a.estado}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-600">{a.fecha}</td>
                    <td className="px-6 py-4 text-center">
                      <div className="flex gap-2 justify-center">
                        <button className="p-1.5 hover:bg-slate-100 rounded-lg transition-colors text-slate-600 hover:text-slate-900" title="Ver detalles">
                          <Eye className="w-4 h-4" />
                        </button>
                        <button className="p-1.5 hover:bg-slate-100 rounded-lg transition-colors text-slate-600 hover:text-slate-900" title="Editar">
                          <Edit className="w-4 h-4" />
                        </button>
                        <button className="p-1.5 hover:bg-red-100 rounded-lg transition-colors text-slate-600 hover:text-red-600" title="Eliminar">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={8} className="px-6 py-8 text-center text-slate-600">
                    No se encontraron alertas con los filtros seleccionados
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  // Tab: Análisis y visualizaciones
  const tabAnalisis = (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Gráfico: Alertas por prioridad en el tiempo */}
        <div className="bg-white rounded-lg border border-slate-200 p-6">
          <h3 className="text-lg font-semibold text-slate-900 mb-4">Tendencia de Alertas (Últimos 7 días)</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={alertasTimeline}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="fecha" stroke="#94a3b8" />
              <YAxis stroke="#94a3b8" />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#f8fafc',
                  border: '1px solid #e2e8f0',
                  borderRadius: '8px',
                }}
              />
              <Legend />
              <Line type="monotone" dataKey="criticas" stroke="#ef4444" strokeWidth={2} name="Críticas" />
              <Line type="monotone" dataKey="altas" stroke="#f59e0b" strokeWidth={2} name="Altas" />
              <Line type="monotone" dataKey="medias" stroke="#eab308" strokeWidth={2} name="Medias" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Gráfico: Alertas por tipo */}
        <div className="bg-white rounded-lg border border-slate-200 p-6">
          <h3 className="text-lg font-semibold text-slate-900 mb-4">Distribución por Tipo</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={alertasPorTipo}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="tipo" stroke="#94a3b8" />
              <YAxis stroke="#94a3b8" />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#f8fafc',
                  border: '1px solid #e2e8f0',
                  borderRadius: '8px',
                }}
              />
              <Bar dataKey="cantidad" fill="#06b6d4" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Estadísticas detalladas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg border border-slate-200 p-4">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-xs text-slate-600 font-medium uppercase">Tasa de Resolución</p>
              <p className="text-2xl font-bold text-slate-900 mt-2">78%</p>
              <p className="text-xs text-emerald-600 font-semibold mt-1">+5% vs semana anterior</p>
            </div>
            <TrendingUp className="w-5 h-5 text-emerald-600" />
          </div>
        </div>

        <div className="bg-white rounded-lg border border-slate-200 p-4">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-xs text-slate-600 font-medium uppercase">Tiempo Promedio</p>
              <p className="text-2xl font-bold text-slate-900 mt-2">{tiempoPromedio}h</p>
              <p className="text-xs text-slate-600 mt-1">Resolución de alertas</p>
            </div>
            <Clock className="w-5 h-5 text-blue-600" />
          </div>
        </div>

        <div className="bg-white rounded-lg border border-slate-200 p-4">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-xs text-slate-600 font-medium uppercase">Galpones Afectados</p>
              <p className="text-2xl font-bold text-slate-900 mt-2">3</p>
              <p className="text-xs text-slate-600 mt-1">De 4 galpones</p>
            </div>
            <AlertTriangle className="w-5 h-5 text-orange-600" />
          </div>
        </div>

        <div className="bg-white rounded-lg border border-slate-200 p-4">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-xs text-slate-600 font-medium uppercase">Frecuencia Críticas</p>
              <p className="text-2xl font-bold text-slate-900 mt-2">2.1</p>
              <p className="text-xs text-slate-600 mt-1">Por semana</p>
            </div>
            <Activity className="w-5 h-5 text-red-600" />
          </div>
        </div>
      </div>
    </div>
  );

  // Tab: Alertas críticas con acciones recomendadas
  const tabCriticas = (
    <div className="space-y-4">
      {alertasEnriquecidas.filter(a => a.prioridad === 'Crítica').length > 0 ? (
        alertasEnriquecidas.filter(a => a.prioridad === 'Crítica').map((a) => (
          <div key={a.id} className="bg-red-50 border-l-4 border-red-500 rounded-lg p-6 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-start gap-4">
                <div className="p-2 bg-red-200 rounded-lg">
                  <AlertCircle className="w-6 h-6 text-red-700" />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="text-lg font-bold text-red-900">{a.descripcion}</h3>
                    <span className="inline-block px-2.5 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
                      {a.tipo}
                    </span>
                  </div>
                  <p className="text-sm text-red-800 mb-3">
                    <strong>Ubicación:</strong> {a.galponeNombre} {a.lote && `• Lote: ${a.lote}`}
                  </p>
                  <div className="bg-red-100 rounded-lg p-3 mb-3">
                    <p className="text-sm font-semibold text-red-900 mb-1">Acción Recomendada:</p>
                    <p className="text-sm text-red-800">{a.accionRecomendada}</p>
                  </div>
                  <p className="text-xs text-red-700">Reportada el {a.fecha}</p>
                </div>
              </div>
              <div className="flex gap-2">
                <button className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium text-sm transition-colors">
                  Resolver Ahora
                </button>
                <button className="px-4 py-2 bg-white border border-red-300 hover:bg-red-50 text-red-600 rounded-lg font-medium text-sm transition-colors">
                  Más Info
                </button>
              </div>
            </div>
            <div className="flex gap-2 pt-3 border-t border-red-200">
              <span className="text-xs font-medium text-red-700 bg-white px-2 py-1 rounded">ID: {a.id}</span>
              <span className={`text-xs font-medium px-2 py-1 rounded ${
                a.estado === 'Activa' ? 'bg-red-100 text-red-800' :
                a.estado === 'En revisión' ? 'bg-blue-100 text-blue-800' :
                'bg-emerald-100 text-emerald-800'
              }`}>
                {a.estado}
              </span>
            </div>
          </div>
        ))
      ) : (
        <div className="text-center py-12">
          <CheckCircle className="w-12 h-12 text-emerald-600 mx-auto mb-3" />
          <p className="text-lg font-semibold text-slate-900">¡Excelente!</p>
          <p className="text-slate-600">No hay alertas críticas en este momento</p>
        </div>
      )}
    </div>
  );

  // Tab: Historial y comparativa
  const tabHistorial = (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Área chart: Evolución de alertas */}
        <div className="bg-white rounded-lg border border-slate-200 p-6">
          <h3 className="text-lg font-semibold text-slate-900 mb-4">Evolución de Alertas Activas</h3>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={alertasTimeline}>
              <defs>
                <linearGradient id="colorCriticas" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#ef4444" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="fecha" stroke="#94a3b8" />
              <YAxis stroke="#94a3b8" />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#f8fafc',
                  border: '1px solid #e2e8f0',
                  borderRadius: '8px',
                }}
              />
              <Area
                type="monotone"
                dataKey="criticas"
                stroke="#ef4444"
                fillOpacity={1}
                fill="url(#colorCriticas)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Resumen de actividad */}
        <div className="bg-white rounded-lg border border-slate-200 p-6 space-y-4">
          <h3 className="text-lg font-semibold text-slate-900">Actividad Reciente</h3>
          <div className="space-y-3">
            {[
              { tiempo: 'Hace 2 horas', accion: 'Alerta crítica resuelta', tipo: 'success' },
              { tiempo: 'Hace 4 horas', accion: 'Nueva alerta alta creada', tipo: 'warning' },
              { tiempo: 'Hace 6 horas', accion: 'Alerta crítica en revisión', tipo: 'error' },
              { tiempo: 'Ayer', accion: '3 alertas resueltas', tipo: 'success' },
            ].map((item, idx) => (
              <div key={idx} className="flex items-start gap-3 pb-3 border-b border-slate-100 last:border-0 last:pb-0">
                <div className={`p-2 rounded-lg mt-0.5 ${
                  item.tipo === 'success' ? 'bg-emerald-100' :
                  item.tipo === 'warning' ? 'bg-orange-100' :
                  'bg-red-100'
                }`}>
                  {item.tipo === 'success' ? (
                    <CheckCircle className={`w-4 h-4 ${
                      item.tipo === 'success' ? 'text-emerald-600' :
                      item.tipo === 'warning' ? 'text-orange-600' :
                      'text-red-600'
                    }`} />
                  ) : (
                    <AlertCircle className={`w-4 h-4 ${
                      item.tipo === 'success' ? 'text-emerald-600' :
                      item.tipo === 'warning' ? 'text-orange-600' :
                      'text-red-600'
                    }`} />
                  )}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-slate-900">{item.accion}</p>
                  <p className="text-xs text-slate-600">{item.tiempo}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Tabla de historial */}
      <div className="bg-white rounded-lg border border-slate-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-200">
          <h3 className="text-lg font-semibold text-slate-900">Historial Completo</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-700 uppercase">Alerta</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-700 uppercase">Creada</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-700 uppercase">Resuelta</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-700 uppercase">Tiempo Total</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-700 uppercase">Estado Final</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {alertasEnriquecidas.map((a, idx) => (
                <tr key={a.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4 text-sm text-slate-900">{a.descripcion.substring(0, 40)}...</td>
                  <td className="px-6 py-4 text-sm text-slate-600">{a.fecha}</td>
                  <td className="px-6 py-4 text-sm text-slate-600">{a.estado === 'Resuelta' ? a.fecha : 'Pendiente'}</td>
                  <td className="px-6 py-4 text-sm text-slate-600">{idx === 0 ? '2.5h' : idx === 1 ? '6h' : '12h'}</td>
                  <td className="px-6 py-4 text-sm">
                    <span className={`inline-block px-2.5 py-1 rounded-full text-xs font-medium ${
                      a.estado === 'Resuelta' ? 'bg-emerald-100 text-emerald-800' :
                      a.estado === 'Activa' ? 'bg-red-100 text-red-800' :
                      'bg-blue-100 text-blue-800'
                    }`}>
                      {a.estado}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const tabs = [
    {
      id: 'dashboard',
      label: 'Panel de Control',
      icon: <AlertCircle className="w-4 h-4" />,
      content: tabTodas,
    },
    {
      id: 'criticas',
      label: `Críticas (${criticas})`,
      icon: <AlertTriangle className="w-4 h-4" />,
      content: tabCriticas,
    },
    {
      id: 'analisis',
      label: 'Análisis',
      icon: <TrendingUp className="w-4 h-4" />,
      content: tabAnalisis,
    },
    {
      id: 'historial',
      label: 'Historial',
      icon: <Clock className="w-4 h-4" />,
      content: tabHistorial,
    },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-4xl font-bold text-slate-900">Centro de Alertas</h1>
          <p className="text-slate-600 mt-1">Gestión centralizada de alertas del sistema de la granja</p>
        </div>
        <button className="flex items-center gap-2 px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-semibold transition-colors">
          <Plus className="w-5 h-5" />
          Nueva Alerta
        </button>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <CardKPI
          title="Total Activas"
          value={activas}
          unit="pendientes"
          icon={<Bell className="w-6 h-6" />}
          color="red"
        />
        <CardKPI
          title="Críticas"
          value={criticas}
          unit="urgentes"
          icon={<AlertCircle className="w-6 h-6" />}
          color="red"
        />
        <CardKPI
          title="En Revisión"
          value={enRevision}
          unit="en proceso"
          icon={<Clock className="w-6 h-6" />}
          color="orange"
        />
        <CardKPI
          title="Resueltas"
          value={resueltas}
          unit="completadas"
          icon={<CheckCircle className="w-6 h-6" />}
          color="emerald"
        />
        <CardKPI
          title="Tiempo Promedio"
          value={tiempoPromedio}
          unit="horas"
          icon={<TrendingUp className="w-6 h-6" />}
          color="blue"
        />
      </div>

      {/* Tabs */}
      <Tabs tabs={tabs} defaultTab="dashboard" />
    </div>
  );
}
