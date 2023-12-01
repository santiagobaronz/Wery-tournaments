import GetIcons from '@/app/dashboard/components/GetIcons';
import Teams from '@/app/dashboard/components/Teams'
import { TeamsInterface } from '@/src/types/TeamsInterface';
import { parseName } from '@/src/utils/parseName';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import { BiSolidLockAlt } from 'react-icons/bi';
import Swal from 'sweetalert2';

interface DetailsProps {
	id_evento: number;
}

export default function Details(props: DetailsProps) {

	const id_evento = props.id_evento;
	const { data: session, status, update } = useSession();
	const [team, setTeam] = useState<TeamsInterface | null>(null);
	const [participandoEnTorneo, setParticipandoEnTorneo] = useState(false)

	useEffect(() => {
		const getTeamInfo = async () => {
			if (status == 'authenticated') {
				const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/equipos/${session?.user.id_equipo}/${id_evento}`);
				if (response.ok) {
					const data: TeamsInterface = await response.json();
					const integrantesArray = typeof data.integrantes === 'string' ? JSON.parse(data.integrantes) : data.integrantes;
					const updatedTeam = {
						...data,
						integrantes: integrantesArray
					};
					setTeam(updatedTeam);
				} else {
					console.error('Error al obtener los equipos.');
					return null;
				}

				const response2 = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/equipos/consultarCantidad/${session?.user.id_equipo}/${id_evento}`);
				if (response2.ok) {
					const { registradoEnTorneo }= await response2.json();
					setParticipandoEnTorneo(registradoEnTorneo)
				} else {
					console.error('Error al obtener cantidad.');
					return null;
				}
			}
		}
		getTeamInfo();
	}, [status])

	const handleTeamRegister = async (torneoId: number) => {

		const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/eventos/agregarEquipo`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				idEquipo: session?.user.id_equipo,
				idEvento: torneoId
			}),
		});

		if (response.ok) {
			Swal.fire({
				icon: "success",
				title: "¡Te has inscrito!",
				text: "Te acabas de inscribir a este torneo. Mantente atento a cualquier notificación",
				background: '#1D1E2B',
				color: '#d2d3e0bf',
				confirmButtonColor: '#2faf5a',
			});
			setTimeout(function() {
				location.reload();
			  }, 3000);
		}
	}

	const handleEliminarInscripcion = async (torneoId: number) => {

		const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/eventos/eliminarEquipo`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				idEquipo: session?.user.id_equipo,
				idEvento: torneoId
			}),
		});

		if (response.ok) {
			Swal.fire({
				icon: "success",
				title: "¡Ya no estas participando en este torneo!",
				text: "Puedes volverte a inscribir si hay cupos suficientes",
				background: '#1D1E2B',
				color: '#d2d3e0bf',
				confirmButtonColor: '#2faf5a',
			});
			setTimeout(function() {
				location.reload();
			  }, 3000);
		}
	}

	return (
		<div className='mt-10'>
			<div className='flex gap-10'>
				<div className='w-4/6 bg-bg-highlighted rounded-2xl shadow-sm h-min'>
					<div className='p-10'>
						<Teams columns={2} maxTeams={100} id_evento={id_evento} type={'event'} label={'Equipos registrados en este torneo'}></Teams>
					</div>
				</div>
				<div className='bg-[#2A2D30] p-10 rounded-xl w-2/6'>
					<h3 className="text-white font-semibold text-lg">Inscribirse a este torneo</h3>

					{(session?.user.id_equipo == null) ? (
						<div className='bg-[#383E4B] rounded-xl p-5 h-48 mt-8'>
							<div className='text-center flex flex-col justify-between h-full items-center'>
								<div className='m-auto'>
									<div className='flex justify-center mb-2'>
										<BiSolidLockAlt size={30} fill={'#FFF'}></BiSolidLockAlt>
									</div>
									<p className='text-white'>Aún no estas en un equipo</p>
								</div>
								<Link href={'/dashboard/equipos'} className='bg-blue hover:bg-blue/70 transition-all w-full block py-3 text-center rounded-md text-white'>Encontrar un equipo</Link>
							</div>
						</div>

					) : (
						<>
							{(team !== null) && (
								<>
									<div key={team.equipo_id} className='flex h-20 rounded-lg mt-5 bg-[#383E4B] items-center gap-x-5 px-5 hover:translate-x-0.5 hover:-translate-y-0.5 transition-all'>
										<GetIcons icon={team.icono} color={team.color}></GetIcons>
										<div className='w-5/6'>
											<h4 className='text-white font-semibold'>{team.nombre_equipo}</h4>
											<p className='text-text-color'>Categoria: {team.nombre_categoria}</p>
										</div>
									</div>

									<div>
										<h3 className='mt-5 mb-2 text-white'>Integrantes del equipo:</h3>
										{team.integrantes.map((integrante, index) => (
											<div key={index} className='py-3 bg-text-color px-5 rounded-md mb-2'>
												<p>{integrante.nombre} ({integrante.codigo})</p>
											</div>
										))}
									</div>

									<div className='mt-5'>
										{participandoEnTorneo ? (
											<div>
												<div className='px-3 py-4 bg-green w-full text-white rounded-lg mb-3 text-center'>Ya estás inscrito</div>
												<button className='px-3 py-4 bg-[#DF5749] w-full text-white rounded-lg' onClick={() => handleEliminarInscripcion(id_evento)}>Eliminar inscripción</button>
											</div>
										) : (
											<>
												{team.integrantes.length == 3 ? (
													<div>
														<button className='px-3 py-4 bg-blue w-full text-white rounded-lg' onClick={() => handleTeamRegister(id_evento)}>Inscribirse en este torneo</button>
													</div>
												) : (
													<div>
														<button className='px-3 py-4 bg-blue w-full text-white rounded-lg cursor-not-allowed'>Necesitas 3 integrantes para inscribirse</button>
													</div>
												)}
											</>
										)}
									</div>
								</>
							)}
						</>
					)}
				</div>
			</div>
		</div>
	)
}


