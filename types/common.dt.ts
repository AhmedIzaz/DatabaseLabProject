type TActionType = 'Create' | 'Update' | 'Delete'
type TUserInformation = {
	id?: number
	username?: string
	email: string
	password?: string
	type_id?: number
}
type TPackage = { id?: number; package_name: string }
type TDeleteButton = {
	onClick?: () => void
	className?: string
}
type TEditButton = {
	onClick?: () => void
	className?: string
}
