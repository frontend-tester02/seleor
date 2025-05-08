'use server'

import { axiosClient } from '@/http/axios'
import { actionClient } from '@/lib/safe-action'
import { idSchema, searchParamsSchema } from '@/lib/validation'
import { ReturnActionType } from '@/types'

export const getProducts = actionClient
	.schema(searchParamsSchema)
	.action<ReturnActionType>(async ({ parsedInput }) => {
		const { data } = await axiosClient.get('/api/user/products', {
			params: parsedInput,
		})
		return JSON.parse(JSON.stringify(data))
	})

export const getProduct = actionClient
	.schema(idSchema)
	.action<ReturnActionType>(async ({ parsedInput }) => {
		const { data } = await axiosClient.get(
			`/api/user/product/${parsedInput.id}`
		)
		return JSON.parse(JSON.stringify(data))
	})
