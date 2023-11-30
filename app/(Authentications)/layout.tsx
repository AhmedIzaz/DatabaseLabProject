'use client'
import { isTokenExpired } from '@/utils/common'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function AuthLayout({ children }: { children: React.ReactNode }) {
	const { push } = useRouter()
	useEffect(() => {
		const _isTokenExpired = isTokenExpired()
		if (!_isTokenExpired) push('/')
	}, [push])
	return <>{children}</>
}
