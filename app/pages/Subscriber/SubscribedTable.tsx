'use client'

const SubscribedTable = () => {
	return (
		<>
			<p className='text-lg font-semibold text-center py-2'>Subscribed Package List</p>
			<table className='w-full'>
				<thead>
					<tr>
						<th className='py-3'>SL</th>
						<th className='text-left'>Package Name</th>
						<th>Action</th>
					</tr>
				</thead>
				<tbody>
					{packages?.map((item) => (
						<tr key={item?.id} className='border border-gray-600 border-x-0'>
							<td className='text-center py-2'>{item?.id}</td>
							<td> {item?.name} </td>
							<td className='text-center'>actions</td>
						</tr>
					))}
				</tbody>
			</table>
		</>
	)
}

export default SubscribedTable

const packages = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item) => ({
	id: item,
	name: `Package ${item}`,
}))
