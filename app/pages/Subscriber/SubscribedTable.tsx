'use client'

import { getSubscribedOrUnSubscribedPackages, subscribeOrUnSubscribe } from '@/app/action'
import CommonButton from '@/app/common/CommonButton'
import CommonModal from '@/app/common/CommonModal'
import { getUserCookie } from '@/utils/authOperations'
import { FormEvent, useEffect, useState } from 'react'
import { toast } from 'react-toastify'

const SubscribedTable = () => {
	const userInformation = getUserCookie()
	const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
	const [subscribedPackageList, setSubscribedPackageList] = useState<TPackage[]>()
	const [selectedPackage, setSelectedPackage] = useState<TPackage | null>(null)
	useEffect(() => {
		setSubscribedPackages()
	}, [])

	const setSubscribedPackages = async () => {
		if (userInformation?.id) {
			const packageResponse = await getSubscribedOrUnSubscribedPackages(
				userInformation?.id,
				'subscribed'
			)
			if (packageResponse?.status !== 200) return toast.error(packageResponse.message)
			setSubscribedPackageList(packageResponse?.packageList)
		}
	}

	const handleFormSubmit = async (e: FormEvent) => {
		e.preventDefault()
		if (userInformation?.id) {
			const { status, message } = await subscribeOrUnSubscribe(
				userInformation?.id,
				selectedPackage?.id,
				'unsubscribe'
			)
			if (status !== 200) return toast.error(message)
			toast.success(message)
			resetToDefault()
			setSubscribedPackages()
		}
	}
	// on unsubscribe click
	const handleUnSubscribeAction = (row: TPackage) => {
		setSelectedPackage(row)
		setIsModalOpen(true)
	}

	const resetToDefault = () => {
		setIsModalOpen(false)
		setSelectedPackage(null)
	}
	return (
		<>
			<p className='text-lg font-semibold text-center py-2'>Subscribed Package List</p>
			{subscribedPackageList && subscribedPackageList?.length >= 1 ? (
				<table className='w-full'>
					<thead>
						<tr>
							<th className='py-3'>SL</th>
							<th className='text-left'>Package Name</th>
							<th>Action</th>
						</tr>
					</thead>
					<tbody>
						{subscribedPackageList?.map((item, index) => (
							<tr key={item?.id} className='border border-gray-600 border-x-0'>
								<td className='text-center py-2'>{index + 1}</td>
								<td> {item?.package_name} </td>
								<td className='text-center'>
									<CommonButton
										isDanger
										title='Un-Subscribe'
										onClick={() => {
											handleUnSubscribeAction(item)
										}}
									/>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			) : (
				<p className='text-md font-medium text-neutral-500 text-center'>
					There is no subscribed packages
				</p>
			)}
			<CommonModal
				title={'Un-Subscribe Package'}
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

export default SubscribedTable
