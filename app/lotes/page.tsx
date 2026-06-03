'use client';

import Link from 'next/link';
import { Plus, Eye } from 'lucide-react';
import { Tabs } from '@/components/tabs';
import { DataTable } from '@/components/data-table';
import { StatusBadge } from '@/components/status-badge';
import { CardKPI } from '@/components/card-kpi';
import { lotes } from '@/lib/mock-data';

export default function LotesPage() {
  const tabs = [
    {
      id: 'listado',
      label: 'Listado',
      icon: null,
      content: (
        <div className="space-y-4">
          <div className="flex justify-between">
            <h3 className="text-lg font-bold text-slate-900">Todos los Lotes</h3>
            <Link href="/lotes/nuevo" className="px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 text-sm font-medium flex items-center gap-2">
              <Plus className="w-4 h-4" /> Nuevo
            </Link>
          </div>
          <div className="bg-white rounded-xl border border-slate-200 p-6">
            <DataTable
              columns={[
                { header: 'Código', accessor: 'codigo' },
                { header: 'Galpón', accessor: 'galpone' },
                { header: 'Edad (días)', accessor: 'edad' },
                { header: 'Aves', accessor: (l) => l.cantidadAves.toLocaleString() },
                { header: 'Etapa', accessor: 'etapa' },
                { header: 'Salud', accessor: (l) => <StatusBadge status={l.estadoSanitario} variant="success" size="sm" /> },
              ]}
              data={lotes}
            />
          </div>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-slate-900">Gestión de Lotes</h1>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <CardKPI title="Lotes Activos" value={lotes.filter(l => l.etapa === 'Postura').length} unit="en postura" icon={<span>🥚</span>} color="emerald" />
        <CardKPI title="Producción Total" value={lotes.reduce((a, l) => a + l.produccionAcumulada, 0).toLocaleString()} unit="huevos" icon={<span>📊</span>} color="blue" />
      </div>
      <Tabs tabs={tabs} defaultTab="listado" />
    </div>
  );
}
