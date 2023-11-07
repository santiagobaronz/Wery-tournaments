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
		};
	}
}