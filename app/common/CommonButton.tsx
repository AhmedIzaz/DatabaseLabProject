
import classes from 'classnames'
type TCommonButton = {
	title: string
	type?: 'submit' | 'reset' | 'button' | undefined
	fullWidth?: boolean
	disabled?: boolean
	onClick?: () => void
	isPrimary?: boolean
	isDanger?: boolean
	isDefault?: boolean
}
const CommonButton = ({
	title,
	type,
	fullWidth,
	disabled = false,
	onClick,
	isPrimary,
	isDanger,
	isDefault,
}: TCommonButton) => {
	return (
		<button
			className={classes({
				'my-2 py-2 px-3 rounded-md ': true,
				'bg-slate-400': isDefault,
				'bg-blue-600 text-white': isPrimary,
				'bg-red-600 text-white': isDanger,
				'w-full': fullWidth,
			})}
			disabled={disabled}
			type={type || 'button'}
			onClick={onClick}
		>
			{title}
		</button>
	)
}

export default CommonButton
