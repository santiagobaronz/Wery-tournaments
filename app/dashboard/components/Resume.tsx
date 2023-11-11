import { useSession } from 'next-auth/react';
import { BsPersonFill } from 'react-icons/bs'
import { BiSolidLockAlt } from "react-icons/bi";
import React, { useEffect, useState } from 'react'
import Link from 'next/link';
import { EventsTeams } from '@/src/types/EventsTeams';
import { TeamMembers } from '@/src/types/TeamMembers';

export default function Resume() {

	const { data: session, status } = useSession();
	const [eventsTeams, setEventsTeams] = useState<EventsTeams[]>([]);
	const [teamMembers, setTeamMembers] = useState<TeamMembers[]>([]);

	useEffect(() => {
		const getEvents = async () => {
			try {
				const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/equipos/eventos/${session?.user.id_equipo}`);
				if (response.ok) {
					const data = await response.json();
					setEventsTeams(data);
				} else {
					console.error('Error al obtener los eventos del equipo.');
				}
			} catch (error) {
				console.error('Error al realizar la solicitud:', error);
			}
		};

		const getMembers = async () => {
			try {
				const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/equipos/integrantes/${session?.user.id_equipo}`);
				if (response.ok) {
					const data = await response.json();
					setTeamMembers(data);
				} else {
					console.error('Error al obtener los miembros del equipo.');
				}
			} catch (error) {
				console.error('Error al realizar la solicitud:', error);
			}
		};

		
		if (session?.user.id_equipo != null) {
			getEvents();
			getMembers();
		}


	}, [status]);

	return (
		<div className='p-10'>
			<div className='flex gap-x-5 items-center'>
				<div className="w-16 h-16 rounded-full flex justify-center items-center bg-[#BFE9FF]">
					<p className="text-[#2e5a83] font-bold text-3xl">
						<BsPersonFill></BsPersonFill>
					</p>
				</div>
				<div className='text-white'>
					<p className='font-semibold text-xl'>{session?.user.nombre}</p>
					<p>{session?.user.carrera}</p>
				</div>
			</div>
			<div>
				{(session?.user.id_equipo == null) ? (
					<div className='bg-[#383E4B] rounded-xl p-5 h-48 mt-8'>
						<div className='text-center flex flex-col justify-between h-full items-center'>
							<div className='m-auto'>
								<div className='flex justify-center mb-2'>
									<BiSolidLockAlt size={30} fill={'#FFF'}></BiSolidLockAlt>
								</div>
								<p className='text-white'>Aún no estas en un equipo</p>
							</div>
							<Link href={'#'} className='bg-blue hover:bg-blue/70 transition-all w-full block py-3 text-center rounded-md text-white'>Encontrar un equipo</Link>
						</div>
					</div>

				) : (
					<div className='flex flex-col justify-between h-48 mt-5'>
						<div className='flex gap-x-5'>
							<h3 className='text-white bg-pink w-4/6 text-center py-2 rounded-md'>{session.user.nombre_equipo}</h3>
							<h3 className='text-white bg-[#383E4B] w-2/6 text-center py-2 rounded-md'>{session.user.categoria_equipo}</h3>
						</div>

						<div className='flex gap-x-5 mt-5'>
							<div className='border border-[#383E4B] rounded-xl p-5 w-1/2 bg-[#2E3133]'>
								<p className='text-xl text-white font-bold'>{eventsTeams.length}</p>
								<p className='text-text-color font-light'>Eventos con registro</p>
							</div>
							<div className='border border-[#383E4B] rounded-xl p-5 w-1/2 bg-[#2E3133]'>
								<p className='text-xl text-white font-bold'>{teamMembers.length}</p>
								<p className='text-text-color font-light'>Integrantes</p>
							</div>
						</div>

						<Link href={'#'} className='bg-blue hover:bg-blue/70 transition-all mt-5 w-full block py-3 text-center rounded-md text-white'> Ver torneos</Link>

					</div>
				)}
			</div>
		</div>
	)
}
