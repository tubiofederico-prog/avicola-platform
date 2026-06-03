'use client';

import Link from 'next/link';
import { useState } from 'react';
import {
  TrendingUp,
  DollarSign,
  ShoppingCart,
  BarChart3,
  Plus,
  ChevronRight,
  Calendar,
  User,
  Package,
  Eye,
  Edit,
  Trash2,
  Filter,
  Download,
  ArrowUpRight,
  ArrowDownLeft,
  AlertCircle,
  CheckCircle,
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
import { ventas } from '@/lib/mock-data';

// Mock data for comercial module
const ventasMensual = [
  { mes: 'Enero', ventas: 42000, costo: 18900, ganancia: 23100, unidades: 280000 },
  { mes: 'Febrero', ventas: 48000, costo: 21600, ganancia: 26400, unidades: 320000 },
  { mes: 'Marzo', ventas: 55000, costo: 24750, ganancia: 30250, unidades: 366667 },
  { mes: 'Abril', ventas: 62000, costo: 27900, ganancia: 34100, unidades: 413333 },
  { mes: 'Mayo', ventas: 71000, costo: 31950, ganancia: 39050, unidades: 473333 },
  { mes: 'Junio', ventas: 78000, costo: 35100, ganancia: 42900, unidades: 520000 },
];

const categoriaData = [
  { nombre: 'Extra', valor: 45000, porcentaje: 38 },
  { nombre: 'Primera', valor: 28000, porcentaje: 24 },
  { nombre: 'Segunda', valor: 19000, porcentaje: 16 },
  { nombre: 'Tercera', valor: 26000, porcentaje: 22 },
];

const rentabilidadPorCliente = [
  { cliente: 'Supermercados Éxito', ventas: 28000, costo: 12600, margen: 45 },
  { cliente: 'Distribuidora Central', ventas: 24500, costo: 11025, margen: 55 },
  { cliente: 'Hotel Resort Premium', ventas: 18000, costo: 8100, margen: 55 },
  { cliente: 'Panadería La Mejor', ventas: 12000, costo: 5400, margen: 55 },
  { cliente: 'Restaurante Chef´s Table', ventas: 15500, costo: 6975, margen: 55 },
];

const ventasDetalladas = [
  {
    id: 'V001',
    fecha: '2026-06-01',
    cliente: 'Supermercados Éxito',
    cantidadHuevos: 15000,
    categoria: 'Extra',
    precioUnitario: 0.18,
    total: 2700,
    estadoPago: 'Pagado',
    margenGanancia: 45,
  },
  {
    id: 'V002',
    fecha: '2026-06-02',
    cliente: 'Distribuidora Central',
    cantidadHuevos: 25000,
    categoria: 'Primera',
    precioUnitario: 0.15,
    total: 3750,
    estadoPago: 'Pagado',
    margenGanancia: 40,
  },
  {
    id: 'V003',
    fecha: '2026-06-03',
    cliente: 'Panadería La Mejor',
    cantidadHuevos: 3000,
    categoria: 'Segunda',
    precioUnitario: 0.12,
    total: 360,
    estadoPago: 'Pendiente',
    margenGanancia: 35,
  },
  {
    id: 'V004',
    fecha: '2026-06-03',
    cliente: 'Hotel Resort Premium',
    cantidadHuevos: 5000,
    categoria: 'Extra',
    precioUnitario: 0.20,
    total: 1000,
    estadoPago: 'Pagado',
    margenGanancia: 50,
  },
  {
    id: 'V005',
    fecha: '2026-06-02',
    cliente: 'Restaurante Chef´s Table',
    cantidadHuevos: 2000,
    categoria: 'Extra',
    precioUnitario: 0.22,
    total: 440,
    estadoPago: 'Pagado',
    margenGanancia: 55,
  },
];

const COLORS = ['#10b981', '#3b82f6', '#f59e0b', '#ef4444'];

export default function ComercialPage() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [filterCliente, setFilterCliente] = useState('');

  // Calcular KPIs
  const totalVentasMes = ventasMensual[ventasMensual.length - 1].ventas;
  const totalGanancia = ventasMensual[ventasMensual.length - 1].ganancia;
  const totalUnidades = ventasDetalladas.reduce((acc, v) => acc + v.cantidadHuevos, 0);
  const ventasPromedio = (totalVentasMes / 30).toFixed(0);
  const margenPromedio = ((totalGanancia / totalVentasMes) * 100).toFixed(1);
  const tasaPago = ventasDetalladas.filter((v) => v.estadoPago === 'Pagado').length;

  const ventasFiltradas = filterCliente
    ? ventasDetalladas.filter((v) =>
        v.cliente.toLowerCase().includes(filterCliente.toLowerCase())
      )
    : ventasDetalladas;

  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
    { id: 'ventas', label: 'Registro de Ventas', icon: ShoppingCart },
    { id: 'rentabilidad', label: 'Análisis de Rentabilidad', icon: TrendingUp },
    { id: 'clientes', label: 'Gestión de Clientes', icon: User },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-slate-900">Gestión Comercial</h1>
          <p className="text-slate-600 mt-2">Registro de ventas y análisis de rentabilidad</p>
        </div>
        <Link
          href="/comercial/nueva-venta"
          className="flex items-center gap-2 px-6 py-3 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors font-semibold shadow-lg"
        >
          <Plus className="w-5 h-5" />
          Registrar Venta
        </Link>
      </div>

      {/* Tabs Navigation */}
      <div className="bg-white rounded-lg border border-slate-200 overflow-hidden">
        <div className="flex border-b border-slate-200">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-6 py-4 font-semibold transition-all ${
                  activeTab === tab.id
                    ? 'text-emerald-600 border-b-2 border-emerald-500'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Icon className="w-5 h-5" />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Dashboard Tab */}
        {activeTab === 'dashboard' && (
          <div className="p-6 space-y-6">
            {/* KPIs */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
              <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-lg p-6 border border-emerald-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-slate-600 text-sm font-semibold">Ventas Mes</p>
                    <p className="text-3xl font-bold text-emerald-600 mt-2">
                      ${totalVentasMes.toLocaleString()}
                    </p>
                    <p className="text-xs text-slate-600 mt-2 flex items-center gap-1">
                      <ArrowUpRight className="w-4 h-4 text-emerald-600" />
                      +8.5% vs mes anterior
                    </p>
                  </div>
                  <DollarSign className="w-12 h-12 text-emerald-600 opacity-20" />
                </div>
              </div>

              <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-6 border border-blue-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-slate-600 text-sm font-semibold">Ganancia Neta</p>
                    <p className="text-3xl font-bold text-blue-600 mt-2">
                      ${totalGanancia.toLocaleString()}
                    </p>
                    <p className="text-xs text-slate-600 mt-2">
                      {margenPromedio}% de margen
                    </p>
                  </div>
                  <TrendingUp className="w-12 h-12 text-blue-600 opacity-20" />
                </div>
              </div>

              <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-6 border border-purple-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-slate-600 text-sm font-semibold">Unidades Vendidas</p>
                    <p className="text-3xl font-bold text-purple-600 mt-2">
                      {(totalUnidades / 1000).toFixed(0)}K
                    </p>
                    <p className="text-xs text-slate-600 mt-2">huevos este mes</p>
                  </div>
                  <Package className="w-12 h-12 text-purple-600 opacity-20" />
                </div>
              </div>

              <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-lg p-6 border border-orange-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-slate-600 text-sm font-semibold">Venta Diaria Prom</p>
                    <p className="text-3xl font-bold text-orange-600 mt-2">
                      ${ventasPromedio}
                    </p>
                    <p className="text-xs text-slate-600 mt-2">promedio diario</p>
                  </div>
                  <BarChart3 className="w-12 h-12 text-orange-600 opacity-20" />
                </div>
              </div>

              <div className="bg-gradient-to-br from-pink-50 to-pink-100 rounded-lg p-6 border border-pink-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-slate-600 text-sm font-semibold">Tasa de Pago</p>
                    <p className="text-3xl font-bold text-pink-600 mt-2">
                      {((tasaPago / ventasDetalladas.length) * 100).toFixed(0)}%
                    </p>
                    <p className="text-xs text-slate-600 mt-2">{tasaPago} de {ventasDetalladas.length} ventas</p>
                  </div>
                  <CheckCircle className="w-12 h-12 text-pink-600 opacity-20" />
                </div>
              </div>
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Ventas vs Costos */}
              <div className="lg:col-span-2 bg-white rounded-lg border border-slate-200 p-6">
                <h3 className="text-lg font-bold text-slate-900 mb-4">Ventas vs Costos (Últimos 6 meses)</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={ventasMensual}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                    <XAxis dataKey="mes" />
                    <YAxis />
                    <Tooltip formatter={(value: any) => `$${value.toLocaleString()}`} />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="ventas"
                      stroke="#10b981"
                      strokeWidth={2}
                      name="Ventas"
                    />
                    <Line
                      type="monotone"
                      dataKey="costo"
                      stroke="#ef4444"
                      strokeWidth={2}
                      name="Costos"
                    />
                    <Line
                      type="monotone"
                      dataKey="ganancia"
                      stroke="#3b82f6"
                      strokeWidth={2}
                      name="Ganancia"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              {/* Distribución por Categoría */}
              <div className="bg-white rounded-lg border border-slate-200 p-6">
                <h3 className="text-lg font-bold text-slate-900 mb-4">Ventas por Categoría</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={categoriaData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={(props: any) => `${props.nombre} ${props.porcentaje}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="valor"
                    >
                      {categoriaData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value: any) => `$${value.toLocaleString()}`} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Ventas Recientes */}
            <div className="bg-white rounded-lg border border-slate-200 p-6">
              <h3 className="text-lg font-bold text-slate-900 mb-4">Últimas Ventas Registradas</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-slate-200">
                      <th className="text-left py-3 px-4 font-semibold text-slate-700">Fecha</th>
                      <th className="text-left py-3 px-4 font-semibold text-slate-700">Cliente</th>
                      <th className="text-left py-3 px-4 font-semibold text-slate-700">Cantidad</th>
                      <th className="text-left py-3 px-4 font-semibold text-slate-700">Categoría</th>
                      <th className="text-right py-3 px-4 font-semibold text-slate-700">Total</th>
                      <th className="text-left py-3 px-4 font-semibold text-slate-700">Estado</th>
                      <th className="text-center py-3 px-4 font-semibold text-slate-700">Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {ventasDetalladas.slice(0, 5).map((venta) => (
                      <tr key={venta.id} className="border-b border-slate-100 hover:bg-slate-50">
                        <td className="py-3 px-4 text-slate-600">{venta.fecha}</td>
                        <td className="py-3 px-4 text-slate-900 font-medium">{venta.cliente}</td>
                        <td className="py-3 px-4 text-slate-600">{venta.cantidadHuevos.toLocaleString()}</td>
                        <td className="py-3 px-4">
                          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            venta.categoria === 'Extra'
                              ? 'bg-emerald-100 text-emerald-700'
                              : venta.categoria === 'Primera'
                              ? 'bg-blue-100 text-blue-700'
                              : 'bg-yellow-100 text-yellow-700'
                          }`}>
                            {venta.categoria}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-right text-slate-900 font-bold">${venta.total.toLocaleString()}</td>
                        <td className="py-3 px-4">
                          <span className={`px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1 w-fit ${
                            venta.estadoPago === 'Pagado'
                              ? 'bg-green-100 text-green-700'
                              : 'bg-yellow-100 text-yellow-700'
                          }`}>
                            {venta.estadoPago === 'Pagado' ? (
                              <CheckCircle className="w-3 h-3" />
                            ) : (
                              <AlertCircle className="w-3 h-3" />
                            )}
                            {venta.estadoPago}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-center">
                          <Link
                            href={`/comercial/${venta.id}`}
                            className="text-emerald-600 hover:text-emerald-700 font-semibold text-xs flex items-center justify-center gap-1"
                          >
                            <Eye className="w-4 h-4" />
                            Ver
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

        {/* Ventas Tab */}
        {activeTab === 'ventas' && (
          <div className="p-6 space-y-6">
            {/* Filtros */}
            <div className="flex gap-4 items-center">
              <div className="flex-1">
                <input
                  type="text"
                  placeholder="Buscar por cliente..."
                  value={filterCliente}
                  onChange={(e) => setFilterCliente(e.target.value)}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
              <button className="flex items-center gap-2 px-4 py-2 border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors">
                <Filter className="w-4 h-4" />
                Filtros
              </button>
              <button className="flex items-center gap-2 px-4 py-2 border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors">
                <Download className="w-4 h-4" />
                Descargar
              </button>
            </div>

            {/* Tabla de Ventas Detalladas */}
            <div className="bg-white rounded-lg border border-slate-200 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-200">
                      <th className="text-left py-4 px-6 font-semibold text-slate-700">ID</th>
                      <th className="text-left py-4 px-6 font-semibold text-slate-700">Fecha</th>
                      <th className="text-left py-4 px-6 font-semibold text-slate-700">Cliente</th>
                      <th className="text-right py-4 px-6 font-semibold text-slate-700">Cantidad</th>
                      <th className="text-left py-4 px-6 font-semibold text-slate-700">Categoría</th>
                      <th className="text-right py-4 px-6 font-semibold text-slate-700">Precio/U</th>
                      <th className="text-right py-4 px-6 font-semibold text-slate-700">Total</th>
                      <th className="text-right py-4 px-6 font-semibold text-slate-700">Margen</th>
                      <th className="text-center py-4 px-6 font-semibold text-slate-700">Estado</th>
                      <th className="text-center py-4 px-6 font-semibold text-slate-700">Acciones</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    {ventasFiltradas.map((venta) => (
                      <tr key={venta.id} className="hover:bg-slate-50 transition-colors">
                        <td className="py-4 px-6 text-slate-600 font-semibold">{venta.id}</td>
                        <td className="py-4 px-6 text-slate-600">{venta.fecha}</td>
                        <td className="py-4 px-6 text-slate-900 font-medium">{venta.cliente}</td>
                        <td className="py-4 px-6 text-right text-slate-600">
                          {venta.cantidadHuevos.toLocaleString()}
                        </td>
                        <td className="py-4 px-6">
                          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            venta.categoria === 'Extra'
                              ? 'bg-emerald-100 text-emerald-700'
                              : venta.categoria === 'Primera'
                              ? 'bg-blue-100 text-blue-700'
                              : 'bg-yellow-100 text-yellow-700'
                          }`}>
                            {venta.categoria}
                          </span>
                        </td>
                        <td className="py-4 px-6 text-right text-slate-600">${venta.precioUnitario.toFixed(2)}</td>
                        <td className="py-4 px-6 text-right text-slate-900 font-bold">${venta.total.toLocaleString()}</td>
                        <td className="py-4 px-6 text-right">
                          <span className="text-emerald-600 font-semibold">{venta.margenGanancia}%</span>
                        </td>
                        <td className="py-4 px-6 text-center">
                          <span className={`px-3 py-1 rounded-full text-xs font-semibold flex items-center justify-center gap-1 w-fit mx-auto ${
                            venta.estadoPago === 'Pagado'
                              ? 'bg-green-100 text-green-700'
                              : 'bg-yellow-100 text-yellow-700'
                          }`}>
                            {venta.estadoPago === 'Pagado' ? (
                              <CheckCircle className="w-3 h-3" />
                            ) : (
                              <AlertCircle className="w-3 h-3" />
                            )}
                            {venta.estadoPago}
                          </span>
                        </td>
                        <td className="py-4 px-6 text-center">
                          <div className="flex items-center justify-center gap-2">
                            <Link
                              href={`/comercial/${venta.id}`}
                              className="text-emerald-600 hover:text-emerald-700 transition-colors"
                              title="Ver"
                            >
                              <Eye className="w-4 h-4" />
                            </Link>
                            <button
                              className="text-blue-600 hover:text-blue-700 transition-colors"
                              title="Editar"
                            >
                              <Edit className="w-4 h-4" />
                            </button>
                            <button
                              className="text-red-600 hover:text-red-700 transition-colors"
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
              {ventasFiltradas.length === 0 && (
                <div className="text-center py-8 text-slate-600">
                  No se encontraron ventas con los filtros aplicados.
                </div>
              )}
            </div>
          </div>
        )}

        {/* Rentabilidad Tab */}
        {activeTab === 'rentabilidad' && (
          <div className="p-6 space-y-6">
            {/* Gráfico de Rentabilidad Mensual */}
            <div className="bg-white rounded-lg border border-slate-200 p-6">
              <h3 className="text-lg font-bold text-slate-900 mb-4">Análisis de Rentabilidad (Últimos 6 Meses)</h3>
              <ResponsiveContainer width="100%" height={350}>
                <BarChart data={ventasMensual}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis dataKey="mes" />
                  <YAxis />
                  <Tooltip
                    formatter={(value: any) => `$${value.toLocaleString()}`}
                    contentStyle={{ backgroundColor: '#fff', border: '1px solid #e2e8f0', borderRadius: '8px' }}
                  />
                  <Legend />
                  <Bar dataKey="ventas" fill="#3b82f6" name="Ventas Totales" />
                  <Bar dataKey="ganancia" fill="#10b981" name="Ganancia Neta" />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Rentabilidad por Cliente */}
            <div className="bg-white rounded-lg border border-slate-200 p-6">
              <h3 className="text-lg font-bold text-slate-900 mb-6">Rentabilidad por Cliente</h3>
              <div className="space-y-4">
                {rentabilidadPorCliente.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between p-4 bg-gradient-to-r from-slate-50 to-slate-100 rounded-lg border border-slate-200 hover:border-emerald-300 transition-colors"
                  >
                    <div className="flex-1">
                      <h4 className="font-semibold text-slate-900">{item.cliente}</h4>
                      <p className="text-xs text-slate-600 mt-1">
                        Ventas: ${item.ventas.toLocaleString()} | Costos: ${item.costo.toLocaleString()}
                      </p>
                    </div>
                    <div className="flex items-center gap-6">
                      <div className="text-right">
                        <p className="text-lg font-bold text-emerald-600">{item.margen}%</p>
                        <p className="text-xs text-slate-600">Margen</p>
                      </div>
                      <div className="w-24 h-6 bg-slate-200 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-emerald-400 to-emerald-600 transition-all"
                          style={{ width: `${item.margen}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* KPIs de Rentabilidad */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white rounded-lg border border-slate-200 p-6">
                <p className="text-slate-600 text-sm font-semibold">Margen Promedio</p>
                <p className="text-4xl font-bold text-emerald-600 mt-2">{margenPromedio}%</p>
                <p className="text-xs text-slate-600 mt-2">de todas las ventas</p>
              </div>
              <div className="bg-white rounded-lg border border-slate-200 p-6">
                <p className="text-slate-600 text-sm font-semibold">Costo Promedio/Unidad</p>
                <p className="text-4xl font-bold text-blue-600 mt-2">$0.045</p>
                <p className="text-xs text-slate-600 mt-2">por huevo</p>
              </div>
              <div className="bg-white rounded-lg border border-slate-200 p-6">
                <p className="text-slate-600 text-sm font-semibold">Precio Promedio/Unidad</p>
                <p className="text-4xl font-bold text-purple-600 mt-2">$0.165</p>
                <p className="text-xs text-slate-600 mt-2">por huevo</p>
              </div>
            </div>
          </div>
        )}

        {/* Clientes Tab */}
        {activeTab === 'clientes' && (
          <div className="p-6 space-y-6">
            {/* Resumen de Clientes */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-6 border border-blue-200">
                <p className="text-slate-600 text-sm font-semibold">Total Clientes</p>
                <p className="text-3xl font-bold text-blue-600 mt-2">5</p>
                <p className="text-xs text-slate-600 mt-2">activos este mes</p>
              </div>
              <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-lg p-6 border border-emerald-200">
                <p className="text-slate-600 text-sm font-semibold">Clientes Premium</p>
                <p className="text-3xl font-bold text-emerald-600 mt-2">2</p>
                <p className="text-xs text-slate-600 mt-2">con contrato fijo</p>
              </div>
              <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-lg p-6 border border-yellow-200">
                <p className="text-slate-600 text-sm font-semibold">Ticket Promedio</p>
                <p className="text-3xl font-bold text-yellow-600 mt-2">$898</p>
                <p className="text-xs text-slate-600 mt-2">por venta</p>
              </div>
              <div className="bg-gradient-to-br from-pink-50 to-pink-100 rounded-lg p-6 border border-pink-200">
                <p className="text-slate-600 text-sm font-semibold">Frecuencia Compra</p>
                <p className="text-3xl font-bold text-pink-600 mt-2">4.8x</p>
                <p className="text-xs text-slate-600 mt-2">veces por mes (prom)</p>
              </div>
            </div>

            {/* Tabla de Clientes */}
            <div className="bg-white rounded-lg border border-slate-200 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-200">
                      <th className="text-left py-4 px-6 font-semibold text-slate-700">Cliente</th>
                      <th className="text-right py-4 px-6 font-semibold text-slate-700">Total Ventas</th>
                      <th className="text-right py-4 px-6 font-semibold text-slate-700">Compras</th>
                      <th className="text-right py-4 px-6 font-semibold text-slate-700">Ganancia Neta</th>
                      <th className="text-center py-4 px-6 font-semibold text-slate-700">Categoría Fav</th>
                      <th className="text-center py-4 px-6 font-semibold text-slate-700">Estado Pago</th>
                      <th className="text-center py-4 px-6 font-semibold text-slate-700">Acciones</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    {[
                      {
                        nombre: 'Supermercados Éxito',
                        ventas: 28000,
                        compras: 12,
                        ganancia: 12600,
                        categoria: 'Extra',
                        estado: 'Al Día',
                      },
                      {
                        nombre: 'Distribuidora Central',
                        ventas: 24500,
                        compras: 8,
                        ganancia: 13475,
                        categoria: 'Primera',
                        estado: 'Al Día',
                      },
                      {
                        nombre: 'Hotel Resort Premium',
                        ventas: 18000,
                        compras: 6,
                        ganancia: 9900,
                        categoria: 'Extra',
                        estado: 'Al Día',
                      },
                      {
                        nombre: 'Panadería La Mejor',
                        ventas: 12000,
                        compras: 5,
                        ganancia: 6600,
                        categoria: 'Segunda',
                        estado: 'Pendiente',
                      },
                      {
                        nombre: 'Restaurante Chef´s Table',
                        ventas: 15500,
                        compras: 7,
                        ganancia: 8525,
                        categoria: 'Extra',
                        estado: 'Al Día',
                      },
                    ].map((cliente, idx) => (
                      <tr key={idx} className="hover:bg-slate-50 transition-colors">
                        <td className="py-4 px-6 text-slate-900 font-medium">{cliente.nombre}</td>
                        <td className="py-4 px-6 text-right text-slate-600 font-semibold">
                          ${cliente.ventas.toLocaleString()}
                        </td>
                        <td className="py-4 px-6 text-right text-slate-600">{cliente.compras}</td>
                        <td className="py-4 px-6 text-right text-emerald-600 font-bold">
                          ${cliente.ganancia.toLocaleString()}
                        </td>
                        <td className="py-4 px-6 text-center">
                          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-700">
                            {cliente.categoria}
                          </span>
                        </td>
                        <td className="py-4 px-6 text-center">
                          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            cliente.estado === 'Al Día'
                              ? 'bg-green-100 text-green-700'
                              : 'bg-yellow-100 text-yellow-700'
                          }`}>
                            {cliente.estado}
                          </span>
                        </td>
                        <td className="py-4 px-6 text-center">
                          <Link
                            href={`/comercial/cliente/${idx}`}
                            className="text-emerald-600 hover:text-emerald-700 font-semibold text-xs flex items-center justify-center gap-1"
                          >
                            <ChevronRight className="w-4 h-4" />
                            Ver Detalles
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
      </div>
    </div>
  );
}
