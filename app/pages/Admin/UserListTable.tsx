
const UserListTable = () => {
	return (
		<>
			<p className='text-lg font-semibold text-center py-2'>User List</p>

			<table className='w-full'>
				<thead>
					<tr>
						<th>SL</th>
						<th className='text-left py-2'>User Name</th>
						<th className='text-left'>Email</th>
						<th>Action</th>
					</tr>
				</thead>
				<tbody>
					{users?.map((item) => (
						<tr key={item?.id} className='border border-gray-600 border-x-0'>
							<td className='text-center py-2'>{item?.id}</td>
							<td> {item?.name} </td>
							<td>{item?.email}</td>
							<td className='text-center'>actions</td>
						</tr>
					))}
				</tbody>
			</table>
		</>
	)
}

export default UserListTable

const users = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item) => ({
	id: item,
	name: `User ${item}`,
	email: `${item}@gmail.com`,
}))
