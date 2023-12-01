import "next-auth";

declare module "next-auth" {
	interface Session {
		user: {
			usuario_id: number;
			nombre: string;
			codigo: string;
			carrera: string;
			materia_id: string;
			token: string;
			id_equipo: number;
			nombre_equipo: string;
			categoria_equipo: string;
			rol: string;
			categoria_materia: string;
			categoria_materia_id: number;
		};
	}
}