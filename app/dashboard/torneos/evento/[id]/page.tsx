'use client'
import { EventsInterface } from '@/src/types/EventsInterface';
import { getDate } from '@/src/utils/getDate';
import React, { useEffect, useState } from 'react';
import Details from './components/Details';

export default function page({ params }: { params: { id: number } }) {

	const event_id = params.id;

	const [event, setEvent] = useState<EventsInterface | null>(null);

	useEffect(() => {
		const getEvents = async () => {
			try {
				const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/eventos/${event_id}`);
				if (response.ok) {
					const data = await response.json();
					setEvent(data);
				} else {
					console.error('Error al obtener los eventos.');
				}
			} catch (error) {
				console.error('Error al realizar la solicitud:', error);
			}
		};

		getEvents();
	}, [event_id]);

	console.log(event)

	return (
		<div className='container'>
			<div className='flex justify-between text-white mb-10'>
				<h1 className='text-xl'>Torneos</h1>
				{event !== null && (
					<p className='px-5 py-2 bg-green rounded-lg'>Fecha del evento: {getDate(new Date(event.fecha_evento), 'DDMY')}</p>
				)}
			</div>

			{event !== null ? (
				<div>
					<img src={event.foto_evento} alt={`Imagen del evento ${event.nombre_evento}`} className='rounded-2xl' />
					<h2 className='text-white text-2xl mt-10 font-semibold'>{event.nombre_evento}</h2>
					<p className='text-text-color text-lg mt-3'>{event.descripcion_evento}</p>

					<Details id_evento={event_id}></Details>
				</div>
			) : (
				<div className='w-full h-96 bg-[#2A2D30] rounded-2xl flex justify-center items-center'>
					<p className='text-white text-xl'>Cargando contenido del evento...</p>
				</div>
			)}
		</div>
	)
}