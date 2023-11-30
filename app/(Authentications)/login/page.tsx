'use client'
import CommonButton from '@/app/common/CommonButton'
import CommonInput from '@/app/common/CommonInput'
import { FormEvent, useState } from 'react'
import { toast } from 'react-toastify'

const LoginPage = () => {
	const [loginValue, setLoginValue] = useState({
		email: '',
		password: '',
	})

	const onFieldChange = (field: string, value?: string) => {
		setLoginValue((prev) => ({ ...prev, [field]: value }))
	}
	const onFormSubmit = (e: FormEvent) => {
		e.preventDefault()
		const { email, password } = loginValue
		if (email?.length <= 6) return toast.warn('Please enter a valid email address')
		if (password?.length <= 4) return toast.warn('Password must be at least 4 characters')
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

				<CommonButton title='Login' type='submit' fullWidth />
			</form>
		</div>
	)
}

export default LoginPage
