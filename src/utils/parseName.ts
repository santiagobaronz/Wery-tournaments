export const parseName = (name: string) => {
	const nombreCompleto = name;
	const palabras = nombreCompleto.split(" ");

	if (palabras.length >= 2) {
		const primerNombre = palabras[0];
		const segundoNombre = palabras[1];
		return(primerNombre + " " + segundoNombre);
	} else {
		return(palabras[0]);
	}
}