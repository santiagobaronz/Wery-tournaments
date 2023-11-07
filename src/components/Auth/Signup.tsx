import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";

interface Materia {
	id: number;
	nombre_materia: string;
	categoria_id: number;
}

export default function Signup() {

	const [errors, setErrors] = useState<string[]>([]);
	const [codigo, setCodigo] = useState<string>("");
	const [nombre, setNombre] = useState<string>("");
	const [clave, setClave] = useState<string>("");
	const [carrera, setCarrera] = useState<string>("");
	const [materias, setMaterias] = useState<Materia[]>([]);
	const [materia, setMateria] = useState("");

	const router = useRouter();

	useEffect(() => {
		fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/materias`)
			.then((response) => response.json())
			.then((data) => {
				setMaterias(data);
			})
			.catch((error) => {
				console.error("Error al obtener las materias:", error);
			});
	}, []);


	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		setErrors([]);

		const res = await fetch(
			`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/signup`,
			{
				method: "POST",
				body: JSON.stringify({
					codigo: codigo,
					clave: clave,
					nombre: nombre,
					carrera: carrera,
					materia_id: materia,
				}),
				headers: { "Content-Type": "application/json" },
			}
		);

		const responseAPI = await res.json();

		if (!res.ok) {
			setErrors(responseAPI.message);
			return;
		}

		const responseNextAuth = await signIn("credentials", {
			codigo: codigo,
			clave: clave,
			redirect: false,
		});

		if (responseNextAuth?.error) {
			setErrors(responseNextAuth.error.split(","));
			return;
		}

		router.push("/dashboard");
	};

	return (
		<div>
			<form onSubmit={handleSubmit}>

				<label htmlFor="codigo" className='text-white'>Codigo estudiantil</label>

				<input type="text" placeholder=""
					name="codigo" className="w-full bg-text-color py-3 px-4 rounded-sm mt-2 mb-6"
					value={codigo} onChange={(event) => setCodigo(event.target.value)}
				/>

				<label htmlFor="nombre" className='text-white'>Nombre Completo</label>

				<input type="text" placeholder=""
					name="nombre" className="w-full bg-text-color py-3 px-4 rounded-sm mt-2 mb-6"
					value={nombre} onChange={(event) => setNombre(event.target.value)}
				/>
				<label htmlFor="clave" className='text-white'>Clave</label>

				<input type="password" placeholder=""
					name="clave" className="w-full bg-text-color py-3 px-4 rounded-sm mt-2 mb-6"
					value={clave} onChange={(event) => setClave(event.target.value)}
				/>

				<label htmlFor="Carrera" className='text-white'>Carrera</label>

				<input type="text" placeholder=""
					name="carrera" className="w-full bg-text-color py-3 px-4 rounded-sm mt-2 mb-6"
					value={carrera} onChange={(event) => setCarrera(event.target.value)}
				/>
				
				<label htmlFor="" className='text-white'>Materia más alta cursada</label>

				<select
					name="materia"
					className="w-full bg-text-color py-3 px-4 rounded-sm mt-2 mb-6"
					value={materia}
					onChange={(event) => setMateria(event.target.value)}
				>
					<option value="">Selecciona una materia</option>
					{materias.map((materia) => (
						<option key={materia.id} value={materia.id}>
							{materia.nombre_materia}
						</option>
					))}
				</select>


				<button type="submit" className={`w-full bg-green py-4 mb-5 rounded-sm text-white`}>
					Registrarme ahora
				</button>
			</form>

			{errors.length > 0 && (
				<div className="alert alert-danger mt-2">
					<ul className="mb-0">
						{errors.map((error) => (
							<li key={error}>{error}</li>
						))}
					</ul>
				</div>
			)}
		</div>
	);
}
