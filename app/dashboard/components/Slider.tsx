import { EventsInterface } from '@/src/types/EventsInterface';
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { BsArrowLeftShort, BsArrowRightShort } from 'react-icons/bs';

export default function Slider() {
	const [currentIndex, setCurrentIndex] = useState(0)
	const [events, setEvents] = useState<EventsInterface[]>([]);

	useEffect(() => {
		const getEvents = async () => {
			try {
				const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/eventos`);
				if (response.ok) {
					const data = await response.json();
					const events = data.slice(0,3).reverse()
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

	const prevSlide = () => {
		const isFirstSlide = currentIndex === 0
		const newIndex = isFirstSlide ? events.length - 1 : currentIndex - 1;
		setCurrentIndex(newIndex);
	}

	const nextSlide = () => {
		const isLastSlide = currentIndex === events.length - 1;
		const newIndex = isLastSlide ? 0 : currentIndex + 1;
		setCurrentIndex(newIndex);
	}

	if (events.length != 0) {
		return (
			<div className='max-w-full h-[375px] w-full m-auto relative group'>
				<Link href={`/dashboard/torneos/evento/${events[currentIndex].id.toString()}`} className='max-w-full h-[412px] w-full m-auto relative '>
					<div style={{ backgroundImage: `url(${events[currentIndex].foto_evento})` }} className='w-full h-full rounded-2xl bg-center bg-cover duration-500'></div>
				</Link>
				<div onClick={prevSlide} className='cursor-pointer absolute top-[50%] -translate-x-0 translate-y-[-50%] left-5 text-2xl rounded-full p-2 bg-bg-highlighted/50 text-white'>
					<BsArrowLeftShort size={30}></BsArrowLeftShort>
				</div>
				<div onClick={nextSlide} className='cursor-pointer absolute top-[50%] -translate-x-0 translate-y-[-50%] right-5 text-2xl rounded-full p-2 bg-bg-highlighted/50 text-white'>
					<BsArrowRightShort size={30}></BsArrowRightShort>
				</div>
			</div>
		)
	}


}
