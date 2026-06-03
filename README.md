# 🥚 AvícolaPro - Plataforma SaaS B2B para Gestión Avícola

Plataforma web ultra premium para la gestión integral de granjas avícolas de producción de huevos. Sistema completo con dashboard ejecutivo, 13 módulos operacionales y diseño B2B de nivel empresarial.

## 🎯 Objetivo

Proporcionar una solución SaaS profesional para productores de huevos que permita controlar la operación completa de una granja avícola, incluyendo producción, sanidad, ambiente, comercialización, y análisis integrado.

## ✨ Características Principales

### 📊 Dashboard Ejecutivo
- KPIs principales de la granja
- Gráficos de producción semanal
- Consumo diario de alimento y agua
- Ingresos últimos 6 meses
- Eficiencia por galpón
- Ranking de rendimiento
- Alertas críticas activas
- Accesos rápidos a funcionalidades principales

### 🥚 Gestión Productiva
- Registro de producción diaria
- Seguimiento de huevos aptos, rotos, sucios
- Análisis de calidad por galpón
- Histórico de producción
- Clasificación de huevos
- Comparativas históricas
- Indicadores de rendimiento

### 🏥 Gestión Sanitaria
- Registro de vacunaciones
- Gestión de tratamientos preventivos y correctivos
- Calendario sanitario
- Historial de salud por lote
- Estado sanitario general
- Seguimiento de cobertura vacunal
- Alertas por vacunas vencidas

### 🌡️ Gestión Ambiental
- Control de temperatura 24h
- Monitoreo de humedad
- Consumo de alimento en tiempo real
- Consumo de agua
- Gestión de silos
- Control de ventiladores y cortinas
- Parámetros históricos
- Alertas de ambiente fuera de rango

### 💰 Gestión Comercial
- Registro de ventas
- Gestión de clientes
- Análisis de rentabilidad
- Ingresos por período
- Comparativa producción vs ventas
- Reportes de ventas
- Seguimiento de pagos

### 🏚️ Gestión de Galpones
- Listado completo de galpones
- Detalles de capacidad y población
- Estado sanitario y ambiental
- Producción diaria por galpón
- Comparativa de eficiencia
- Consumo de recursos
- Alertas activas

### 📋 Gestión de Lotes
- Seguimiento del ciclo productivo
- Edad de las aves
- Etapas de producción
- Producción acumulada
- Estado sanitario
- Vida útil y fecha de recambio
- Trazabilidad completa

### 🚨 Centro de Alertas
- Alertas productivas
- Alertas sanitarias
- Alertas ambientales
- Alertas de consumo
- Filtrado por prioridad
- Seguimiento de estado
- Recomendaciones de acción

### 📈 Reportes y Analítica
- Reportes productivos
- Reportes sanitarios
- Reportes ambientales
- Reportes comerciales
- Exportación PDF/Excel
- Análisis por período
- Comparativas históricas

### 👥 Usuarios y Roles
- Gestión de usuarios
- Roles: Admin, Gerente, Supervisor, Operario, Comercial, Veterinario
- Matriz de permisos
- Auditoría de actividad
- Último acceso registrado

### 📱 App Operativa de Campo
- Interfaz móvil simplificada
- Carga rápida de producción
- Registro de eventos
- Consulta de tareas
- Alertas asignadas
- Confirmación de carga

### 🔌 Integraciones IoT
- Gestión de sensores
- Sensores de temperatura
- Sensores de alimento
- Sensores de agua
- Estado de dispositivos
- Lecturas en tiempo real
- Historial de datos

### ⚙️ Configuración del Sistema
- Parámetros operativos
- Umbrales de alerta personalizables
- Configuración de roles y permisos
- Información de empresa
- Personalización de indicadores

## 🛠️ Stack Tecnológico

- **Framework:** Next.js 16 con App Router
- **Lenguaje:** TypeScript
- **Estilos:** Tailwind CSS
- **Componentes UI:** shadcn/ui
- **Iconos:** Lucide React
- **Gráficos:** Recharts
- **Fechas:** date-fns
- **Node:** v20+

## 📦 Instalación

