import React from 'react'
import { useState, useEffect } from 'react';
import { useSession } from "next-auth/react";
import { NotificationInterface } from '@/src/types/NotificationInterface';
import Link from 'next/link';

export default function Notifications() {

	const [notification, setNotification] = useState<NotificationInterface[]>([]);
	const { data: session, status } = useSession();

	useEffect(() => {
		const getNotification = async () => {
			try {
				const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/notificaciones/${session?.user.usuario_id}?prioridad=alta`);
				if (response.ok) {
					const data = await response.json();
					const userNotification = data.reverse()
					setNotification(userNotification);
				} else {
					console.error('Error al obtener las notificaciones.');
				}
			} catch (error) {
				console.error('Error al realizar la solicitud:', error);
			}
		};

		getNotification();
	}, [status]);

	const deleteNotification = async (id_notificacion: number, indexArray: number) => {
		fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/notificaciones/${id_notificacion}`, {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json',
			},
		})
			.then(response => {
				if (!response.ok) {
					throw new Error('No se pudo eliminar');
				}
				return response.json();
			})
			.then(data => {
				const newArray = notification.filter((_, index) => index !== indexArray);
				setNotification(newArray);
			})
			.catch(error => {
				console.error('Hubo un problema al conectar con el servidor:', error);
			});

	}

	return (
		<div>
			{notification.length > 0 && <h3 className="mt-5 text-white">Mis notificaciones</h3>}
			<ul>
				{notification.slice(0, 2).map((notificacion, index) => (
					<li key={notificacion.id}>
						<div id="dropdown-cta" className="p-4 mt-3 rounded-lg bg-[#383E4B]" role="alert">
							<div className="flex items-center mb-3">
								<h3 className="text-white opacity-90 bg-[#2563EB] px-2 py-1 rounded-md text-[14px]">{notificacion.titulo}</h3>
								<button
									type="button"
									onClick={() => deleteNotification(notificacion.id, index)}
									className="ml-auto -mx-1.5 -my-1.5 bg-blue-50 inline-flex justify-center items-center text-[#3B82F6] rounded-lg focus:ring-2 focus:ring-blue-400 p-1 hover:bg-blue-200 h-6 w-6 dark:bg-blue-900 dark:text-blue-400 dark:hover:bg-blue-800"
									data-dismiss-target="#dropdown-cta"
									aria-label="Close"
								>
									<span className="sr-only">Close</span>
									<svg className="w-2.5 h-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
										<path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
									</svg>
								</button>
							</div>
							<p className="mb-3 text-sm text-[#D1D5DB]">
								{notificacion.mensaje}
							</p>
							<Link className="text-sm text-[#3B82F6] font-medium" href={notificacion.enlace}>
								{notificacion.accion}
							</Link>
						</div>
					</li>
				))}
			</ul>
		</div>
	);
}
