'use client'

import Authentication from "@/src/components/Auth/Authentication";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function page() {

	const { data: session, status } = useSession();
	const router = useRouter();

	useEffect(() => {
		if (status == 'authenticated') {
			router.push('/dashboard')
		}
	}, [status])

	if (status == 'loading') {
		return (
			<div className="container min-h-screen p-20 relative mt-10">
				<div className="bg-bg-highlighted w-full flex h-full flex-col rounded-2xl min-h-[700px] justify-center items-center">
					<div role="status">
						<svg aria-hidden="true" className="w-8 h-8 text-gray-200 animate-spin dark:text-white fill-blue" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
							<path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
						</svg>
						<span className="sr-only">Loading...</span>
					</div>
					<p className="text-xl text-white mt-5 animate-pulse">Cargando sesiones recientes...</p>
				</div>
			</div>

		)
	} else {

	}

	if (status == 'unauthenticated') {
		return (
			<main>
				<div className="container justify-center items-center min-h-screen p-20 relative">
					<div className="flex bg-bg-highlighted w-full h-full rounded-2xl gap-x-10 shadow-2xl min-h-[700px]">
						<div className="w-1/2 min-h-[700px]">
							<img src="https://loopgk.com/wp-content/uploads/2021/02/lenguaje-min.jpg" alt="Imagen de torneo de programacion"
								className="h-full object-cover rounded-l-2xl shadow-lg brightness-50" />
						</div>
						<div className="w-1/2 p-16">
							<h1 className="font-medium text-white text-2xl text-left text-[22px]">Torneos de Programación: Donde el Código Encuentra su Camino</h1>
							<p className=" mt-6 text-text-color text-left text-[15px]">Para participar, necesitas una cuenta. Regístrate o inicia sesión para comenzar a competir y aprender. ¡Únete ahora y demuestra tus habilidades de codificación!</p>

							<div>
								<Authentication></Authentication>
							</div>
						</div>
					</div>
					<div className="mt-10 bg-bg-highlighted rounded-xl py-5 px-20 text-text-color w-fit m-auto">
						<p className="text-sm text-center">Desarrollado por Santiago Baron Zuleta, Laura Sofia Amado Gonzales y Wilder Steven Hernandez Manosalva</p>
					</div>
				</div>
			</main>
		)
	}
}
