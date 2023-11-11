export const getDate = (date: Date, type: string) => {
	const abbreviatedDays: { [key: number]: string } = {
		0: "Domingo", 1: "Lunes", 2: "Martes", 3: "Miércoles",
		4: "Jueves", 5: "Viernes", 6: "Sábado"
	};

	const months: { [key: number]: string } = {
		0: "enero", 1: "febrero", 2: "marzo", 3: "abril",
		4: "mayo", 5: "junio", 6: "julio", 7: "agosto",
		8: "septiembre", 9: "octubre", 10: "noviembre", 11: "diciembre"
	};

	const abbreviatedDayOfWeek: string = abbreviatedDays[date.getDay()];
	const month: string = months[date.getMonth()];
	const dayOfMonth: number = date.getDate();
	const year: number = date.getFullYear();

	switch (type) {
		case "DMY": {
			return `${dayOfMonth} de ${month} de ${year}`;
		}
		case "DDMY": {
			return `${abbreviatedDayOfWeek}, ${dayOfMonth} de ${month} de ${year}`;
		}
	}

};