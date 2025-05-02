import type { Metadata } from 'next'
import { Montserrat } from 'next/font/google'
import './globals.css'
import React, { FC } from 'react'
import { ChildPops } from '@/types'
import Navbar from '@/components/shared/navbar'
import SessionProvider from '@/components/providers/session.provider'
import { Toaster } from '@/components/ui/sonner'

const montserrat = Montserrat({
	weight: ['400', '500', '600', '700', '800'],
	subsets: ['latin'],
})
export const metadata: Metadata = {
	title: 'Seleor e-commerse',
	description: 'Seleor e-commerse build with Next.js ',
	icons: { icon: '/favicon.png' },
}

const RootLayout: FC<ChildPops> = ({ children }) => {
	return (
		<SessionProvider>
			<html lang='en'>
				<body className={`${montserrat.className} antialiased`}>
					<Navbar />
					<main className='container max-w-5xl mt-24 mx-auto'>{children}</main>
					<Toaster />
				</body>
			</html>
		</SessionProvider>
	)
}

export default RootLayout
