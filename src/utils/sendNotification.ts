export const sendNotification = async (userId: number, titulo: string, mensaje: string, accion: string, enlace: string, prioridad: string) => {

	const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/notificaciones/`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			userId: userId,
			titulo: titulo,
			mensaje: mensaje,
			accion: accion,
			enlace: enlace,
			prioridad: prioridad
		}),
	});

	if (response.ok) {
		return true;
	};
}