import { getDate } from '@/src/utils/getDate'
import React from 'react'
import Tournaments from './components/Tournaments'

export default function page() {
	return (
		<div className='container'>
			<div className='flex justify-between text-white'>
				<h1 className='text-xl'>Torneos</h1>
				<p className='text-lg'>{getDate(new Date(), 'DDMY')}</p>
			</div>
			<Tournaments></Tournaments>
		</div>
	)
}
