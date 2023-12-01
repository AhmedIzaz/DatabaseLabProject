import { deleteUser, getUserList } from '@/app/action'
import CommonButton from '@/app/common/CommonButton'
import CommonModal from '@/app/common/CommonModal'
import DeleteButton from '@/app/common/DeleteButton'
import { FormEvent, useEffect, useState } from 'react'
import { toast } from 'react-toastify'

const UserListTable = () => {
	const [userList, setUserList] = useState<TUserInformation[]>()
	const [userFormValue, setUserFormValue] = useState<TUserInformation>({
		id: undefined,
		email: '',
	})
	const [formType, setFormType] = useState<TActionType>('Create')
	const [isModalOpen, setIsModalOpen] = useState<boolean>(false)

	// on field change
	const onFieldChange = (field: string, value?: string) => {
		setUserFormValue((prev) => ({ ...prev, [field]: value }))
	}
	const handleUserAction = (row: TUserInformation, type: TActionType) => {
		const { id, email } = row
		setFormType(type)
		setUserFormValue({ id, email })
		setIsModalOpen(true)
	}

	useEffect(() => {
		setUsers()
	}, [])
	const setUsers = async () => {
		const { status, message, userList } = await getUserList()
		if (status !== 200) return toast.error(message)
		if (userList) setUserList(userList)
	}

	const handleFormSubmit = async (e: FormEvent) => {
		e.preventDefault()
		if (formType === 'Delete') {
			handleUserDelete()
			return
		}
	}

	// on package delete
	const handleUserDelete = async () => {
		if (userFormValue?.id) {
			const deleteResponse = await deleteUser(userFormValue?.id)
			if (deleteResponse.status !== 200) return toast.error(deleteResponse.message)
			toast.success(deleteResponse.message)
			resetToDefault()
			setUsers()
		}
	}
	const resetToDefault = () => {
		setIsModalOpen(false)
		setFormType('Create')
		onFieldChange('email', '')
		onFieldChange('id', undefined)
	}
	return (
		<>
			<p className='text-lg font-semibold text-center py-2'>User List</p>
			{userList && userList?.length >= 1 ? (
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
						{userList?.map((item, index) => (
							<tr key={item?.id} className='border border-gray-600 border-x-0'>
								<td className='text-center py-2'>{index + 1}</td>
								<td> {item?.username} </td>
								<td>{item?.email}</td>
								<td className='text-center'>
									<div className='flex justify-center place-items-center gap-2'>
										<DeleteButton
											onClick={() => handleUserAction(item, 'Delete')}
										/>
									</div>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			) : (
				<p className='text-md font-medium text-neutral-500 text-center'>There is no users</p>
			)}
			<CommonModal
				title={formType + ' User'}
				isOpen={isModalOpen}
				onClose={() => {
					resetToDefault()
				}}
			>
				<form onSubmit={handleFormSubmit}>
					{formType !== 'Delete' ? (
						<></>
					) : (
						<div className='flex justify-center place-items-center gap-3'>
							<CommonButton title='Yes' type='submit' isPrimary />
							<CommonButton title='No' type='button' onClick={resetToDefault} isDefault/>
						</div>
					)}
				</form>
			</CommonModal>
		</>
	)
}

export default UserListTable
