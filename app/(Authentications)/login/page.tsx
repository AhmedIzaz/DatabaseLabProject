'use client'
import { login } from '@/app/action'
import CommonButton from '@/app/common/CommonButton'
import CommonInput from '@/app/common/CommonInput'
import { setTokenCookie, setUserCookie } from '@/utils/authOperations'
import { useRouter } from 'next/navigation'
import { FormEvent, useState } from 'react'
import { toast } from 'react-toastify'

const LoginPage = () => {
	const { push } = useRouter()
	const [loginValue, setLoginValue] = useState({
		email: '',
		password: '',
	})

	const onFieldChange = (field: string, value?: string) => {
		setLoginValue((prev) => ({ ...prev, [field]: value }))
	}
	const onFormSubmit = async (e: FormEvent) => {
		e.preventDefault()
		const { email, password } = loginValue
		if (email?.length <= 6) return toast.warn('Please enter a valid email address')
		if (password?.length <= 4) return toast.warn('Password must be at least 4 characters')
		const loginResponse = await login(loginValue)
		if (loginResponse?.status !== 200) return toast.error(loginResponse.message)
		toast.success(loginResponse.message)
		setUserCookie(loginResponse.user as TUserInformation)
		setTokenCookie(loginResponse.token as string)
		push('/')
	}
	return (
		<div className='h-screen flex justify-center place-items-center flex-col'>
			<form onSubmit={onFormSubmit} className=' w-4/5 md:w-1/3 lg:w-1/5'>
				<p className='text-2xl text-center'>Login</p>
				<CommonInput
					label='Email'
					type='email'
					value={loginValue.email}
					onChange={(value) => onFieldChange('email', value)}
				/>
				<CommonInput
					label='Password'
					value={loginValue.password}
					type='password'
					onChange={(value) => onFieldChange('password', value)}
				/>

				<CommonButton title='Login' type='submit' fullWidth isPrimary/>
				<p className='text-center text-gray-500 cursor-pointer' onClick={()=>push("/signup")}>Dont have any account yet? </p>
			</form>
		</div>
	)
}

export default LoginPage
