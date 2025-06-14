'use client'
import { login } from '@/actions/auth.action'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { loginSchema } from '@/lib/validation'
import { zodResolver } from '@hookform/resolvers/zod'
import { Loader } from 'lucide-react'
import { signIn } from 'next-auth/react'
import Link from 'next/link'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

function SignInPage() {
	const [isLoading, setIsLoading] = useState(false)
	const form = useForm<z.infer<typeof loginSchema>>({
		resolver: zodResolver(loginSchema),
		defaultValues: {
			email: '',
			password: '',
		},
	})

	function onError(message: string) {
		setIsLoading(false)
		toast(message)
	}

	async function onSubmit(values: z.infer<typeof loginSchema>) {
		setIsLoading(true)
		const res = await login(values)
		if (res?.serverError || res?.validationErrors || !res?.data) {
			return onError('Something went wrong')
		}

		if (res.data.failure) {
			return onError(res.data.failure)
		}

		if (res.data.user) {
			toast('Logged in successfully')
			signIn('credentials', { userId: res.data.user._id, callbackUrl: '/' })
		}
	}
	return (
		<Card className='w-1/2 p-4'>
			<h2 className='text-xl font-bold'>Sign In</h2>
			<p className='text-sm text-muted-foreground'>
				Welcome back! Please sign in to your account
			</p>
			<Separator />

			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className='space-y-2'>
					<FormField
						control={form.control}
						name='email'
						render={({ field }) => (
							<FormItem className='space-y-0'>
								<Label>Email</Label>
								<FormControl>
									<Input
										placeholder='example@email.com'
										disabled={isLoading}
										{...field}
									/>
								</FormControl>

								<FormMessage className='text-xs text-red-500' />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name='password'
						render={({ field }) => (
							<FormItem className='space-y-0'>
								<Label>Password</Label>
								<FormControl>
									<Input
										placeholder='****'
										type='password'
										disabled={isLoading}
										{...field}
									/>
								</FormControl>

								<FormMessage className='text-xs text-red-500' />
							</FormItem>
						)}
					/>
					<Button type='submit' disabled={isLoading}>
						Submit {isLoading && <Loader className='animate-spin' />}
					</Button>
				</form>
			</Form>

			<div className='text-sm text-muted-foreground'>
				Don&apos;t have an account?{' '}
				<Button asChild variant={'link'} className='p-0'>
					<Link href={'/sign-up'}>Sign up</Link>
				</Button>
			</div>
		</Card>
	)
}

export default SignInPage
