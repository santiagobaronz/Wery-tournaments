'use client'

import { getDate } from '@/src/utils/getDate';
import Slider from './components/Slider';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import Resume from './components/Resume';
import Teams from './components/Teams';
import Tournaments from './components/Tournaments';

export default function page() {

	const { data: session, status } = useSession();
	const [name, setName] = useState("")

	useEffect(() => {
		const getName = () => {
			if (status == "authenticated" && session.user.nombre) {
				const nombreCompleto = session.user.nombre;
				const palabras = nombreCompleto.split(" ");

				if (palabras.length >= 2) {
					const primerNombre = palabras[0];
					const segundoNombre = palabras[1];
					setName(primerNombre + " " + segundoNombre);
				} else {
					setName(palabras[0]);
				}
			} else {
				return null;
			}
		}
		getName();
	}, [status])

	return (
		<div className='container'>
			<div className='flex justify-between text-white'>
				<h1 className='text-xl'>Hola, {name}</h1>
				<p className='text-lg'>{getDate(new Date(), 'DDMY')}</p>
			</div>

			<div className='flex gap-x-10 mt-8'>
				<div className='w-4/6 h-[375px] shadow-sm'>
					<Slider></Slider>
				</div>
				<div className='w-2/6 h-[375px] bg-bg-highlighted rounded-2xl shadow-sm'>
					<Resume></Resume>
				</div>
			</div>

			<div className='flex gap-x-10 mt-8'>
				<div className='w-4/6 h-min bg-bg-highlighted rounded-2xl shadow-sm'>
					<div className='p-10'>
						<Teams columns={2} maxTeams={6} id_evento={0} type={'complete'} label={'Últimos equipos registrados en Wery'}/>
					</div>
				</div>
				<div className='w-2/6 h-min bg-bg-highlighted rounded-2xl shadow-sm'>
					<div className='p-10'>
						<h3 className='text-white font-semibold text-lg'>Próximos torneos de programación</h3>
						<Tournaments></Tournaments>
					</div>
				</div>
			</div>
		</div>
	)
}
