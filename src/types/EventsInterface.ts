export interface EventsInterface {
	id: number;
	nombre_evento: string;
	descripcion_evento: string;
	fecha_evento: Date;
	fecha_inscripcion_inicio: Date;
	fecha_inscripcion_fin: Date;
	foto_evento: string;
	organizador_id: string;
	premio: string;
}