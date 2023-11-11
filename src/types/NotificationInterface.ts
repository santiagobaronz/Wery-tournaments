export interface NotificationInterface {
	id: number;
	titulo: string;
	mensaje: string;
	accion: string;
	enlace: string;
	prioridad: 'baja' | 'normal' | 'alta';
	fecha: string;
}