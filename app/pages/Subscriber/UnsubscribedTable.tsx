'use client'

import { getSubscribedOrUnSubscribedPackages, subscribeOrUnSubscribe } from '@/app/action'
import CommonButton from '@/app/common/CommonButton'
import CommonModal from '@/app/common/CommonModal'
import { getUserCookie } from '@/utils/authOperations'
import { FormEvent, useEffect, useState } from 'react'
import { toast } from 'react-toastify'

const UnsubscribedTable = () => {
	const userInformation = getUserCookie()
	const [unSubscribedPackageList, setUnSubscribedPackageList] = useState<TPackage[]>()
	const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
	const [selectedPackage, setSelectedPackage] = useState<TPackage | null>(null)
	useEffect(() => {
		setUnSubscribedPackages()
	}, [])

	const setUnSubscribedPackages = async () => {
		if (userInformation?.id) {
			const packageResponse = await getSubscribedOrUnSubscribedPackages(
				userInformation?.id,
				'unsubscribed'
			)
			if (packageResponse?.status !== 200) return toast.error(packageResponse.message)
			setUnSubscribedPackageList(packageResponse?.packageList)
		}
	}
	const handleFormSubmit = async (e: FormEvent) => {
		e.preventDefault()
		if (userInformation?.id) {
			const { status, message } = await subscribeOrUnSubscribe(
				userInformation?.id,
				selectedPackage?.id,
				'subscribe'
			)
			if (status !== 200) return toast.error(message)
			toast.success(message)
			resetToDefault()
			setUnSubscribedPackages()
		}
	}
	// on subscribe click
	const handleSubscribeAction = (row: TPackage) => {
		setSelectedPackage(row)
		setIsModalOpen(true)
	}

	const resetToDefault = () => {
		setIsModalOpen(false)
		setSelectedPackage(null)
	}
	return (
		<>
			<p className='text-lg font-semibold text-center py-2'>Unsubscribed Package List</p>
			{unSubscribedPackageList && unSubscribedPackageList?.length >= 1 ? (
				<table className='w-full'>
					<thead>
						<tr>
							<th className='py-3'>SL</th>
							<th className='text-left'>Package Name</th>
							<th>Action</th>
						</tr>
					</thead>
					<tbody>
						{unSubscribedPackageList?.map((item, index) => (
							<tr key={item?.id} className='border border-gray-600 border-x-0'>
								<td className='text-center py-2'>{index + 1}</td>
								<td> {item?.package_name} </td>
								<td className='text-center '>
									<CommonButton
										isPrimary
										title='Subscribe'
										onClick={() => {
											handleSubscribeAction(item)
										}}
									/>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			) : (
				<p className='text-md font-medium text-neutral-500 text-center'>
					There is no un-subscribed packages
				</p>
			)}

			<CommonModal
				title={'Subscribe Package'}
				isOpen={isModalOpen}
				onClose={() => {
					resetToDefault()
				}}
			>
				<form onSubmit={handleFormSubmit}>
					<div className='flex justify-center place-items-center gap-3'>
						<CommonButton title='Yes' type='submit' isPrimary />
						<CommonButton title='No' type='button' onClick={resetToDefault} isDefault />
					</div>
				</form>
			</CommonModal>
		</>
	)
}

export default UnsubscribedTable
