import { HTMLInputTypeAttribute } from 'react'

type TCommonInput = {
	label?: string
	type?: HTMLInputTypeAttribute
	value?: string
	onChange: (value: string) => void
}

const CommonInput = ({ label, type, value, onChange }: TCommonInput) => {
	return (
		<div className='w-full py-1'>
			{label && <label className='block text-sky-950 mb-1'>{label}</label>}
			<input
				className='w-full border border-blue-500 py-1 px-2 text-blue-950 rounded-md'
				type={type || 'text'}
				value={value}
				onChange={(e) => onChange(e.target.value)}
			/>
		</div>
	)
}

export default CommonInput
