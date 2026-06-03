'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  BarChart3,
  Egg,
  AlertCircle,
  Users,
  Settings,
  Activity,
  Wind,
  TrendingUp,
  Clipboard,
  Home,
  Smartphone,
  Zap,
  LogOut,
} from 'lucide-react';
import { cn } from '@/lib/utils';

const menuItems = [
  {
    category: 'Principal',
    items: [
      { name: 'Dashboard', href: '/', icon: Home },
    ],
  },
  {
    category: 'Operación',
    items: [
      { name: 'Gestión Productiva', href: '/productiva', icon: Egg },
      { name: 'Gestión Sanitaria', href: '/sanitaria', icon: Activity },
      { name: 'Gestión Ambiental', href: '/ambiental', icon: Wind },
      { name: 'Gestión Comercial', href: '/comercial', icon: TrendingUp },
    ],
  },
  {
    category: 'Recursos',
    items: [
      { name: 'Galpones', href: '/galpones', icon: BarChart3 },
      { name: 'Lotes', href: '/lotes', icon: Clipboard },
      { name: 'Alertas', href: '/alertas', icon: AlertCircle },
      { name: 'Reportes', href: '/reportes', icon: BarChart3 },
    ],
  },
  {
    category: 'Sistema',
    items: [
      { name: 'Usuarios', href: '/usuarios', icon: Users },
      { name: 'App Campo', href: '/campo', icon: Smartphone },
      { name: 'Integraciones IoT', href: '/integraciones', icon: Zap },
      { name: 'Configuración', href: '/configuracion', icon: Settings },
    ],
  },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-gradient-to-b from-slate-900 to-slate-800 text-white h-screen overflow-y-auto fixed left-0 top-0 pt-6">
      {/* Logo */}
      <div className="px-6 mb-8">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-emerald-500 rounded-lg flex items-center justify-center">
            <Egg className="w-6 h-6" />
          </div>
          <div>
            <h1 className="font-bold text-lg">AvícolaPro</h1>
            <p className="text-xs text-slate-400">Gestión Integral</p>
          </div>
        </div>
      </div>

      {/* Menu */}
      <nav className="space-y-6">
        {menuItems.map((section) => (
          <div key={section.category}>
            <h3 className="px-6 text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">
              {section.category}
            </h3>
            <div className="space-y-2">
              {section.items.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      'mx-3 px-4 py-2 rounded-lg flex items-center gap-3 transition-all duration-200',
                      isActive
                        ? 'bg-emerald-500 text-white shadow-lg'
                        : 'text-slate-300 hover:bg-slate-700 hover:text-white'
                    )}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="text-sm font-medium">{item.name}</span>
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      {/* Footer */}
      <div className="absolute bottom-0 left-0 right-0 p-4 bg-slate-800 border-t border-slate-700">
        <button className="w-full flex items-center gap-3 px-4 py-2 text-slate-300 hover:text-white transition-colors">
          <LogOut className="w-5 h-5" />
          <span className="text-sm font-medium">Salir</span>
        </button>
      </div>
    </aside>
  );
}
