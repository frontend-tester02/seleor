'use client'

import { Button } from '@/components/ui/button'
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select'
import { Separator } from '@/components/ui/separator'
import {
	Sheet,
	SheetContent,
	SheetDescription,
	SheetHeader,
	SheetTitle,
} from '@/components/ui/sheet'
import { Textarea } from '@/components/ui/textarea'
import { useProduct } from '@/hooks/use-product'
import { categories } from '@/lib/constants'
import { formatPrice } from '@/lib/utils'
import { productSchema } from '@/lib/validation'
import { zodResolver } from '@hookform/resolvers/zod'
import { PlusCircle } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const AddProduct = () => {
	const { open, setOpen } = useProduct()
	const form = useForm<z.infer<typeof productSchema>>({
		resolver: zodResolver(productSchema),
		defaultValues: {
			title: '',
			price: '',
			description: '',
			category: '',
			image: '',
			imageKey: '',
		},
	})

	function onSubmit(values: z.infer<typeof productSchema>) {
		console.log(values)
	}

	function onOpen() {
		setOpen(true)
	}

	return (
		<>
			<Button size={'sm'} onClick={onOpen}>
				<span>Add product</span>
				<PlusCircle />
			</Button>
			<Sheet open={open} onOpenChange={setOpen}>
				<SheetContent>
					<SheetHeader>
						<SheetTitle>Manage your product</SheetTitle>
						<SheetDescription>
							Field marked with * are required fields and must be filled
						</SheetDescription>
					</SheetHeader>

					<Separator />
					<div className='p-4'>
						<Form {...form}>
							<form
								onSubmit={form.handleSubmit(onSubmit)}
								className='space-y-2'
							>
								<FormField
									control={form.control}
									name='title'
									render={({ field }) => (
										<FormItem className='space-y-0'>
											<Label className='text-sm'>Title</Label>
											<FormControl>
												<Input
													placeholder='Write product name...'
													className='bg-secondary'
													{...field}
												/>
											</FormControl>

											<FormMessage className='text-xs text-red-500' />
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name='description'
									render={({ field }) => (
										<FormItem className='space-y-0'>
											<Label className='text-sm'>Description</Label>
											<FormControl>
												<Textarea
													placeholder='Write product description...'
													className='bg-secondary'
													{...field}
												/>
											</FormControl>

											<FormMessage className='text-xs text-red-500' />
										</FormItem>
									)}
								/>

								<FormField
									control={form.control}
									name='category'
									render={({ field }) => (
										<FormItem className='space-y-0'>
											<Label className='text-sm'>Category</Label>
											<Select
												onValueChange={field.onChange}
												defaultValue={field.value}
											>
												<FormControl>
													<SelectTrigger className='bg-secondary w-full'>
														<SelectValue placeholder='Select category' />
													</SelectTrigger>
												</FormControl>
												<SelectContent>
													{categories.map(category => (
														<SelectItem key={category} value={category}>
															{category}
														</SelectItem>
													))}
												</SelectContent>
											</Select>
											<FormMessage className='text-xs text-red-500' />
										</FormItem>
									)}
								/>

								<FormField
									control={form.control}
									name='price'
									render={({ field }) => (
										<FormItem className='space-y-0'>
											<Label className='text-sm'>
												{!form.watch('price')
													? 'Price'
													: `Price ${formatPrice(Number(form.watch('price')))}`}
											</Label>
											<FormControl>
												<Input
													className='bg-secondary'
													placeholder='100.000 UZS'
													type='number'
													{...field}
												/>
											</FormControl>

											<FormMessage className='text-xs text-red-500' />
										</FormItem>
									)}
								/>

								<Button type='submit' className='w-full'>
									Submit
								</Button>
							</form>
						</Form>
					</div>
				</SheetContent>
			</Sheet>
		</>
	)
}

export default AddProduct
