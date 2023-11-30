'use client'
import CommonModal from '@/app/common/CommonModal'
import { useState } from 'react'

const SubscriberPage = () => {
	const [isOpen, setIsopen] = useState(false)
	return (
		<div>
			<button onClick={() => setIsopen(true)}>Open</button>
			<CommonModal title='Modal' isOpen={isOpen} onClose={() => setIsopen(false)}>
				Modal
			</CommonModal>
		</div>
	)
}

export default SubscriberPage
