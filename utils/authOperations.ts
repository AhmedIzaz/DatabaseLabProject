import Cookies from 'js-cookie'
const TOKEN_COOKIE_KEY = 'jwtToken'
const USER_COOKIE_KEY = 'usrInfo'

export const setTokenCookie = (token: string) => {
	Cookies.set(TOKEN_COOKIE_KEY, token, { expires: 1, sameSite: 'strict' })
}

export const getTokenCookie = (): string | null => {
	const token = Cookies.get(TOKEN_COOKIE_KEY)
	return token ?? null
}

export const removeTokenCookie = () => {
	Cookies.remove(TOKEN_COOKIE_KEY)
}

export const setUserCookie = (data: TUserInformation) => {
	Cookies.set(USER_COOKIE_KEY, JSON.stringify(data), { expires: 1, sameSite: 'strict' })
}

export const getUserCookie = (): TUserInformation | null => {
	const user = Cookies.get(USER_COOKIE_KEY)
	return user ? JSON.parse(user) : null
}

export const clearAllCookie = () => {
	Cookies.remove(TOKEN_COOKIE_KEY)
	Cookies.remove(USER_COOKIE_KEY)
}
