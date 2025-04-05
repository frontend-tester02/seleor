import { ChildPops } from '@/types'
import React, { FC } from 'react'

const AuthLayout: FC<ChildPops> = ({ children }) => {
	return <section className='flex justify-center mt-44'>{children}</section>
}

export default AuthLayout
