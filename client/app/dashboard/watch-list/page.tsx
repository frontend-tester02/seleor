import { getFavorites } from '@/actions/user.action'
import WatchListCard from '@/components/cards/watch-list.card'
import Filter from '@/components/shared/filter'
import Pagination from '@/components/shared/pagination'
import { Separator } from '@/components/ui/separator'
import { SearchParams } from '@/types'
import React, { FC } from 'react'

interface Props {
	searchParams: SearchParams
}

const Page: FC<Props> = async props => {
	const searchParams = await props.searchParams

	const res = await getFavorites({
		searchQuery: `${searchParams.q || ''}`,
		filter: `${searchParams.filter || ''}`,
		category: `${searchParams.category || ''}`,
		page: `${searchParams.page || '1'}`,
	})

	const products = res?.data?.products
	const isNext = res?.data?.isNext || false
	return (
		<>
			<h1 className='font-xl font-bold'>Watch list</h1>

			<Separator className='my-4' />

			<Filter showCategory />

			<div className='grid grid-cols-1 md:grid-cols-2 gap-4 mt-3'>
				{products && products.length === 0 && (
					<div className='col-span-2 text-center mt-3'>No products found</div>
				)}

				{products &&
					products.map(product => (
						<WatchListCard key={product._id} product={product} />
					))}
			</div>

			<Pagination
				isNext={isNext}
				pageNumber={searchParams?.page ? +searchParams.page : 1}
			/>
		</>
	)
}

export default Page
