'use client'

import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import GetIcons from '../../components/GetIcons';
import { getDate } from '@/src/utils/getDate';
import { useSession } from 'next-auth/react';
import { BsApple, BsBrightnessHighFill, BsCloudFill, BsCupHot, BsDice5Fill, BsFillLightningChargeFill, BsFillRocketTakeoffFill, BsHearts, BsMoonStarsFill, BsStarFill, BsSuitClubFill, BsYinYang } from 'react-icons/bs';
import Swal from 'sweetalert2';
import { useRouter } from 'next/navigation';
import { sendNotification } from '@/src/utils/sendNotification';

interface EquipoData {
	nombre_equipo: string;
	icono: string;
	color: string;
	categoria_id: number;
	lider_id: number;
}

const coloresDisponibles = ['purple', 'blue', 'green', 'red', 'pink', 'yellow'];
const iconosDisponibles = ['BsFillLightningChargeFill',
	'BsFillRocketTakeoffFill', 'BsBrightnessHighFill', 'BsCloudFill',
	'BsCupHot', 'BsDice5Fill', 'BsHearts', 'BsMoonStarsFill', 'BsStarFill',
	'BsSuitClubFill', 'BsYinYang'];

export default function page() {

	const { data: session, status, update } = useSession();
	const router = useRouter()
	const [equipoData, setEquipoData] = useState<EquipoData | { nombre_equipo: string; icono: string; color: string }>(() => {
		if (status === 'authenticated' && session) {
			return {
				nombre_equipo: '',
				icono: '',
				color: '',
				categoria_id: session.user.categoria_materia_id || 0,
				lider_id: session.user.usuario_id || 0,
			};
		} else {
			return {
				nombre_equipo: '',
				icono: '',
				color: '',
			};
		}
	});

	const isDisabled = !equipoData.nombre_equipo || !equipoData.icono || !equipoData.color;

	useEffect(() => {
		if (status === 'authenticated' && session) {
			setEquipoData({
				nombre_equipo: '',
				icono: '',
				color: '',
				categoria_id: session.user.categoria_materia_id || 0,
				lider_id: session.user.usuario_id || 0,
			});
		}
	}, [status, session]);

	const getColor = (iconColor: string) => {
		switch (iconColor) {
			case 'purple':
				return '#8B5FBF';
			case 'blue':
				return '#0085ff';
			case 'green':
				return '#24613b';
			case 'red':
				return '#c2402a';
			case 'pink':
				return '#FF6B6B';
			case 'yellow':
				return '#dca10f';
			default:
				return '#A8A9B4';
		}
	}

	const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
		const { name, value } = e.target;
		setEquipoData((prevData) => ({
			...prevData,
			[name]: value,
		}));
	};

	const handleChangeIcono = (selectedIcono: string) => {
		setEquipoData((prevData) => ({
			...prevData,
			icono: selectedIcono,
		}));
	};

	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		try {
			const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/equipos`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(equipoData),
			});

			if (response.ok) {
				const data = await response.json();
				const equipoId = data.equipoId;
				console.log(`Equipo creado exitosamente. ID: ${equipoId}`);
				update({
					...session,
					user: {
						...session?.user,
						categoria_equipo: session?.user.categoria_materia,
						nombre_equipo: equipoData.nombre_equipo,
						id_equipo: equipoId
					}
				})

				if (status == 'authenticated') {
					sendNotification(session?.user.usuario_id,
						"Creaste un equipo", "Invita a dos compañeros a unirse a tu equipo y participa en torneos con increibles premios.",
						"Ir a eventos",
						"http://localhost:3000/dashboard/torneos",
						"alta")
				}


				Swal.fire({
					title: "Se ha creado el equipo",
					confirmButtonText: "Aceptar",
					background: '#1D1E2B',
					color: '#d2d3e0bf',
					confirmButtonColor: '#2faf5a',
				}).then((result) => {
					if (result.isConfirmed) {
						router.push("/dashboard/equipos")
					}
				});

			} else {
				Swal.fire({
					icon: "error",
					title: "Oops...",
					text: "¡Se produjo un error al crear el equipo, verifica el nombre del equipo!",
					background: '#1D1E2B',
					color: '#d2d3e0bf',
					confirmButtonColor: '#2faf5a',
				});
			}
		} catch (error) {
			console.error('Error de red:', error);
		}
	};

	return (
		<div className='container'>

			<div className='flex justify-between text-white'>
				<h1 className='text-xl'>Crear un nuevo equipo</h1>
				<p className='text-lg'>{getDate(new Date(), 'DDMY')}</p>
			</div>

			<div className=' mt-8 text-white bg-[#2A2D30] p-10 rounded-2xl'>
				<p>¡Bienvenido a la página de creación de equipos! Aquí puedes formar tu propio equipo para participar en emocionantes eventos y competiciones.</p>

				<h2 className='font-bold mt-5 mb-2'>¿Cómo funciona?</h2>

				<p className='mb-1'>1. Selecciona un nombre para tu equipo que refleje su esencia y personalidad.</p>

				<p className='mb-1'>2. Elige un icono distintivo que represente visualmente a tu equipo. ¡Explora nuestras opciones y encuentra el que mejor se adapte a tu estilo!</p>

				<p className='mb-1'>3. Selecciona un color que identifique a tu equipo. Puedes elegir entre una variedad de colores vibrantes para personalizar aún más tu experiencia.</p>

				<p className='mb-1'>4. ¡Haz clic en el botón "Crear Equipo" y estarás listo para la acción!</p>

			</div>



			<div className='flex mt-8 rounded-lg gap-x-10'>

				<div className='w-4/6 bg-[#2A2D30] p-10 rounded-2xl'>
					<form onSubmit={handleSubmit}>

						<label>
							<span className='text-white'>Nombre del equipo</span>
						</label>
						<input type="text" name="nombre_equipo" value={equipoData.nombre_equipo} onChange={handleChange}
							className='w-full px-5 py-3 mt-2 mb-6  rounded-lg bg-white/10 placeholder:text-white/30'
							placeholder='Ingresa el nombre de tu equipo' />

						<label>
							<p className='text-white mb-3'>Icono del equipo</p>
						</label>
						<div className='flex gap-x-3 mb-8'>
							{iconosDisponibles.map((icono) => (
								<div key={icono} style={{ backgroundColor: getColor(equipoData.color) }} className='p-6 rounded-lg cursor-pointer' onClick={() => handleChangeIcono(icono)}>
									{(() => {
										switch (icono) {
											case 'BsFillLightningChargeFill':
												return <BsFillLightningChargeFill size={'20px'} fill={'#FFF'} />;
											case 'BsFillRocketTakeoffFill':
												return <BsFillRocketTakeoffFill size={'20px'} fill={'#FFF'} />;
											case 'BsApple':
												return <BsApple size={'20px'} fill={'#FFF'} />;
											case 'BsBrightnessHighFill':
												return <BsBrightnessHighFill size={'20px'} fill={'#FFF'} />;
											case 'BsCloudFill':
												return <BsCloudFill size={'20px'} fill={'#FFF'} />;
											case 'BsCupHot':
												return <BsCupHot size={'20px'} fill={'#FFF'} />;
											case 'BsDice5Fill':
												return <BsDice5Fill size={'20px'} fill={'#FFF'} />;
											case 'BsHearts':
												return <BsHearts size={'20px'} fill={'#FFF'} />;
											case 'BsMoonStarsFill':
												return <BsMoonStarsFill size={'20px'} fill={'#FFF'} />;
											case 'BsStarFill':
												return <BsStarFill size={'20px'} fill={'#FFF'} />;
											case 'BsSuitClubFill':
												return <BsSuitClubFill size={'20px'} fill={'#FFF'} />;
											case 'BsYinYang':
												return <BsYinYang size={'20px'} fill={'#FFF'} />;
											default:
												return null;
										}
									})()}
								</div>
							))}
						</div>


						<label>
							<p className='text-white mb-3'>Color del equipo</p>
						</label>
						<div className='flex gap-x-5 mb-8'>
							{coloresDisponibles.map((color) => (
								<label key={color} style={{ backgroundColor: getColor(color) }} className='px-[22px] py-4 rounded-lg'>
									<input
										type="radio"
										name="color"
										value={color}
										checked={equipoData.color === color}
										onChange={handleChange}
										className='opacity-0'
									/>
								</label>
							))}
						</div>

						<button
							className={`${isDisabled ? 'bg-white/30' : 'bg-blue'} text-white px-3 py-3 w-full rounded-lg mt-3`}
							type="submit"
							disabled={isDisabled}
						>
							Crear equipo
						</button>
					</form>
				</div>

				<div className='w-2/6 bg-[#2A2D30] p-10 rounded-2xl h-min'>
					<h3 className='text-white'>Previsualización de equipo</h3>
					<div className='flex h-20 rounded-lg mt-5 bg-[#383E4B] items-center gap-x-5 px-5 hover:translate-x-0.5 hover:-translate-y-0.5 transition-all'>
						<GetIcons icon={equipoData.icono} color={equipoData.color}></GetIcons>
						<div className='w-5/6'>
							<h4 className='text-white font-semibold'>{equipoData.nombre_equipo}</h4>
							<p className='text-text-color'>Categoria: {session?.user.categoria_materia}</p>
						</div>
					</div>
					<div>
						<h3 className='mt-5 mb-2 text-white'>Lider del equipo:</h3>

						<div className='py-3 bg-text-color px-5 rounded-md mb-2'>
							<p>{session?.user.nombre} ({session?.user.codigo})</p>
						</div>
					</div>
				</div>



			</div>
		</div>
	);
}
