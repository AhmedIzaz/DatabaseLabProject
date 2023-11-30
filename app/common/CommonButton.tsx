import React, { ButtonHTMLAttributes } from 'react'

type TCommonButton = {
	title: string
	type?: 'submit' | 'reset' | 'button' | undefined
	fullWidth?: boolean
	disabled?: boolean
	onClick?: () => void
}
const CommonButton = ({ title, type, fullWidth, disabled=false, onClick }: TCommonButton) => {
	return (
		<button
			className={` bg-blue-600 text-white my-2 py-2 px-3 rounded-md ${
				fullWidth ? 'w-full' : ''
			}`}
			disabled={disabled}
			type={type || 'button'}
			onClick={onClick}
		>
			{title}
		</button>
	)
}

export default CommonButton
