import Filter from '@/components/shared/filter'
import { Separator } from '@/components/ui/separator'
import {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table'
import OrdersActions from '../_components/orders-actions'

const Page = () => {
	return (
		<>
			<div className='flex justify-between items-center w-full'>
				<h1 className='text-xl font-bold'>Orders</h1>
				<Filter />
			</div>

			<Separator className='my-0.5' />

			<Table>
				<TableCaption>A list of your recent orders.</TableCaption>
				<TableHeader>
					<TableRow>
						<TableHead>Product</TableHead>
						<TableHead>Customer</TableHead>
						<TableHead>Price</TableHead>
						<TableHead>Status</TableHead>
						<TableHead>Created at</TableHead>
						<TableHead className='text-right'>Actions</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					<TableRow>
						<TableCell>Product 1</TableCell>
						<TableCell>info@shoky.dev</TableCell>
						<TableCell>$100</TableCell>
						<TableCell>Pending</TableCell>
						<TableCell>09/04/2025</TableCell>
						<TableCell className='text-right'>
							<OrdersActions />
						</TableCell>
					</TableRow>
				</TableBody>
			</Table>
		</>
	)
}

export default Page
