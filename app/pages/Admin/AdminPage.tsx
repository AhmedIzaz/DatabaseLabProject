'use client'
import { useState } from 'react'
import PackageTable from './PackageTable'
import UserListTable from './UserListTable'

const AdminPage = () => {
	const [activeTab, setActiveTab] = useState<'subscriptions' | 'users'>('subscriptions')
	return (
		<>
			<div className='py-4'>
				<div className='  w-11/12 md:w-3/5 lg:w-2/4 mx-auto'>
					<div className='flex justify-center place-items-center gap-4 bg-slate-500'>
						<p
							className={`py-2 px-4 text-center w-2/4 text-white  cursor-pointer ${
								activeTab === 'subscriptions' ? 'underline font-bold' : ''
							}`}
							onClick={() => setActiveTab('subscriptions')}
						>
							Subscriptions
						</p>
						<p
							className={`py-2 px-4 text-center w-2/4 text-white  cursor-pointer  ${
								activeTab === 'users' ? 'underline font-bold' : ''
							}`}
							onClick={() => setActiveTab('users')}
						>
							Users
						</p>
					</div>
					<div className='mt-2'>
						{activeTab === 'subscriptions' ? (
							<PackageTable />
						) : activeTab === 'users' ? (
							<UserListTable />
						) : (
							<></>
						)}
					</div>
				</div>
			</div>
		</>
	)
}

export default AdminPage
