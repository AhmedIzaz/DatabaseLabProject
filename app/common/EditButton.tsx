import Image from 'next/image'

const EditButton = ({ onClick, className }: TEditButton) => {
	return (
		<Image
			onClick={onClick}
			src='/editIcon.svg'
			className={`cursor-pointer ${className}`}
			alt='delete'
			width={15}
			height={15}
		/>
	)
}

export default EditButton
