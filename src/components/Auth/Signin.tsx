import React from 'react'
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Signin() {
	const [error, setError] = useState<string>('');
	const [codigo, setCodigo] = useState<string>("20212020034");
	const [clave, setClave] = useState<string>("sofi");
	const router = useRouter();

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		const responseNextAuth = await signIn("credentials", {
			codigo: codigo,
			clave: clave,
			redirect: false,
		});

		console.log(responseNextAuth)

		if (responseNextAuth?.error) {
			setError('Credenciales incorrectas');
			return;
		}

		router.push("/dashboard");
	};

	return (
		<div>
			<form onSubmit={handleSubmit}>
				<label htmlFor="codigo" className='text-white'>Codigo estudiantil</label>
				<input type="number"
					name="codigo" className="w-full bg-text-color py-3 px-4 rounded-sm mt-2 mb-6"
					value={codigo} onChange={(event) => setCodigo(event.target.value)}
				/>
				<label htmlFor="clave" className='text-white'>Clave de acceso</label>
				<input
					type="password"
					name="clave" className="w-full bg-text-color py-3 px-4 rounded-sm mt-2 mb-6"
					value={clave} onChange={(event) => setClave(event.target.value)}
				/>
				<button type="submit" className={`w-full bg-green py-4 ${error !== '' ? 'mb-0' : 'mb-5'} rounded-sm text-white`}>
					Iniciar sesión
				</button>
			</form>

			{error !== '' ? (
				<div className='my-5'>
					<p className='bg-red-error py-2 px-4 text-sm rounded-sm'>{error}</p>
				</div>
			) : null}


		</div>
	);
}
