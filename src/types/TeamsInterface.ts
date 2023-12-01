export interface TeamsInterface {
	equipo_id: number;
	nombre_equipo: string;
	icono: string;
	color: string;
	categoria_id: number;
	lider_id: number;
	nombre_lider: string;
	integrantes: Array<{id_usuario: number; nombre: string; codigo: string, categoria_id: number }>;
	fecha_creacion: Date;
	nombre_categoria: string;
	registrado_en_evento: number;
}