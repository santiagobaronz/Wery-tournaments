'use client'

import Authentication from "@/src/components/Auth/Authentication";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function page() {

	const { data: session, status } = useSession();
	const router = useRouter();

	useEffect(() => {
		if(status == 'authenticated'){
			router.push('/dashboard')
		}
	}, [status])
	
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
