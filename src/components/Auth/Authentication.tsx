'use client'

import React from 'react'
import { useState } from 'react';
import Signin from './Signin';
import Signup from './Signup';

export default function Authentication() {

	const [modeAuth, setModeAuth] = useState('signin')

	if (modeAuth == 'signin') {
		return (
			<div className='mt-10'>
				<Signin></Signin>
				<div className=' mt-5'>
					<button onClick={() => setModeAuth('signup')} className='w-fit block mb-2 text-white text-sm font-light text-left hover:underline'>¿No tienes cuenta? Regístrate</button>
					<button className='w-fit block text-left text-white text-sm font-light hover:underline'>Olvidé mi contraseña</button>
				</div>
			</div>
		)
	}


	if (modeAuth == 'signup') {
		return (
			<div className='mt-10'>
				<Signup></Signup>
				<div className='flex'>
					<button onClick={() => setModeAuth('signin')} className='w-fit block text-left text-white text-sm font-light hover:underline'>¿Ya estas registrado? Inicia sesión</button>
				</div>
			</div>
		)
	}

}
