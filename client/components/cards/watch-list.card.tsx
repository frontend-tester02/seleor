'use client'

import { IProduct } from '@/types'
import Image from 'next/image'
import { FC } from 'react'
import { Button } from '../ui/button'
import { Heart } from 'lucide-react'
import NoSSR from 'react-no-ssr'
import { formatPrice } from '@/lib/utils'
import useAction from '@/hooks/use-action'
import { toast } from 'sonner'
import { deleteFavorite } from '@/actions/user.action'

interface Props {
	product: Partial<IProduct>
}

const WatchListCard: FC<Props> = ({ product }) => {
	const { isLoading, setIsLoading, onError } = useAction()

	async function onDelete() {
		setIsLoading(true)
		const res = await deleteFavorite({ id: product._id! })
		if (res?.serverError || res?.validationErrors || !res?.data) {
			return onError('Something went wrong')
		}

		if (res.data.failure) {
			return onError(res.data.failure)
		}

		if (res.data.status === 200) {
			toast('Product removed from watchlist')
			setIsLoading(false)
		}
	}
	return (
		<div className='border relative flex flex-col'>
			<div className='bg-secondary relative'>
				<Image
					src={product.image!}
					alt={product.title!}
					width={200}
					height={200}
					className='mx-auto'
				/>

				<div className='absolute right-0 top-0 z-50 flex items-center'>
					<Button size={'icon'} disabled={isLoading} onClick={onDelete}>
						<Heart className='text-red-500 fill-red-500' />
					</Button>
				</div>
			</div>

			<div className='p-2'>
				<div className='flex justify-between items-center text-sm'>
					<h1 className='font-bold'>{product.title}</h1>
					<NoSSR>
						<p className='font-medium'>{formatPrice(+product.price!)}</p>
					</NoSSR>
				</div>
				<p className='text-sm text-muted-foreground line-clamp-5'>
					{product.category}
				</p>
			</div>
		</div>
	)
}

export default WatchListCard
