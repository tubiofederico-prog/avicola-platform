'use client';

import { Tabs } from '@/components/tabs';
import { Settings } from 'lucide-react';

export default function ConfiguracionPage() {
  const tabs = [
    {
      id: 'general',
      label: 'General',
      icon: null,
      content: (
        <div className="space-y-6">
          <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
            <h3 className="text-lg font-bold text-slate-900 mb-4">Información de la Granja</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Nombre de la Granja</label>
                <input type="text" value="Granja Premium Avícola" className="w-full px-4 py-2 border border-slate-200 rounded-lg" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Ubicación</label>
                <input type="text" value="Municipio de Purificación, Tolima" className="w-full px-4 py-2 border border-slate-200 rounded-lg" />
              </div>
              <button className="px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 text-sm font-medium">
                Guardar Cambios
              </button>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'umbrales',
      label: 'Umbrales de Alertas',
      icon: null,
      content: (
        <div className="space-y-4">
          <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
            <h3 className="text-lg font-bold text-slate-900 mb-4">Parámetros de Alertas</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Temperatura Mínima (°C)</label>
                <input type="number" value="20" className="w-full px-4 py-2 border border-slate-200 rounded-lg" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Temperatura Máxima (°C)</label>
                <input type="number" value="24" className="w-full px-4 py-2 border border-slate-200 rounded-lg" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">% Mín Huevos Aptos</label>
                <input type="number" value="92" className="w-full px-4 py-2 border border-slate-200 rounded-lg" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">% Máx Huevos Rotos</label>
                <input type="number" value="3" className="w-full px-4 py-2 border border-slate-200 rounded-lg" />
              </div>
            </div>
            <button className="mt-4 px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 text-sm font-medium">
              Actualizar Umbrales
            </button>
          </div>
        </div>
      ),
    },
    {
      id: 'usuarios-sistema',
      label: 'Gestión de Usuarios',
      icon: null,
      content: (
        <div className="space-y-4">
          <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
            <h3 className="text-lg font-bold text-slate-900 mb-4">Permisos por Rol</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-slate-200">
                    <th className="text-left py-3 px-4 font-semibold text-slate-600">Rol</th>
                    <th className="text-center py-3 px-4 font-semibold text-slate-600">Leer</th>
                    <th className="text-center py-3 px-4 font-semibold text-slate-600">Crear</th>
                    <th className="text-center py-3 px-4 font-semibold text-slate-600">Editar</th>
                    <th className="text-center py-3 px-4 font-semibold text-slate-600">Eliminar</th>
                  </tr>
                </thead>
                <tbody>
                  {['Admin', 'Gerente', 'Supervisor', 'Operario'].map((rol) => (
                    <tr key={rol} className="border-b border-slate-100">
                      <td className="py-3 px-4 font-medium text-slate-900">{rol}</td>
                      <td className="text-center py-3 px-4"><input type="checkbox" defaultChecked className="w-4 h-4" /></td>
                      <td className="text-center py-3 px-4"><input type="checkbox" defaultChecked={rol !== 'Operario'} className="w-4 h-4" /></td>
                      <td className="text-center py-3 px-4"><input type="checkbox" defaultChecked={rol !== 'Operario'} className="w-4 h-4" /></td>
                      <td className="text-center py-3 px-4"><input type="checkbox" defaultChecked={rol === 'Admin'} className="w-4 h-4" /></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Configuración del Sistema</h1>
        <p className="text-slate-600 mt-1">Parámetros, umbrales y configuración general</p>
      </div>

      <Tabs tabs={tabs} defaultTab="general" />
    </div>
  );
}
