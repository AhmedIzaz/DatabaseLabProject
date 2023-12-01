'use client'
import { useState } from 'react'
import UnsubscribedTable from './UnsubscribedTable'
import SubscribedTable from './SubscribedTable'

const SubscriberPage = () => {
	const [activeTab, setActiveTab] = useState<'subscribed' | 'unsubscribed'>('unsubscribed')
	return (
		<div className='py-2'>
			<div className='flex justify-center place-items-center gap-4 bg-slate-500'>
				<p
					className={`py-2 px-4 text-center w-2/4 text-white  cursor-pointer ${
						activeTab === 'unsubscribed' ? 'underline font-bold' : ''
					}`}
					onClick={() => setActiveTab('unsubscribed')}
				>
					Unsubscribed Packages
				</p>
				<p
					className={`py-2 px-4 text-center w-2/4 text-white  cursor-pointer  ${
						activeTab === 'subscribed' ? 'underline font-bold' : ''
					}`}
					onClick={() => setActiveTab('subscribed')}
				>
					Subscribed Packages
				</p>
			</div>
			<div className='mt-2'>
				{activeTab === 'unsubscribed' ? (
					<UnsubscribedTable />
				) : activeTab === 'subscribed' ? (
					<SubscribedTable />
				) : (
					<></>
				)}
			</div>
		</div>
	)
}

export default SubscriberPage
