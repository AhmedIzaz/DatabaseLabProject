'use client'
import { useState } from 'react'
import CommonButton from '@/app/common/CommonButton'
import CommonModal from '@/app/common/CommonModal'

const PackageTable = () => {
	const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
	return (
		<>
			<div className='flex justify-between place-items-center'>
				<p className='text-lg font-semibold text-center py-2'>Package List</p>
				<CommonButton
					title='Create Packages'
					onClick={() => {
						setIsModalOpen(true)
					}}
				/>
			</div>
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
			<CommonModal title='Modal' isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
				Modal
			</CommonModal>
		</>
	)
}

export default PackageTable

const packages = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item) => ({
	id: item,
	name: `Package ${item}`,
}))
