'use client';

import { DataTable } from '@/components/data-table';
import { StatusBadge } from '@/components/status-badge';
import { CardKPI } from '@/components/card-kpi';
import { usuarios } from '@/lib/mock-data';
import { Users, Plus } from 'lucide-react';
import Link from 'next/link';

export default function UsuariosPage() {
  const activos = usuarios.filter(u => u.estado === 'Activo').length;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start">
        <h1 className="text-3xl font-bold text-slate-900">Usuarios y Roles</h1>
        <Link href="/usuarios/nuevo" className="px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 text-sm font-medium flex items-center gap-2">
          <Plus className="w-4 h-4" /> Nuevo Usuario
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <CardKPI title="Total Usuarios" value={usuarios.length} unit="registrados" icon={<Users className="w-6 h-6" />} color="blue" />
        <CardKPI title="Activos" value={activos} unit="en línea" icon={<Users className="w-6 h-6" />} color="emerald" />
        <CardKPI title="Inactivos" value={usuarios.filter(u => u.estado === 'Inactivo').length} unit="desactivados" icon={<Users className="w-6 h-6" />} color="orange" />
      </div>

      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
        <h3 className="text-lg font-bold text-slate-900 mb-4">Directorio de Usuarios</h3>
        <DataTable
          columns={[
            { header: 'Nombre', accessor: 'nombre' },
            { header: 'Email', accessor: 'email' },
            { header: 'Rol', accessor: (u) => <StatusBadge status={u.rol} variant="info" size="sm" /> },
            { header: 'Estado', accessor: (u) => <StatusBadge status={u.estado} variant={u.estado === 'Activo' ? 'success' : 'warning'} size="sm" /> },
            { header: 'Último Acceso', accessor: 'ultimoAcceso' },
          ]}
          data={usuarios}
        />
      </div>
    </div>
  );
}
