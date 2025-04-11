import { ChildPops } from '@/types'
import React, { FC } from 'react'
import Sidebar from './_components/sidebar'

const Layout: FC<ChildPops> = ({ children }) => {
	return (
		<div className='grid grid-cols-3 gap-4'>
			<div className='col-span-1'>
				<Sidebar />
			</div>
			<div className='col-span-2'>{children}</div>
		</div>
	)
}

export default Layout
