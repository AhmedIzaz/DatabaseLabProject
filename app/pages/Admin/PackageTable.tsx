'use client'
import { FormEvent, useEffect, useState } from 'react'
import CommonButton from '@/app/common/CommonButton'
import CommonModal from '@/app/common/CommonModal'
import CommonInput from '@/app/common/CommonInput'
import { toast } from 'react-toastify'
import { createAndUpdatePackage, deletePackage, getPackages } from '@/app/action'
import DeleteButton from '@/app/common/DeleteButton'
import EditButton from '@/app/common/EditButton'

const PackageTable = () => {
	const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
	const [packageFormValue, setPackageFormValue] = useState<TPackage>({
		id: undefined,
		package_name: '',
	})
	const [formType, setFormType] = useState<TActionType>('Create')
	const [packageList, setPackageList] = useState<TPackage[]>()
	// on field change
	const onFieldChange = (field: string, value?: string) => {
		setPackageFormValue((prev) => ({ ...prev, [field]: value }))
	}
	// on form submit
	const handleFormSubmit = async (e: FormEvent) => {
		e.preventDefault()
		if (formType === 'Delete') {
			handlePackageDelete()
			return
		}
		const { package_name } = packageFormValue
		if (package_name?.length <= 2) return toast.warn('Please give a valid package name')
		const response = await createAndUpdatePackage(packageFormValue)
		if (response?.status !== 200) return toast.error(response.message)
		toast.success(response.message)
		resetToDefault()
		setPackages()
	}

	useEffect(() => {
		setPackages()
	}, [])

	// on edit click
	const handlePackageAction = (row: TPackage, type: TActionType) => {
		const { id, package_name } = row
		setFormType(type)
		setPackageFormValue({ id, package_name })
		setIsModalOpen(true)
	}
	// on package delete
	const handlePackageDelete = async () => {
		if (packageFormValue?.id) {
			const deleteResponse = await deletePackage(packageFormValue?.id)
			if (deleteResponse.status !== 200) return toast.error(deleteResponse.message)
			toast.success(deleteResponse.message)
			resetToDefault()
			setPackages()
		}
	}

	const setPackages = async () => {
		const packageResponse = await getPackages()
		if (packageResponse?.status !== 200) return toast.error(packageResponse.message)
		setPackageList(packageResponse?.packageList)
	}

	const resetToDefault = () => {
		setIsModalOpen(false)
		setFormType('Create')
		onFieldChange('package_name', '')
		onFieldChange('id', undefined)
	}
	return (
		<>
			<div className='flex justify-between place-items-center'>
				<p className='text-lg font-semibold text-center py-2'>Package List</p>
				<CommonButton
					isPrimary
					title='Create Packages'
					onClick={() => {
						setIsModalOpen(true)
					}}
				/>
			</div>
			{packageList && packageList?.length >= 1 ? (
				<table className='w-full'>
					<thead>
						<tr>
							<th className='py-3'>SL</th>
							<th className='text-left'>Package Name</th>
							<th>Action</th>
						</tr>
					</thead>
					<tbody>
						{packageList?.map((item, index) => (
							<tr key={item?.id} className='border border-gray-600 border-x-0'>
								<td className='text-center py-2'>{index + 1}</td>
								<td> {item?.package_name} </td>
								<td className='text-center'>
									<div className='flex justify-center place-items-center gap-2'>
										<EditButton
											onClick={() => handlePackageAction(item, 'Update')}
										/>
										<DeleteButton
											onClick={() => handlePackageAction(item, 'Delete')}
										/>
									</div>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			) : (
				<p className='text-md font-medium text-neutral-500 text-center'>
					There is no packages, create some first
				</p>
			)}
			<CommonModal
				title={formType + ' Package'}
				isOpen={isModalOpen}
				onClose={() => {
					resetToDefault()
				}}
			>
				<form onSubmit={handleFormSubmit}>
					{formType !== 'Delete' ? (
						<>
							<CommonInput
								value={packageFormValue?.package_name}
								onChange={(v) => onFieldChange('package_name', v)}
								label='Package Name'
							/>
							<CommonButton title={formType} type='submit' fullWidth isPrimary />
						</>
					) : (
						<div className='flex justify-center place-items-center gap-3'>
							<CommonButton title='Yes' type='submit' isPrimary />
							<CommonButton
								title='No'
								type='button'
								onClick={resetToDefault}
								isDefault
							/>
						</div>
					)}
				</form>
			</CommonModal>
		</>
	)
}

export default PackageTable
