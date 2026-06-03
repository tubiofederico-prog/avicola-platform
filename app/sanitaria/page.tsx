'use client';

import Link from 'next/link';
import { useState } from 'react';
import {
  Activity,
  Pill,
  Syringe,
  AlertCircle,
  CheckCircle2,
  Clock,
  TrendingUp,
  Plus,
  ArrowRight,
  Calendar,
  Download,
  Eye,
} from 'lucide-react';
import {
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

// Mock data for vaccinations and treatments
const vacunacionesData = [
  {
    id: 'VAC001',
    lote: 'A-2026',
    galpone: 'G001',
    vacuna: 'Newcastle',
    fecha: '2026-06-01',
    dosis: '0.5ml',
    responsable: 'Dr. Luis Veterinario',
    estado: 'Completada',
    cobertura: '98%',
    observaciones: 'Aplicado correctamente sin reacciones',
    proximaDosis: '2026-09-01',
  },
  {
    id: 'VAC002',
    lote: 'B-2026',
    galpone: 'G002',
    vacuna: 'Bronquitis Infecciosa',
    fecha: '2026-05-28',
    dosis: '0.5ml',
    responsable: 'Dr. Luis Veterinario',
    estado: 'Completada',
    cobertura: '96%',
    observaciones: 'Lote vacunado en su totalidad',
    proximaDosis: '2026-08-28',
  },
  {
    id: 'VAC003',
    lote: 'C-2025',
    galpone: 'G003',
    vacuna: 'Viruela Aviar',
    fecha: '2026-04-15',
    dosis: '0.5ml',
    responsable: 'Dr. Luis Veterinario',
    estado: 'Completada',
    cobertura: '94%',
    observaciones: 'Refuerzo aplicado',
    proximaDosis: '2026-10-15',
  },
  {
    id: 'VAC004',
    lote: 'D-2025',
    galpone: 'G004',
    vacuna: 'Gumboro',
    fecha: '2026-05-15',
    dosis: '0.3ml',
    responsable: 'Dr. Luis Veterinario',
    estado: 'Pendiente',
    cobertura: '0%',
    observaciones: 'Programada para próxima semana',
    proximaDosis: '2026-06-10',
  },
  {
    id: 'VAC005',
    lote: 'A-2026',
    galpone: 'G001',
    vacuna: 'Salmonela',
    fecha: '2026-03-20',
    dosis: '0.5ml',
    responsable: 'Dr. Luis Veterinario',
    estado: 'Completada',
    cobertura: '99%',
    observaciones: 'Sin incidencias',
    proximaDosis: '2026-12-20',
  },
];

const tratamientosData = [
  {
    id: 'TRT001',
    lote: 'C-2025',
    galpone: 'G003',
    tipo: 'Preventivo',
    nombre: 'Vitaminas y Electrolitos',
    principioActivo: 'Complejo B + Sales minerales',
    dosis: '1kg/1000L agua',
    frecuencia: 'Diaria',
    fechaInicio: '2026-05-28',
    fechaFin: '2026-06-04',
    responsable: 'Dr. Luis Veterinario',
    estado: 'En Curso',
    diasRestantes: 1,
    observaciones: 'Control de estrés post-vacunación',
  },
  {
    id: 'TRT002',
    lote: 'B-2026',
    galpone: 'G002',
    tipo: 'Preventivo',
    nombre: 'Probióticos',
    principioActivo: 'Lactobacilos + Bifidobacterias',
    dosis: '500g/tonelada alimento',
    frecuencia: 'Diaria',
    fechaInicio: '2026-06-01',
    fechaFin: '2026-06-15',
    responsable: 'Dr. Luis Veterinario',
    estado: 'En Curso',
    diasRestantes: 12,
    observaciones: 'Mejora de flora intestinal',
  },
  {
    id: 'TRT003',
    lote: 'A-2026',
    galpone: 'G001',
    tipo: 'Correctivo',
    nombre: 'Antimicrobiano Amplio Espectro',
    principioActivo: 'Enrofloxacina',
    dosis: '10mg/kg/día',
    frecuencia: 'Cada 12 horas',
    fechaInicio: '2026-05-25',
    fechaFin: '2026-05-31',
    responsable: 'Dr. Luis Veterinario',
    estado: 'Completado',
    diasRestantes: 0,
    observaciones: 'Infección respiratoria controlada',
  },
  {
    id: 'TRT004',
    lote: 'D-2025',
    galpone: 'G004',
    tipo: 'Preventivo',
    nombre: 'Antiparasitario',
    principioActivo: 'Levamisol',
    dosis: '8mg/kg',
    frecuencia: 'Única',
    fechaInicio: '2026-06-10',
    fechaFin: '2026-06-10',
    responsable: 'Dr. Luis Veterinario',
    estado: 'Programado',
    diasRestantes: 7,
    observaciones: 'Control de parásitos internos',
  },
];

// Chart data
const vacunacionesMesData = [
  { mes: 'Enero', aplicadas: 4, pendientes: 0 },
  { mes: 'Febrero', aplicadas: 5, pendientes: 1 },
  { mes: 'Marzo', aplicadas: 6, pendientes: 0 },
  { mes: 'Abril', aplicadas: 5, pendientes: 1 },
  { mes: 'Mayo', aplicadas: 7, pendientes: 2 },
  { mes: 'Junio', aplicadas: 5, pendientes: 1 },
];

const coberturaVacunalData = [
  { vacuna: 'Newcastle', cobertura: 98 },
  { vacuna: 'Bronquitis', cobertura: 96 },
  { vacuna: 'Viruela', cobertura: 94 },
  { vacuna: 'Gumboro', cobertura: 0 },
  { vacuna: 'Salmonela', cobertura: 99 },
];

const estadoTratamientosData = [
  { name: 'En Curso', value: 2, color: '#3b82f6' },
  { name: 'Completado', value: 1, color: '#10b981' },
  { name: 'Programado', value: 1, color: '#f59e0b' },
];

export default function SanitariaModule() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [filterGalpone, setFilterGalpone] = useState('Todos');

  // Calculate metrics
  const vacunacionesCompletadas = vacunacionesData.filter((v) => v.estado === 'Completada').length;
  const vacunacionesPendientes = vacunacionesData.filter((v) => v.estado === 'Pendiente').length;
  const tratamientosActivos = tratamientosData.filter((t) => t.estado === 'En Curso').length;
  const coberturaPromedio = Math.round(
    vacunacionesData.reduce((acc, v) => acc + parseInt(v.cobertura), 0) / vacunacionesData.length
  );

  const kpis = [
    {
      title: 'Vacunaciones Completadas',
      value: vacunacionesCompletadas,
      unit: 'aplicadas',
      icon: Syringe,
      color: 'emerald',
      trend: '+2',
    },
    {
      title: 'Vacunaciones Pendientes',
      value: vacunacionesPendientes,
      unit: 'próximas',
      icon: Clock,
      color: 'orange',
      trend: '1 esta semana',
    },
    {
      title: 'Cobertura Vacunal Promedio',
      value: `${coberturaPromedio}%`,
      unit: 'de aves',
      icon: TrendingUp,
      color: 'blue',
      trend: '+1.2%',
    },
    {
      title: 'Tratamientos Activos',
      value: tratamientosActivos,
      unit: 'en curso',
      icon: Pill,
      color: 'purple',
      trend: '2 en lotes',
    },
  ];

  // Filtered data
  const vacunacionesFiltradas =
    filterGalpone === 'Todos'
      ? vacunacionesData
      : vacunacionesData.filter((v) => v.galpone === filterGalpone);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Gestión Sanitaria</h1>
          <p className="text-slate-600 mt-1">Control de vacunaciones y tratamientos</p>
        </div>
        <div className="flex gap-3">
          <button className="px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors text-sm font-medium flex items-center gap-2">
            <Plus className="w-4 h-4" />
            Nueva Vacunación
          </button>
          <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-sm font-medium flex items-center gap-2">
            <Plus className="w-4 h-4" />
            Nuevo Tratamiento
          </button>
        </div>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpis.map((kpi, idx) => {
          const Icon = kpi.icon;
          const colorClasses: Record<string, string> = {
            emerald: 'from-emerald-50 to-emerald-100 text-emerald-600',
            orange: 'from-orange-50 to-orange-100 text-orange-600',
            blue: 'from-blue-50 to-blue-100 text-blue-600',
            purple: 'from-purple-50 to-purple-100 text-purple-600',
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
              </div>
            </div>
          );
        })}
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm">
        <div className="flex border-b border-slate-200 overflow-x-auto">
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`px-6 py-4 font-medium text-sm transition-colors whitespace-nowrap ${
              activeTab === 'dashboard'
                ? 'text-emerald-600 border-b-2 border-emerald-600'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <div className="flex items-center gap-2">
              <Activity className="w-4 h-4" />
              Dashboard
            </div>
          </button>
          <button
            onClick={() => setActiveTab('vacunaciones')}
            className={`px-6 py-4 font-medium text-sm transition-colors whitespace-nowrap ${
              activeTab === 'vacunaciones'
                ? 'text-emerald-600 border-b-2 border-emerald-600'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <div className="flex items-center gap-2">
              <Syringe className="w-4 h-4" />
              Vacunaciones
            </div>
          </button>
          <button
            onClick={() => setActiveTab('tratamientos')}
            className={`px-6 py-4 font-medium text-sm transition-colors whitespace-nowrap ${
              activeTab === 'tratamientos'
                ? 'text-emerald-600 border-b-2 border-emerald-600'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <div className="flex items-center gap-2">
              <Pill className="w-4 h-4" />
              Tratamientos
            </div>
          </button>
          <button
            onClick={() => setActiveTab('calendario')}
            className={`px-6 py-4 font-medium text-sm transition-colors whitespace-nowrap ${
              activeTab === 'calendario'
                ? 'text-emerald-600 border-b-2 border-emerald-600'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              Calendario
            </div>
          </button>
        </div>

        {/* Dashboard Tab */}
        {activeTab === 'dashboard' && (
          <div className="p-6 space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Vacunaciones por mes */}
              <div className="bg-white border border-slate-200 rounded-lg p-6">
                <h3 className="text-lg font-bold text-slate-900 mb-4">Vacunaciones por Mes</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={vacunacionesMesData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                    <XAxis dataKey="mes" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="aplicadas" fill="#10b981" name="Aplicadas" />
                    <Bar dataKey="pendientes" fill="#f59e0b" name="Pendientes" />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              {/* Cobertura Vacunal */}
              <div className="bg-white border border-slate-200 rounded-lg p-6">
                <h3 className="text-lg font-bold text-slate-900 mb-4">Cobertura Vacunal por Vacuna</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={coberturaVacunalData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                    <XAxis dataKey="vacuna" angle={-45} textAnchor="end" height={80} />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="cobertura" fill="#3b82f6" name="Cobertura %" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Estado de Tratamientos */}
            <div className="bg-white border border-slate-200 rounded-lg p-6">
              <h3 className="text-lg font-bold text-slate-900 mb-4">Estado General de Tratamientos</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <ResponsiveContainer width="100%" height={250}>
                    <PieChart>
                      <Pie
                        data={estadoTratamientosData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, value }) => `${name}: ${value}`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {estadoTratamientosData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="space-y-4">
                  {estadoTratamientosData.map((item) => (
                    <div key={item.name} className="flex items-center gap-3">
                      <div
                        className="w-4 h-4 rounded-full"
                        style={{ backgroundColor: item.color }}
                      ></div>
                      <div>
                        <p className="text-sm font-medium text-slate-900">{item.name}</p>
                        <p className="text-xs text-slate-600">{item.value} tratamientos</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Próximas acciones */}
            <div className="bg-gradient-to-r from-blue-50 to-blue-100 border border-blue-200 rounded-lg p-6">
              <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-blue-600" />
                Próximas Acciones Sanitarias
              </h3>
              <div className="space-y-3">
                {vacunacionesData
                  .filter((v) => v.estado === 'Pendiente')
                  .map((vac) => (
                    <div
                      key={vac.id}
                      className="flex items-center justify-between bg-white p-4 rounded-lg border border-blue-200"
                    >
                      <div>
                        <p className="text-sm font-semibold text-slate-900">
                          {vac.vacuna} - Lote {vac.lote}
                        </p>
                        <p className="text-xs text-slate-600 mt-1">
                          Programada para {vac.proximaDosis}
                        </p>
                      </div>
                      <Link
                        href={`/sanitaria/${vac.id}`}
                        className="px-3 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-xs font-medium flex items-center gap-1"
                      >
                        <Eye className="w-3 h-3" />
                        Detalles
                      </Link>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        )}

        {/* Vacunaciones Tab */}
        {activeTab === 'vacunaciones' && (
          <div className="p-6 space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-bold text-slate-900">Registro de Vacunaciones</h3>
              <div className="flex gap-2">
                <select
                  value={filterGalpone}
                  onChange={(e) => setFilterGalpone(e.target.value)}
                  className="px-4 py-2 border border-slate-300 rounded-lg text-sm font-medium text-slate-700 hover:border-slate-400"
                >
                  <option value="Todos">Todos los Galpones</option>
                  <option value="G001">G001 - Norte</option>
                  <option value="G002">G002 - Centro</option>
                  <option value="G003">G003 - Sur</option>
                  <option value="G004">G004 - Este</option>
                </select>
                <button className="px-4 py-2 bg-slate-200 text-slate-900 rounded-lg hover:bg-slate-300 transition-colors text-sm font-medium flex items-center gap-2">
                  <Download className="w-4 h-4" />
                  Exportar
                </button>
              </div>
            </div>

            <div className="overflow-x-auto bg-white rounded-lg border border-slate-200">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-slate-200 bg-slate-50">
                    <th className="text-left py-3 px-4 font-semibold text-slate-600">Vacuna</th>
                    <th className="text-left py-3 px-4 font-semibold text-slate-600">Lote</th>
                    <th className="text-left py-3 px-4 font-semibold text-slate-600">Galpón</th>
                    <th className="text-left py-3 px-4 font-semibold text-slate-600">Fecha</th>
                    <th className="text-left py-3 px-4 font-semibold text-slate-600">Cobertura</th>
                    <th className="text-left py-3 px-4 font-semibold text-slate-600">Estado</th>
                    <th className="text-left py-3 px-4 font-semibold text-slate-600">Responsable</th>
                    <th className="text-left py-3 px-4 font-semibold text-slate-600">Acción</th>
                  </tr>
                </thead>
                <tbody>
                  {vacunacionesFiltradas.map((vac) => (
                    <tr key={vac.id} className="border-b border-slate-100 hover:bg-slate-50">
                      <td className="py-3 px-4 font-semibold text-slate-900">{vac.vacuna}</td>
                      <td className="py-3 px-4 text-slate-700">{vac.lote}</td>
                      <td className="py-3 px-4 text-slate-700">{vac.galpone}</td>
                      <td className="py-3 px-4 text-slate-700">{vac.fecha}</td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2">
                          <div className="w-16 h-2 bg-slate-200 rounded-full overflow-hidden">
                            <div
                              className={`h-full ${
                                parseInt(vac.cobertura) >= 95
                                  ? 'bg-emerald-500'
                                  : parseInt(vac.cobertura) >= 90
                                    ? 'bg-yellow-500'
                                    : 'bg-red-500'
                              }`}
                              style={{ width: `${parseInt(vac.cobertura)}%` }}
                            ></div>
                          </div>
                          <span className="text-xs font-bold text-slate-700">{vac.cobertura}</span>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            vac.estado === 'Completada'
                              ? 'bg-emerald-100 text-emerald-700'
                              : 'bg-orange-100 text-orange-700'
                          }`}
                        >
                          {vac.estado === 'Completada' ? (
                            <span className="flex items-center gap-1">
                              <CheckCircle2 className="w-3 h-3" />
                              {vac.estado}
                            </span>
                          ) : (
                            <span className="flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              {vac.estado}
                            </span>
                          )}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-slate-700 text-xs">{vac.responsable}</td>
                      <td className="py-3 px-4">
                        <Link
                          href={`/sanitaria/${vac.id}`}
                          className="inline-flex items-center gap-1 text-emerald-600 hover:text-emerald-700 font-medium text-xs"
                        >
                          Ver <ArrowRight className="w-3 h-3" />
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tratamientos Tab */}
        {activeTab === 'tratamientos' && (
          <div className="p-6 space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-bold text-slate-900">Registro de Tratamientos</h3>
              <button className="px-4 py-2 bg-slate-200 text-slate-900 rounded-lg hover:bg-slate-300 transition-colors text-sm font-medium flex items-center gap-2">
                <Download className="w-4 h-4" />
                Exportar
              </button>
            </div>

            <div className="space-y-4">
              {tratamientosData.map((trt) => (
                <div
                  key={trt.id}
                  className="bg-white border border-slate-200 rounded-lg p-6 hover:shadow-md transition-shadow"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h4 className="text-lg font-bold text-slate-900">{trt.nombre}</h4>
                      <p className="text-sm text-slate-600 mt-1">
                        Lote {trt.lote} • Galpón {trt.galpone}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          trt.estado === 'En Curso'
                            ? 'bg-blue-100 text-blue-700'
                            : trt.estado === 'Completado'
                              ? 'bg-emerald-100 text-emerald-700'
                              : 'bg-orange-100 text-orange-700'
                        }`}
                      >
                        {trt.estado}
                      </span>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          trt.tipo === 'Preventivo'
                            ? 'bg-green-100 text-green-700'
                            : 'bg-red-100 text-red-700'
                        }`}
                      >
                        {trt.tipo}
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                    <div>
                      <p className="text-xs text-slate-600 font-medium mb-1">Principio Activo</p>
                      <p className="text-sm font-semibold text-slate-900">{trt.principioActivo}</p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-600 font-medium mb-1">Dosis</p>
                      <p className="text-sm font-semibold text-slate-900">{trt.dosis}</p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-600 font-medium mb-1">Frecuencia</p>
                      <p className="text-sm font-semibold text-slate-900">{trt.frecuencia}</p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-600 font-medium mb-1">Responsable</p>
                      <p className="text-sm font-semibold text-slate-900">{trt.responsable}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 py-4 border-t border-slate-200">
                    <div>
                      <p className="text-xs text-slate-600 font-medium mb-1">Fecha Inicio</p>
                      <p className="text-sm text-slate-700 flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        {trt.fechaInicio}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-600 font-medium mb-1">Fecha Fin</p>
                      <p className="text-sm text-slate-700 flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        {trt.fechaFin}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-600 font-medium mb-1">Duración</p>
                      <p
                        className={`text-sm font-semibold flex items-center gap-2 ${
                          trt.diasRestantes > 0 ? 'text-blue-600' : 'text-emerald-600'
                        }`}
                      >
                        <Clock className="w-4 h-4" />
                        {trt.diasRestantes > 0
                          ? `${trt.diasRestantes} días restantes`
                          : 'Completado'}
                      </p>
                    </div>
                  </div>

                  {trt.observaciones && (
                    <div className="mt-4 p-4 bg-slate-50 rounded-lg border border-slate-200">
                      <p className="text-xs text-slate-600 font-medium mb-1">Observaciones</p>
                      <p className="text-sm text-slate-700">{trt.observaciones}</p>
                    </div>
                  )}

                  <div className="flex gap-3 mt-4">
                    <Link
                      href={`/sanitaria/${trt.id}`}
                      className="px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors text-sm font-medium flex items-center gap-2"
                    >
                      <Eye className="w-4 h-4" />
                      Ver Detalles
                    </Link>
                    {trt.estado === 'En Curso' && (
                      <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-sm font-medium">
                        Registrar Dosis
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Calendario Tab */}
        {activeTab === 'calendario' && (
          <div className="p-6 space-y-6">
            <h3 className="text-lg font-bold text-slate-900">Calendario Sanitario</h3>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Próximas vacunaciones */}
              <div className="bg-white border border-slate-200 rounded-lg p-6">
                <h4 className="text-base font-bold text-slate-900 mb-4 flex items-center gap-2">
                  <Syringe className="w-5 h-5 text-emerald-600" />
                  Próximas Vacunaciones
                </h4>
                <div className="space-y-3">
                  {vacunacionesData
                    .filter((v) => v.estado === 'Pendiente')
                    .sort((a, b) => new Date(a.proximaDosis).getTime() - new Date(b.proximaDosis).getTime())
                    .map((vac) => (
                      <div
                        key={vac.id}
                        className="p-4 bg-emerald-50 border border-emerald-200 rounded-lg"
                      >
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <p className="text-sm font-semibold text-slate-900">{vac.vacuna}</p>
                            <p className="text-xs text-slate-600 mt-1">Lote {vac.lote}</p>
                          </div>
                          <span className="text-xs font-bold text-emerald-600 bg-emerald-100 px-2 py-1 rounded">
                            {vac.proximaDosis}
                          </span>
                        </div>
                      </div>
                    ))}
                </div>
              </div>

              {/* Próximos tratamientos */}
              <div className="bg-white border border-slate-200 rounded-lg p-6">
                <h4 className="text-base font-bold text-slate-900 mb-4 flex items-center gap-2">
                  <Pill className="w-5 h-5 text-blue-600" />
                  Próximos Tratamientos
                </h4>
                <div className="space-y-3">
                  {tratamientosData
                    .filter((t) => t.estado === 'Programado' || t.estado === 'En Curso')
                    .sort((a, b) => new Date(a.fechaFin).getTime() - new Date(b.fechaFin).getTime())
                    .map((trt) => (
                      <div
                        key={trt.id}
                        className="p-4 bg-blue-50 border border-blue-200 rounded-lg"
                      >
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <p className="text-sm font-semibold text-slate-900">{trt.nombre}</p>
                            <p className="text-xs text-slate-600 mt-1">Lote {trt.lote} ({trt.tipo})</p>
                          </div>
                          <span className="text-xs font-bold text-blue-600 bg-blue-100 px-2 py-1 rounded">
                            {trt.fechaFin}
                          </span>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </div>

            {/* Timeline */}
            <div className="bg-white border border-slate-200 rounded-lg p-6">
              <h4 className="text-base font-bold text-slate-900 mb-6">Historial de Eventos Sanitarios (Últimos 30 días)</h4>
              <div className="space-y-4">
                {(vacunacionesData as Array<any>)
                  .concat(tratamientosData as Array<any>)
                  .sort((a, b) => new Date(b.fecha || b.fechaInicio).getTime() - new Date(a.fecha || a.fechaInicio).getTime())
                  .slice(0, 8)
                  .map((event, idx) => (
                    <div key={idx} className="flex gap-4 pb-4 border-b border-slate-200 last:border-0">
                      <div className="flex flex-col items-center">
                        <div className="w-4 h-4 bg-emerald-500 rounded-full mt-1"></div>
                        {idx < 7 && <div className="w-0.5 h-12 bg-slate-200 mt-2"></div>}
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-semibold text-slate-900">
                          {'vacuna' in event
                            ? `Vacunación: ${event.vacuna}`
                            : `Tratamiento: ${event.nombre}`}
                        </p>
                        <p className="text-xs text-slate-600 mt-1">
                          {'vacuna' in event
                            ? `Lote ${event.lote} • Aplicado por ${event.responsable}`
                            : `Lote ${event.lote} • ${event.tipo}`}
                        </p>
                        <p className="text-xs text-slate-500 mt-2">
                          {event.fecha || event.fechaInicio}
                        </p>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
