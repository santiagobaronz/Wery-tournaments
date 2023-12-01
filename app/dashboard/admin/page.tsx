'use client'

import { TeamsInterface } from '@/src/types/TeamsInterface';
import { getDate } from '@/src/utils/getDate'
import { useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react'
import GetIcons from '../components/GetIcons';
import Swal from 'sweetalert2';
import { EventsInterface } from '@/src/types/EventsInterface';
import Link from 'next/link';

export default function page() {
	const { data: session, status, update } = useSession();
	const [teams, setTeams] = useState<TeamsInterface[]>([]);
	const [events, setEvents] = useState<EventsInterface[]>([]);

	const [formData, setFormData] = useState({
		nombre_evento: '',
		descripcion_evento: '',
		fecha_evento: '',
		fecha_inscripcion_inicio: '',
		fecha_inscripcion_fin: '',
		foto_evento: '',
		organizador_id: '',
		max_equipos: '',
		premio: '',
	});


	useEffect(() => {
		const getEvents = async () => {
			try {
				const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/eventos`);
				if (response.ok) {
					const data = await response.json();
					const events = data.slice(0, 3).reverse()
					setEvents(events);
				} else {
					console.error('Error al obtener los eventos.');
				}
			} catch (error) {
				console.error('Error al realizar la solicitud:', error);
			}
		};

		getEvents();
	}, []);

	useEffect(() => {
		const getTeamInfo = async () => {
			if (status === 'authenticated') {
				const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/equipos/`);
				if (response.ok) {
					const data: TeamsInterface[] = await response.json();
					setTeams(data);
				} else {
					console.error('Error al obtener los equipos.');
				}
			}
		};
		getTeamInfo();
	}, [status]);

	const deleteTeam = (teamId: number) => {
		fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/equipos/${teamId}`, {
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

				if (session?.user.id_equipo == teamId) {
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

				Swal.fire({
					icon: "success",
					title: "¡Se ha eliminado el equipo!",
					text: "Todos los participantes han sido removidos y no se encuentran en ningun torneo",
					background: '#1D1E2B',
					color: '#d2d3e0bf',
					confirmButtonColor: '#2faf5a',
				});

				setTimeout(function () {
					location.reload();
				}, 3000);
			})
			.catch(error => {
				console.error('Error al eliminar el equipo:', error);
			});
	}

	const handleRegister = async () => {

		const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/eventos`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(formData),
		});

		if (response.ok) {
			Swal.fire({
				title: "¡Se ha creado el evento!",
				text: "Participa en eventos y gana premios",
				icon: "success",
				background: '#1D1E2B',
				color: '#d2d3e0bf',
				confirmButtonColor: '#2faf5a',
			});
		}
	}

	const handleChange = (e: any) => {
		const { name, value } = e.target;
		setFormData((prevData) => ({
			...prevData,
			[name]: value,
		}));
	};




	if (session?.user.rol === 'ADM') {
		return (
			<div className='container'>
				<h3 className="text-white font-semibold text-lg">Equipos registrados</h3>
				<div className={`grid grid-cols-3 gap-5`}>
					{(teams.length > 0) && (
						teams.map((team) => (
							<div key={team.equipo_id} className='flex h-20 rounded-lg bg-[#383E4B] items-center mt-5 gap-x-5 px-5 hover:translate-x-0.5 hover:-translate-y-0.5 transition-all'>
								<GetIcons icon={team.icono} color={team.color}></GetIcons>
								<div className='w-5/6'>
									<h4 className='text-white font-semibold'>{team.nombre_equipo}</h4>
									<p className='text-text-color'>
										Creado el {getDate(new Date(team.fecha_creacion), 'DMY')}
									</p>
								</div>
								<button className='px-5 py-2 rounded-xl text-white bg-[#DF5749]' onClick={() => deleteTeam(team.equipo_id)}>X</button>
							</div>
						))
					)}
				</div>

				<h3 className="text-white font-semibold text-lg mt-10">Eventos</h3>

				<div className='flex gap-x-10'>

					<div className='w-1/2'>
						<form className=" bg-bg-highlighted p-6 rounded shadow-md">
							<label className="block mb-4">
								<p className='text-white'>Nombre del evento:</p>
								<input
									type="text"
									name="nombre_evento"
									value={formData.nombre_evento}
									onChange={handleChange}
									className="w-full bg-white/10 placeholder:text-white text-white  rounded px-3 py-2 mt-1"
								/>
							</label>

							<label className="block mb-4">
								<p className='text-white'>Descripción del Evento:</p>
								<textarea
									name="descripcion_evento"
									value={formData.descripcion_evento}
									onChange={handleChange}
									className="w-full bg-white/10 placeholder:text-white text-white rounded px-3 py-2 mt-1"
								/>
							</label>

							<label className="block mb-4">
								<p className='text-white'>Fecha del evento:</p>
								<input
									type="date"
									name="fecha_evento"
									value={formData.fecha_evento}
									onChange={handleChange}
									className="w-full bg-white/10 placeholder:text-white text-white rounded px-3 py-2 mt-1"
								/>
							</label>

							<label className="block mb-4">
							<p className='text-white'>Fecha de Inscripción - Inicio:</p>
								<input
									type="date"
									name="fecha_inscripcion_inicio"
									value={formData.fecha_inscripcion_inicio}
									onChange={handleChange}
									className="w-full bg-white/10 placeholder:text-white text-white rounded px-3 py-2 mt-1"
								/>
							</label>

							<label className="block mb-4">
							<p className='text-white'>Fecha de Inscripción - Fin:</p>
								<input
									type="date"
									name="fecha_inscripcion_fin"
									value={formData.fecha_inscripcion_fin}
									onChange={handleChange}
									className="w-full bg-white/10 placeholder:text-white text-white rounded px-3 py-2 mt-1"
								/>
							</label>

							<label className="block mb-4">
							<p className='text-white'>Foto del evento:</p>
								<input
									type="text"
									name="foto_evento"
									value={formData.foto_evento}
									onChange={handleChange}
									className="w-full bg-white/10 placeholder:text-white text-white rounded px-3 py-2 mt-1"
								/>
							</label>

							<label className="block mb-4">
							<p className='text-white'>Organizador ID:</p>
								<input
									type="text"
									name="organizador"
									value={session.user.usuario_id}
									onChange={handleChange}
									className="w-full bg-white/10 placeholder:text-white cursor-not-allowed text-white rounded px-3 py-2 mt-1"
								/>
							</label>


							<label className="block mb-4">
							<p className='text-white'>Premio:</p>
								<input
									type="text"
									name="premio"
									value={formData.premio}
									onChange={handleChange}
									className="w-full bg-white/10 placeholder:text-white text-white rounded px-3 py-2 mt-1"
								/>
							</label>

							<button
							onClick={handleRegister}
								className="bg-green text-white px-4 py-2 rounded hover:bg-blue-700 focus:outline-none focus:shadow-outline-blue active:bg-blue-800"
							>
								Guardar
							</button>
						</form>
					</div>

					<div className='w-1/2'>
						<div className='grid grid-cols-2 gap-5'>
							{events.map(event => (
								<Link href={`torneos/evento/${event.id.toString()}`} key={event.id} className='bg-[#2A2D30] cursor-pointer rounded-xl events-card-shadow event-border max-lg:mb-8 transition-all hover:translate-x-0.5 hover:-translate-y-0.5'>
									<img src={event.foto_evento} className='w-[700px] h-[80px] xl:h-[248px] lg:h-44 max-lg:h-52 object-cover rounded-tr-lg rounded-tl-lg' />
									<div className='p-7'>
										<div>
											<h3 className='text-white text-xl font-semibold mb-2'>{event.nombre_evento}</h3>
										</div>
										<p className='mt-2 text-text-color mb-8'>{event.descripcion_evento}</p>
										<p className='text-white'>{getDate(new Date(event.fecha_evento), 'DMY')}</p>
									</div>
								</Link>
							))}
						</div>
					</div>
				</div>
			</div>
		);
	}
}