import Teams from '@/app/dashboard/components/Teams'
import React from 'react'

interface DetailsProps {
	id_evento: number;
}

export default function Details(props: DetailsProps) {

	const id_evento = props.id_evento;

  return (
	<div className='mt-10'>
		<div className='flex gap-10'>
			<div className='bg-[#2A2D30] p-10 rounded-xl w-4/6'>
				<h3 className="text-white font-semibold text-lg">Equipos registrados en Wery</h3>
				<Teams columns={2} maxTeams={100} id_evento={id_evento} type={'event'}></Teams>
			</div>
			<div className='bg-[#2A2D30] p-10 rounded-xl w-2/6'>
				{id_evento}
			</div>
		</div>
	</div>	
  )
}
