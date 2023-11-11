export interface TeamsInterface {
	equipo_id: number;
	nombre_equipo: string;
	icono: string;
	color: string;
	categoria_id: string;
	lider_id: number;
	nombre_lider: string;
	integrantes: Array<{ nombre: string; codigo: string }>;
	fecha_creacion: Date;
}