```bash
# Clonar repositorio
git clone https://github.com/tubiofederico-prog/avicola-platform.git
cd avicola-platform

# Instalar dependencias
npm install

# Ejecutar servidor de desarrollo
npm run dev

# Compilar para producción
npm run build

# Iniciar servidor de producción
npm start
```

La aplicación estará disponible en `http://localhost:3002`

## 📁 Estructura del Proyecto

```
avicola-platform/
├── app/
│   ├── page.tsx                 # Dashboard principal
│   ├── productiva/              # Gestión productiva
│   ├── sanitaria/               # Gestión sanitaria
│   ├── ambiental/               # Gestión ambiental
│   ├── comercial/               # Gestión comercial
│   ├── galpones/                # Gestión de galpones
│   ├── lotes/                   # Gestión de lotes
│   ├── alertas/                 # Centro de alertas
│   ├── reportes/                # Reportes
│   ├── usuarios/                # Usuarios y roles
│   ├── campo/                   # App de campo
│   ├── integraciones/           # Integraciones IoT
│   ├── configuracion/           # Configuración
│   ├── layout.tsx               # Layout principal
│   └── globals.css              # Estilos globales
├── components/
│   ├── sidebar.tsx              # Barra lateral
│   ├── topbar.tsx               # Barra superior
│   ├── tabs.tsx                 # Componente de pestañas
│   ├── card-kpi.tsx             # Tarjetas KPI
│   ├── data-table.tsx           # Tabla de datos
│   └── status-badge.tsx         # Badges de estado
├── lib/
│   ├── types.ts                 # Tipos TypeScript
│   ├── mock-data.ts             # Datos mockeados
│   ├── utils.ts                 # Utilidades
└── package.json
```

## 🎨 Diseño Visual

- **Paleta de colores:** Esmeralda y pizarra con acentos profesionales
- **Tipografía:** Geist Sans (moderna y legible)
- **Componentes:** Bordes redondeados, sombras suaves, tarjetas limpias
- **Responsive:** Optimizado para desktop B2B (adaptable a tablet/mobile)
- **Tema:** Fondo blanco/light mode con elementos profesionales

## 📊 Datos Mockeados

Todos los datos son realistas y basados en:
- **4 galpones** con capacidades variables (25k-60k aves)
- **4 lotes** en diferentes etapas productivas
- **Producción diaria** de ~141,000 huevos
- **Historial de 7 días** de datos
- **6 meses** de tendencias de ventas
- **Sensores IoT** simulados
- **Usuarios con diferentes roles**

## 🚀 Funcionalidades Clave

✅ Dashboard con KPIs en tiempo real
✅ Múltiples módulos independientes
✅ Navegación completa sin backend
✅ Datos mockeados realistas
✅ Gráficos y visualizaciones
✅ Tablas de datos interactivas
✅ Diseño responsive
✅ Componentes reutilizables
✅ TypeScript para seguridad de tipos
✅ Tailwind CSS para estilos

## 📝 Notas Importantes

- Este es un **prototipo visual completamente funcional**
- **No requiere backend** — todos los datos son mockeados
- **No necesita base de datos** — los datos están en archivos TypeScript
- **No se conecta a APIs externas** — listo para demostración
- Ideado para **presentación a clientes** como solución SaaS
- Totalmente **personalizable y extensible**

## 🔄 Próximos Pasos para Producción

Para llevar esto a producción:

1. Conectar a backend real (Node.js, Python, etc.)
2. Implementar autenticación real (OAuth, JWT)
3. Configurar base de datos (PostgreSQL, MongoDB, etc.)
4. Implementar APIs REST/GraphQL
5. Agregar validaciones de formularios
6. Implementar exportación real de reportes
7. Configurar hosting (Vercel, AWS, etc.)
8. Agregar tests automatizados
9. Implementar CI/CD
10. Configurar monitoreo y logging

## 📄 Licencia

Este proyecto es de demostración. Todos los derechos reservados.

## 👨‍💻 Autor

Desarrollado por Federico Tubio - tubiofederico@gmail.com

## 📞 Contacto

Para consultas sobre personalización o implementación:
- Email: tubiofederico@gmail.com

---

**AvícolaPro** — La solución SaaS para productores de huevos que buscan optimizar su operación avícola.
