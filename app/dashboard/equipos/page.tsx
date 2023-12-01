'use client'

import { getDate } from '@/src/utils/getDate'
import React, { useEffect, useState } from 'react'
import Teams from '../components/Teams'
import { useSession } from 'next-auth/react';
import { BiSolidLockAlt } from 'react-icons/bi';
import Link from 'next/link';
import { TeamsInterface } from '@/src/types/TeamsInterface';
import GetIcons from '../components/GetIcons';
import Swal from 'sweetalert2'

export default function page() {

	const { data: session, status, update } = useSession();
	const [team, setTeam] = useState<TeamsInterface | null>(null);
	const [teams, setTeams] = useState<TeamsInterface[] | null>(null);

	useEffect(() => {
		const getTeams = async () => {
			const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/equipos`);
			if (response.ok) {
				const data: TeamsInterface[] = await response.json();
				const teams = data.slice(0, 100).reverse().map((team: TeamsInterface) => {
					let integrantesArray = team.integrantes;

					if (typeof team.integrantes === 'string') {
						integrantesArray = JSON.parse(team.integrantes);
					}
					return {
						...team,
						integrantes: integrantesArray
					};
				});
				setTeams(teams);
			} else {
				console.error('Error al obtener los equipos.');
				return null;
			}
		}
		getTeams();
	}, [session?.user])


	useEffect(() => {
		const getTeamInfo = async () => {
			if (status == 'authenticated' && session.user.id_equipo != null) {
				const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/equipos/${session?.user.id_equipo}`);
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
			}
		}
		getTeamInfo();
	}, [status])

	const deleteTeam = () => {
		fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/equipos/${team?.equipo_id}`, {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json',
			},
		})
			.then(response => {
				if (!response.ok) {
					throw new Error(`HTTP error! Status: ${response.status}`);
				}
				return response.json();
			})
			.then(data => {
				console.log('Equipo eliminado exitosamente:', data);
				update({
					...session,
					user: {
						...session?.user,
						categoria_equipo: null,
						nombre_equipo: null,
						id_equipo: null
					}
				})
			})
			.catch(error => {
				console.error('Error al eliminar el equipo:', error);
			});
	}

	const handleRegister = async (teamId: number, members: number, nombre: string, categoria: number) => {

		if (session?.user.id_equipo == null) {
			if (members < 3) {
				Swal.fire({
					title: "¿Quieres unirte a este equipo?",
					text: "Al entrar a un equipo actualizarás la categoría si tienes una categoría eres mayor a la actual",
					icon: "warning",
					showCancelButton: true,
					cancelButtonColor: "#d33",
					confirmButtonText: "¡Sí, unirme!",
					cancelButtonText: "Olvídalo",
					background: '#1D1E2B',
					color: '#d2d3e0bf',
					confirmButtonColor: '#2faf5a',
				}).then(async (result) => {
					if (result.isConfirmed) {

						const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/equipos/integrantes/agregar`, {
							method: 'POST',
							headers: {
								'Content-Type': 'application/json',
							},
							body: JSON.stringify({
								usuario_id: session?.user.usuario_id,
								equipo_id: teamId,
								categoria_usuario: session?.user.categoria_materia_id
							}),
						});

						if (response.ok) {
							Swal.fire({
								title: "¡Te has unido al equipo!",
								text: "Participa en eventos y gana premios",
								icon: "success",
								background: '#1D1E2B',
								color: '#d2d3e0bf',
								confirmButtonColor: '#2faf5a',
							});

							let catToSend;

							if (session?.user.categoria_materia_id != null) {
								catToSend = categoria > session?.user.categoria_materia_id ? categoria : session?.user.categoria_materia_id
							} else {
								catToSend = categoria;
							}

							switch (catToSend) {
								case 1:
									catToSend = "Básica"
									break;
								case 2:
									catToSend = "Intermedia"
									break;
								case 3:
									catToSend = "Avanzada"
									break;
								case 4:
									catToSend = "Elite"
									break;
							}

							update({
								...session,
								user: {
									...session?.user,
									categoria_equipo: catToSend,
									nombre_equipo: nombre,
									id_equipo: teamId
								}
							})


						} else {
							console.error('Error al crear el equipo');
						}
					}
				});
			} else {
				Swal.fire({
					icon: "error",
					title: "Oops...",
					text: "¡Este equipo ya esta completo!",
					background: '#1D1E2B',
					color: '#d2d3e0bf',
					confirmButtonColor: '#2faf5a',
				});
			}
		} else {
			Swal.fire({
				icon: "error",
				title: "Oops...",
				text: "¡No puedes estar en dos equipos al tiempo!",
				background: '#1D1E2B',
				color: '#d2d3e0bf',
				confirmButtonColor: '#2faf5a',
			});
		}


	}

	const handleLeave = async () => {

		const arrayCategorias = team?.integrantes.map(({ id_usuario, categoria_id }) => ({ id_usuario, categoria_id }));

		const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/integrantes/eliminarIntegrante`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				usuarioId: session?.user.usuario_id,
				equipoId: session?.user.id_equipo,
				nuevasCategorias: arrayCategorias
			}),
		});

		if (response.ok) {
			update({
				...session,
				user: {
					...session?.user,
					categoria_equipo: null,
					nombre_equipo: null,
					id_equipo: null
				}
			})
		}
	}

	return (
		<div className='container'>
			<div className='flex justify-between text-white'>
				<h1 className='text-xl'>Estas en la sección de equipos</h1>
				<p className='text-lg'>{getDate(new Date(), 'DDMY')}</p>
			</div>

			<div className='flex gap-x-10 mt-8'>
				<div className='w-2/6 bg-bg-highlighted rounded-2xl shadow-sm'>
					<div className='p-10'>
						<h3 className='text-white text-lg'>Información de tu equipo</h3>

						{session?.user.id_equipo == null ? (
							<div className='bg-[#383E4B] rounded-xl p-5 h-48 mt-8'>
								<div className='text-center flex flex-col justify-between h-full items-center'>
									<div className='m-auto'>
										<div className='flex justify-center mb-2'>
											<BiSolidLockAlt size={30} fill={'#FFF'}></BiSolidLockAlt>
										</div>
										<p className='text-white'>Aún no estas en un equipo</p>
									</div>
									<Link href={'/dashboard/equipos/crear'} className='bg-blue hover:bg-blue/70 transition-all w-full block py-3 text-center rounded-md text-white'>Crear un equipo</Link>
								</div>
							</div>
						) : (
							<div>
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

										<div>
											<h3 className='mt-5 mb-2 text-white'>Opciones:</h3>
											{team.lider_id == session.user.usuario_id ? (
												<div>
													<button className='bg-blue text-white px-3 py-3 w-full rounded-lg mb-3'>Editar equipo</button>
													<button className='bg-[#DF5749] text-white px-3 py-3 w-full rounded-lg' onClick={deleteTeam}>Eliminar equipo</button>
												</div>
											) : (
												<div>
													<button className='bg-[#DF5749] text-white px-3 py-3 w-full rounded-lg' onClick={handleLeave}>Salir del equipo</button>
												</div>
											)}
										</div>
									</>
								)}
							</div>
						)}
					</div>
				</div>
				<div className='w-4/6 h-min bg-bg-highlighted rounded-2xl shadow-sm'>
					<div className='p-10'>
						<h3 className='text-white text-lg'>Últimos equipos registrados en Wery</h3>
						<div className='flex gap-x-5'>
							{(teams !== null) && (
								teams.map((team) => (
									<div
										onClick={() => handleRegister(team.equipo_id, team.integrantes.length, team.nombre_equipo, team.categoria_id)}
										key={team.equipo_id}
										className='flex w-1/2 h-20 rounded-lg cursor-pointer mt-5 bg-[#383E4B] items-center gap-x-5 px-5 hover:translate-x-0.5 hover:-translate-y-0.5 transition-all' >
										<GetIcons icon={team.icono} color={team.color}></GetIcons>
										<div className='w-5/6'>
											<h4 className='text-white font-semibold'>{team.nombre_equipo}</h4>
											<p className='text-text-color'>
												Categoría de participación: {team.nombre_categoria}
											</p>
										</div>
									</div>
								))
							)}
						</div>

					</div>
				</div>
			</div>
		</div>
	)
}
