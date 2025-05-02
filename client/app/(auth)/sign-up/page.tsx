'use client'

import { register, sendOtp, verifyOtp } from '@/actions/auth.action'
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
import {
	InputOTP,
	InputOTPGroup,
	InputOTPSeparator,
	InputOTPSlot,
} from '@/components/ui/input-otp'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import useAction from '@/hooks/use-action'
import { otpSchema, registerSchema } from '@/lib/validation'
import { zodResolver } from '@hookform/resolvers/zod'
import { Loader } from 'lucide-react'
import { signIn } from 'next-auth/react'
import Link from 'next/link'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

function SignUpPage() {
	const [isResend, setIsResend] = useState(false)
	const [isVerifying, setIsVerifying] = useState(false)

	const { isLoading, setIsLoading, onError } = useAction()

	const form = useForm<z.infer<typeof registerSchema>>({
		resolver: zodResolver(registerSchema),
		defaultValues: {
			fullName: '',
			email: '',
			password: '',
		},
	})

	const otpForm = useForm<z.infer<typeof otpSchema>>({
		resolver: zodResolver(otpSchema),
		defaultValues: {
			otp: '',
		},
	})

	async function onSubmit(values: z.infer<typeof registerSchema>) {
		setIsLoading(true)
		const res = await sendOtp({ email: values.email })

		if (res?.serverError || res?.validationErrors || !res?.data) {
			return onError('Something went wrong')
		}

		if (res.data.failure) {
			return onError(res.data.failure)
		}

		if (res.data.status === 200) {
			toast('OTP sent successfully')
			setIsVerifying(true)
			setIsLoading(false)
			setIsResend(false)
		}
	}

	async function onVerify(values: z.infer<typeof otpSchema>) {
		setIsLoading(true)
		const res = await verifyOtp({
			otp: values.otp,
			email: form.getValues('email'),
		})
		if (res?.serverError || res?.validationErrors || !res?.data) {
			return onError('Something went wrong')
		}
		if (res.data.failure) {
			return onError(res.data.failure)
		}

		if (res.data.status === 301) {
			setIsResend(true)
			setIsLoading(false)
			toast('OTP was expired. Please resend OTP')
		}

		if (res.data.status === 200) {
			const response = await register(form.getValues())
			if (
				response?.serverError ||
				response?.validationErrors ||
				!response?.data
			) {
				return onError('Something went wrong')
			}
			if (response.data.failure) {
				return onError(response.data.failure)
			}

			if (response.data.user._id) {
				toast('User created successfully')
				signIn('credentials', {
					userId: response.data.user._id,
					callbackUrl: '/',
				})
			}
		}
	}
	return (
		<Card className='w-1/2 p-4'>
			<h2 className='text-xl font-bold'>Sign Up</h2>
			<p className='text-sm text-muted-foreground'>
				Welcome back! Please sign up to your account
			</p>
			<Separator />

			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className='space-y-2'>
					<FormField
						control={form.control}
						name='fullName'
						render={({ field }) => (
							<FormItem className='space-y-0'>
								<Label>Full Name</Label>
								<FormControl>
									<Input
										placeholder='Enter your name...'
										disabled={isLoading || isVerifying}
										{...field}
									/>
								</FormControl>

								<FormMessage className='text-xs text-red-500' />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name='email'
						render={({ field }) => (
							<FormItem className='space-y-0'>
								<Label>Email</Label>
								<FormControl>
									<Input
										placeholder='example@email.com'
										disabled={isLoading || isVerifying}
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
										disabled={isLoading || isVerifying}
										{...field}
									/>
								</FormControl>

								<FormMessage className='text-xs text-red-500' />
							</FormItem>
						)}
					/>
					{!isVerifying && (
						<Button type='submit' disabled={isLoading}>
							Submit {isLoading && <Loader className='animate-spin' />}
						</Button>
					)}
				</form>
			</Form>

			{isVerifying && (
				<Form {...otpForm}>
					<form
						onSubmit={otpForm.handleSubmit(onVerify)}
						className='w-2/3 space-y-2'
					>
						<FormField
							control={otpForm.control}
							name='otp'
							render={({ field }) => (
								<FormItem className='space-y-0 mt-2'>
									<Label>Enter OTP</Label>
									<FormControl>
										<InputOTP maxLength={6} {...field}>
											<InputOTPGroup>
												<InputOTPSlot index={0} />
												<InputOTPSlot index={1} />
												<InputOTPSlot index={2} />
											</InputOTPGroup>
											<InputOTPSeparator />
											<InputOTPGroup>
												<InputOTPSlot index={3} />
												<InputOTPSlot index={4} />
												<InputOTPSlot index={5} />
											</InputOTPGroup>
										</InputOTP>
									</FormControl>

									<FormMessage className='text-xs text-red-500' />
								</FormItem>
							)}
						/>
						<div className='flex items-center gap-1'>
							<Button type='submit' disabled={isLoading || isResend}>
								Verify {isLoading && <Loader className='animate-spin' />}
							</Button>
							{isResend && (
								<Button
									type='button'
									onClick={() => onSubmit(form.getValues())}
									disabled={isLoading}
								>
									Resend OTP {isLoading && <Loader className='animate-spin' />}
								</Button>
							)}
						</div>
					</form>
				</Form>
			)}
			<div className='text-sm text-muted-foreground'>
				Already have an account?{' '}
				<Button asChild variant={'link'} className='p-0'>
					<Link href={'/sign-in'}>Sign in</Link>
				</Button>
			</div>
		</Card>
	)
}

export default SignUpPage
