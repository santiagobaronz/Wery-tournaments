import { EventsInterface } from '@/src/types/EventsInterface';
import { getDate } from '@/src/utils/getDate';
import React, { useEffect, useState } from 'react'
import { BsStarFill } from 'react-icons/bs';

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
		<div className='mt-5'>
			{events !== null &&
				events.map((event) => (
					<div key={event.id} className='flex h-20 rounded-lg mb-5 bg-[#383E4B] items-center gap-x-5 px-5 hover:translate-x-0.5 hover:-translate-y-0.5 transition-all' >
						<div className='rounded-md p-2 bg-blue'>
							<BsStarFill fill={'#FFF'}></BsStarFill>
						</div>
						<div className='w-5/6'>
							<div className='flex gap-x-3 items-center'>
								<h4 className='text-white font-semibold'>{event.nombre_evento}</h4>
							</div>
							<p className='text-text-color'>
								Fecha del torneo: {getDate(new Date(event.fecha_evento), 'DMY')}
							</p>
						</div>
					</div>
				))}
		</div>
	)
}
