import { useEffect } from 'react'
import { isTokenExpired } from '@/utils/common'
import { useRouter } from 'next/navigation'

const AuthenticatedLayout = ({ children }: { children: React.ReactNode }) => {
	const { push } = useRouter()
	useEffect(() => {
		const _isTokenExpired = isTokenExpired()
		if (_isTokenExpired) push('/login')
	}, [push])

	return <div>{children}</div>
}

export default AuthenticatedLayout
