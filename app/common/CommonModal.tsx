import { ReactNode } from 'react'

interface ModalProps {
	isOpen: boolean
	onClose: () => void
	children: ReactNode
	title: string
}
const CommonModal = ({ isOpen, onClose, children, title }: ModalProps) => {
	const handleClose = () => {
		onClose()
	}
	return (
		<>
			{isOpen && <div className='fixed inset-0 z-50 bg-black opacity-50'></div>}

			{isOpen && (
				<div className='fixed inset-0 z-50 flex items-center justify-center'>
					<div className='bg-white w-fit min-w-[300px] p-6 rounded shadow-lg'>
						<div className='flex justify-between place-items-center'>
							<p className='text-3xl'>{title}</p>
							<button
								onClick={handleClose}
								className='text-gray-500 hover:text-gray-700 focus:outline-none text-3xl'
							>
								&times;
							</button>
						</div>
						<div className='mt-4'>{children}</div>
					</div>
				</div>
			)}
		</>
	)
}

export default CommonModal
