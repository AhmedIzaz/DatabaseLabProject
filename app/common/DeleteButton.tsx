import Image from 'next/image'

const DeleteButton = ({ onClick, className }: TDeleteButton) => {
	return (
		<Image
			onClick={onClick}
			src='/deleteIcon.svg'
			className={`cursor-pointer ${className}`}
			alt='delete'
			width={15}
			height={15}
		/>
	)
}

export default DeleteButton
