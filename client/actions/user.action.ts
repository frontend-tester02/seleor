'use server'

import { UTApi } from 'uploadthing/server'
const utapi = new UTApi()

export const deleteFile = async (key: string) => {
	await utapi.deleteFiles(key)
}
