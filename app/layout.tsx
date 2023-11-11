import type { Metadata } from 'next'
import { Poppins, Nunito_Sans } from 'next/font/google'
import './../src/styles/globals.css'
import Authentication from '@/src/components/Auth/Authentication'
import SessionAuthProvider from '@/src/context/SessionAuthProvider'

const pageFont = Nunito_Sans({
	weight: ['200', '300', '400', '500', '600', '700', '800', '900'],
	subsets: ['latin']
})


export const metadata: Metadata = {
	title: 'Wery - Tournaments',
	description: 'Torneos de programación, encuentra tu equipo',
}

export default function RootLayout({ children, }: { children: React.ReactNode }) {
	return (
		<html lang="es">
			<body className={`${pageFont.className} bg-main-bg `}>
				<SessionAuthProvider>
					{children}
				</SessionAuthProvider>
			</body>
		</html>
	)
}
