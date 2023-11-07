export interface Notificacion {
	id: number;
	titulo: string;
	mensaje: string;
	accion: string;
	enlace: string;
	prioridad: 'baja' | 'normal' | 'alta';
	fecha: string;
}