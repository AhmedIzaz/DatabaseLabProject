import { isExpired } from 'react-jwt'
import { getTokenCookie } from './authOperations'

export const isTokenExpired = () => {
	const token = getTokenCookie()
	if (token) {
		const _isExpired = isExpired(token)
		if (!_isExpired) return false
	}
	return true
}
