'use client'

import React from 'react'

export default function Header() {

	const sendData = async () => {
		const res = await fetch(
			`${process.env.NEXT_PUBLIC_BACKEND_URL}/signup`,
			{
				method: "POST",
				body: JSON.stringify({
					codigo: '20212020034',
					clave: 'sofi',
					nombre: 'Sofia',
					carrera: 'Sistemas',
					materia_id: 2,
				}),
				headers: { "Content-Type": "application/json" },
			}
		);
	}


  return (
	<div>
		<button onClick={sendData}>Enviar data</button>
	</div>
  )
}
