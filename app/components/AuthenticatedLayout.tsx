import { useEffect } from 'react'
import { isTokenExpired } from '@/utils/common'
import { useRouter } from 'next/navigation'
import { toast } from 'react-toastify'
import { clearAllCookie, getUserCookie } from '@/utils/authOperations'
import CommonButton from '../common/CommonButton'
const AuthenticatedLayout = ({ children }: { children: React.ReactNode }) => {
	const { push } = useRouter()
	const userInformation = getUserCookie()
	useEffect(() => {
		const _isTokenExpired = isTokenExpired()
		if (_isTokenExpired) {
			toast.warn('Session has expired, please login')
			push('/login')
		}
	}, [push])

	return (
		<div className='  w-11/12 md:w-3/5 lg:w-2/4 mx-auto'>
			<div className='flex justify-between place-items-center py-2'>
				<span className=' bg-green-300 py-4 px-6 rounded-full font-bold	text-white text-xl'>
					{userInformation?.username?.[0]?.toUpperCase()}
				</span>
				<CommonButton
					title='Logout'
					isDanger
					onClick={() => {
						clearAllCookie()
						push('/login')
					}}
				/>
			</div>
			<div>{children}</div>
		</div>
	)
}

export default AuthenticatedLayout
