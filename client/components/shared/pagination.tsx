'use client'

import React, { FC } from 'react'
import { Button } from '../ui/button'
import { useRouter, useSearchParams } from 'next/navigation'
import { formUrlQuery } from '@/lib/utils'

interface Props {
	pageNumber: number
	isNext: boolean
}

const Pagination: FC<Props> = ({ pageNumber, isNext }) => {
	const router = useRouter()
	const searchParams = useSearchParams()

	const onNavigation = (direcation: 'prev' | 'next') => {
		const nextPageNumber =
			direcation === 'prev' ? pageNumber - 1 : pageNumber + 1

		const newURL = formUrlQuery({
			key: 'page',
			params: searchParams.toString(),
			value: nextPageNumber.toString(),
		})
		router.push(newURL)
	}

	if (!isNext && pageNumber === 1) return null
	return (
		<div className='flex w-full items-center justify-center gap-2 mt-4'>
			<Button
				size={'sm'}
				onClick={() => onNavigation('prev')}
				disabled={pageNumber === 1}
			>
				Prev
			</Button>
			<p>1</p>
			<Button
				size={'sm'}
				onClick={() => onNavigation('next')}
				disabled={!isNext}
			>
				Next
			</Button>
		</div>
	)
}

export default Pagination
