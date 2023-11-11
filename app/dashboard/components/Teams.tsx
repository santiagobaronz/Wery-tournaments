import React, { useEffect, useState } from 'react'
import { TeamsInterface } from '@/src/types/TeamsInterface';
import { getTeams } from '@/src/utils/getTeams';
import { getDate } from '@/src/utils/getDate';
import GetIcons from './GetIcons';
import { useSession } from 'next-auth/react';

interface LastestTeamsProps {
	columns: number;
	maxTeams: number;
	id_evento: number;
	type: string;
}
export default function Teams(props: LastestTeamsProps) {

	const columns = props.columns;
	const maxTeams = props.maxTeams;
	const id_event = props.id_evento;
	const type_event = props.type;

	const [teams, setTeams] = useState<TeamsInterface[] | null>(null);

	useEffect(() => {
		const getTeamsRequest = async () => {
			const response = await getTeams(maxTeams, id_event);
			if (response !== null) {
				setTeams(response);
			}
		}

		getTeamsRequest();
	}, [maxTeams]);

	const getName = (name:string) => {
		const nameComplete = name;
		const words = nameComplete.split(" ");

		if (words.length >= 2) {
			const firstName = words[0];
			const middleName = words[1];
			return firstName + " " + middleName;
		} else {
			return words[0];
		}
	}

	return (
		<div className={`grid ${columns == 2 ? 'grid-cols-2' : 'grid-cols-3'} gap-5 mt-5`}>
			{(teams !== null && type_event == 'complete') &&
				teams.map((team) => (
					<div key={team.equipo_id} className='flex h-20 rounded-lg bg-[#383E4B] items-center gap-x-5 px-5 hover:translate-x-0.5 hover:-translate-y-0.5 transition-all' >
						<GetIcons icon={team.icono} color={team.color}></GetIcons>
						<div className='w-5/6'>
							<h4 className='text-white font-semibold'>{team.nombre_equipo}</h4>
							<p className='text-text-color'>
								Creado el {getDate(new Date(team.fecha_creacion), 'DMY')}
							</p>
						</div>
					</div>
				))}

			{(teams !== null && type_event == 'event') &&
				teams.map((team) => (
					<div key={team.equipo_id} className='flex h-20 rounded-lg bg-[#383E4B] items-center gap-x-5 px-5 hover:translate-x-0.5 hover:-translate-y-0.5 transition-all' >
						<GetIcons icon={team.icono} color={team.color}></GetIcons>
						<div className='w-5/6'>
							<h4 className='text-white font-semibold'>{team.nombre_equipo}</h4>
							<p className='text-text-color'>Lider del equipo: {getName(team.nombre_lider)}</p>
						</div>
					</div>
				))}
		</div>
	);
}
