import jwt from 'jsonwebtoken'
import { getTokenCookie } from './authOperations'

export const isTokenExpired = () => {
	const token = getTokenCookie()
	if (!token) return true
	try {
		jwt.verify(token, 'secret', { ignoreExpiration: false })
		return false
	} catch (error) {
		return true
	}
}
