'use client'

import { EventsInterface } from '@/src/types/EventsInterface';
import { getDate } from '@/src/utils/getDate';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import { BsStarFill, BsTelephoneForward } from 'react-icons/bs';

export default function Tournaments() {

	const [events, setEvents] = useState<EventsInterface[]>([]);

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

	return (
		<div>

			<div className='grid xl:grid-cols-3 lg:grid-cols-2 gap-5 mt-10'>
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

			<div className=' bg-[#2A2D30] rounded-xl xl:flex mt-8 p-8 w-5/6 m-auto'>
				<div className='xl:flex items-center gap-x-8 xl:w-7/12 max-xl:text-center max-xl:mb-5'>
					<div className='bg-green rounded-full p-3 w-min mx-auto max-xl:mb-5'>
						<BsTelephoneForward className='text-4xl text-white'></BsTelephoneForward>
					</div>
					<div className='w-full'>
						<h3 className='text-white max-md:mb-3'>¿Tienes ideas sobre algun evento?</h3>
						<p className='text-text-color'>Comunicate con nosotros a través del correo para leer sobre tu idea.</p>
					</div>
				</div>

				<div className='md:flex xl:justify-end justify-center gap-x-5 items-center xl:w-5/12'>
					<p className={`bg-[#878593] text-white text-center px-20 py-2 rounded-md max-md:w-full max-md:mb-2 transition-all`}>events@wery.com</p>
				</div>
			</div>
		</div>

	)
}
