import { TeamsInterface } from "../types/TeamsInterface";

export const getTeams = async (maxTeams: number, id_evento: number): Promise<TeamsInterface[] | null> => {

	if (id_evento == 0) {
		try {
			const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/equipos`);
			if (response.ok) {
				const data: TeamsInterface[] = await response.json();
				const teams = data.slice(0, maxTeams).reverse().map((team: TeamsInterface) => {
					let integrantesArray = team.integrantes;

					if (typeof team.integrantes === 'string') {
						integrantesArray = JSON.parse(team.integrantes);
					}
					return {
						...team,
						integrantes: integrantesArray
					};
				});
				return teams;
			} else {
				console.error('Error al obtener los equipos.');
				return null;
			}
		} catch (error) {
			console.error('Error al realizar la solicitud:', error);
			return null;
		}

	}else{
		try {
			const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/eventos/equipos/${id_evento}`);
			if (response.ok) {
				const data: TeamsInterface[] = await response.json();
				const teams = data.slice(0, maxTeams).reverse();
				return teams;
			} else {
				console.error('Error al obtener los equipos.');
				return null;
			}
		} catch (error) {
			console.error('Error al realizar la solicitud:', error);
			return null;
		}
	}
}