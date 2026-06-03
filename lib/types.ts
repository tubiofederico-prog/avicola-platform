export interface Galpone {
  id: string;
  nombre: string;
  capacidad: number;
  gallinasActuales: number;
  loteActual: string;
  produccionDiaria: number;
  estadoSanitario: 'Excelente' | 'Bueno' | 'Regular' | 'Crítico';
  estadoAmbiental: 'Óptimo' | 'Aceptable' | 'Alerta' | 'Crítico';
  consumoAlimento: number;
  consumoAgua: number;
  alertasActivas: number;
  eficiencia: number;
  temperatura: number;
  humedad: number;
}

export interface Lote {
  id: string;
  codigo: string;
  galpone: string;
  fechaIngreso: string;
  edad: number;
  cantidadAves: number;
  etapa: 'Crecimiento' | 'Pre-postura' | 'Postura' | 'Descarte';
  produccionAcumulada: number;
  estadoSanitario: 'Excelente' | 'Bueno' | 'Regular' | 'Crítico';
  vidaUtilEstimada: number;
  fechaRecambio: string;
}

export interface RegistroProductivo {
  id: string;
  fecha: string;
  galpone: string;
  lote: string;
  totalHuevos: number;
  huevsAptos: number;
  huevsRotos: number;
  huevsSucios: number;
  huevsDescartados: number;
  eficiencia: number;
  observaciones: string;
  responsable: string;
}

export interface Alerta {
  id: string;
  tipo: 'Productiva' | 'Sanitaria' | 'Ambiental' | 'Consumo' | 'Operativa';
  prioridad: 'Crítica' | 'Alta' | 'Media' | 'Baja';
  fecha: string;
  galpone: string;
  lote?: string;
  descripcion: string;
  estado: 'Activa' | 'Resuelta' | 'En revisión';
  accionRecomendada: string;
}

export interface Venta {
  id: string;
  fecha: string;
  cliente: string;
  cantidadHuevos: number;
  categoria: 'Extra' | 'Primera' | 'Segunda';
  precioUnitario: number;
  total: number;
  estadoPago: 'Pagado' | 'Pendiente' | 'Atrasado';
  observaciones: string;
}

export interface Usuario {
  id: string;
  nombre: string;
  email: string;
  rol: 'Admin' | 'Gerente' | 'Supervisor' | 'Operario' | 'Comercial' | 'Veterinario';
  estado: 'Activo' | 'Inactivo';
  ultimoAcceso: string;
}

export interface Vacunacion {
  id: string;
  fecha: string;
  lote: string;
  vacuna: string;
  dosis: string;
  responsable: string;
  observaciones: string;
}

export interface Tratamiento {
  id: string;
  fecha: string;
  lote: string;
  tipo: 'Preventivo' | 'Correctivo';
  nombre: string;
  dosis: string;
  responsable: string;
  fechaFin?: string;
}

export interface Sensor {
  id: string;
  tipo: 'Temperatura' | 'Alimento' | 'Agua' | 'Ambiental';
  galpone: string;
  estado: 'Conectado' | 'Desconectado';
  ultimaLectura: number;
  fecha: string;
}

export interface Reporte {
  id: string;
  tipo: 'Productivo' | 'Sanitario' | 'Ambiental' | 'Comercial';
  fecha: string;
  galpone?: string;
  lote?: string;
  titulo: string;
  descripcion: string;
  estado: 'Generado' | 'Pendiente';
}
