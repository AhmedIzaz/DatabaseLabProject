'use client'

import { usePathname } from 'next/navigation'
import AuthenticatedLayout from './AuthenticatedLayout'

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
	const pathname = usePathname()
	return (
		<>
			{['/login', '/signup'].includes(pathname) ? (
				<>{children}</>
			) : (
				<AuthenticatedLayout>{children}</AuthenticatedLayout>
			)}
		</>
	)
}

export default AuthLayout
