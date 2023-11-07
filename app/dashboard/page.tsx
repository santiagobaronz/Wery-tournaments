'use client'

import React, { useEffect, useState } from 'react'

import { signIn, signOut, useSession } from "next-auth/react";

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
		<div>
			<h1 className='text-white text-xl'>Hola, {name}</h1>
			
			<div className='flex gap-x-10 mt-8'>
				<div className='w-4/6 bg-bg-highlighted'>

				</div>
				<div className='w-2/6 bg-bg-highlighted h-9'>
					
				</div>
			</div>


		</div>
	)
}
