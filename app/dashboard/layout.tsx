'use client'

import Link from "next/link";
import { useEffect, useState } from "react";
import { BsArrowBarLeft, BsFillChatLeftDotsFill, BsLightningChargeFill, BsPaletteFill, BsPeopleFill, BsPersonFill, BsStarFill } from "react-icons/bs";
import { signOut, useSession } from "next-auth/react";
import { IoMdSettings } from "react-icons/io";
import { useRouter } from "next/navigation";
import Notifications from "./components/Notifications";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {

	const { data: session, status } = useSession();
	const [name, setName] = useState("")
	const [notificaciones, setNotificaciones] = useState();

	useEffect(() => {
		const obtenerNotificaciones = async () => {
			try {
				const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/notificaciones/total/${session?.user.usuario_id}`);
				if (response.ok) {
					const data = await response.json();
					setNotificaciones(data);
				} else {
					console.error('Error al obtener las notificaciones.');
				}
			} catch (error) {
				console.error('Error al realizar la solicitud:', error);
			}
		};

		obtenerNotificaciones();
	}, [status]);

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
		<div>
			<button data-drawer-target="cta-button-sidebar" data-drawer-toggle="cta-button-sidebar" aria-controls="cta-button-sidebar" type="button" className="inline-flex items-center p-2 mt-2 ml-3 text-sm text-white rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
				<span className="sr-only">Abrir menú</span>
				<svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
					<path clipRule="evenodd" fillRule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
				</svg>
			</button>

			<aside id="cta-button-sidebar" className="fixed bg-bg-highlighted top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full md:translate-x-0" aria-label="Sidebar">
				<div className="h-full flex sidebar-wery flex-col justify-between px-4 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
					<div>
						<img src="https://i.imgur.com/9vX0Eof.png" alt="Logo" className="w-5/6 mb-4 mt-2" />
						<hr className="mb-5 text-white opacity-5 w-5/6 m-auto" />
						<ul className="space-y-2 font-medium">
							<li>
								<Link href={'/dashboard'} className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
									<BsPaletteFill></BsPaletteFill>
									<span className="ml-3">Dashboard</span>
								</Link>
							</li>
							<li>
								<Link href={'/dashboard/torneos'} className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
									<BsStarFill></BsStarFill>
									<span className="flex-1 ml-3 whitespace-nowrap">Torneos</span>
								</Link>
							</li>
							<li>
								<Link href={'/dashboard/equipos'} className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
									<BsLightningChargeFill></BsLightningChargeFill>
									<span className="flex-1 ml-3 whitespace-nowrap">Equipos</span>
								</Link>
							</li>
							{/*<li>
								<a href="#" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
									<BsFillChatLeftDotsFill></BsFillChatLeftDotsFill>
									<span className="flex-1 ml-3 whitespace-nowrap items-center">Notificaciones</span>
									<div className="bg-pink text-[12px] text-white font-semibold rounded-full text-sm w-5 h-5 text-center flex items-center justify-center">
										{notificaciones}
									</div>
								</a>
							</li>
							<li>
								<a href="#" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
									<BsPeopleFill></BsPeopleFill>
									<span className="flex-1 ml-3 whitespace-nowrap">Mi perfil</span>
								</a>
							</li>
							*/}
							{session?.user.rol === "ADM" && (
								<li>
									<a href="/dashboard/admin" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
										<IoMdSettings></IoMdSettings>
										<span className="flex-1 ml-3 whitespace-nowrap">Administración</span>
									</a>
								</li>
							)}

						</ul>

						<hr className="mt-5 text-white opacity-5 w-5/6 m-auto" />

						<div className="p-1">
							<Notifications></Notifications>
						</div>
					</div>

					<div className="px-1">
						<button className="flex w-full text-left items-center space-x-4 mt-4 p-3 bg-[#383E4B] rounded-md">
							<div className="w-10 h-10 rounded-full flex justify-center items-center bg-[#BFE9FF]">
								<p className="text-[#2e5a83] font-bold text-lg">
									<BsPersonFill></BsPersonFill>
								</p>
							</div>
							<div className="font-medium dark:text-white">
								<div>{name}</div>
								<div className="text-xs text-gray-500 dark:text-gray-400">{session?.user.codigo}</div>
							</div>
						</button>

						<button className="bg-[#383E4B] w-full flex items-center p-4 gap-x-3 text-white rounded-md mt-3" onClick={() => signOut()}>
							<BsArrowBarLeft></BsArrowBarLeft>
							<p>Cerrar sesión</p>
						</button>
					</div>
				</div>
			</aside>

			<div className="p-12 md:ml-64">
				{children}
			</div>
		</div>
	);
}