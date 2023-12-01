'use client'
import { signup } from '@/app/action'
import CommonButton from '@/app/common/CommonButton'
import CommonInput from '@/app/common/CommonInput'
import { useRouter } from 'next/navigation'
import { FormEvent, useState } from 'react'
import { toast } from 'react-toastify'
const SignupPage = () => {
	const { push } = useRouter()
	const [signupValue, setSignupValue] = useState({
		username: '',
		email: '',
		password: '',
		confirmPassword: '',
	})

	const onFieldChange = (field: string, value?: string) => {
		setSignupValue((prev) => ({ ...prev, [field]: value }))
	}
	const onFormSubmit = async (e: FormEvent) => {
		e.preventDefault()
		const { username, email, password, confirmPassword } = signupValue
		if (username?.length <= 4) return toast.warn('Please enter a valid name')
		if (email?.length <= 6) return toast.warn('Please enter a valid email address')
		if (password?.length <= 4) return toast.warn('Password must be at least 4 characters')
		if (password !== confirmPassword) return toast.warn('Password must be matched')
		const signupResponse = await signup({ username, email, password })
		if (signupResponse?.status !== 200) return toast.error(signupResponse?.message)
		toast.success(signupResponse.message)
		push('/login')
	}
	return (
		<div className='h-screen flex justify-center place-items-center flex-col'>
			<form onSubmit={onFormSubmit} className=' w-4/5 md:w-1/3 lg:w-1/5'>
				<p className='text-2xl text-center'>Signup</p>
				<CommonInput
					label='Name'
					value={signupValue.username}
					onChange={(value) => onFieldChange('username', value)}
				/>

				<CommonInput
					label='Email'
					type='email'
					value={signupValue.email}
					onChange={(value) => onFieldChange('email', value)}
				/>
				<CommonInput
					label='Password'
					value={signupValue.password}
					type='password'
					onChange={(value) => onFieldChange('password', value)}
				/>
				<CommonInput
					type='password'
					label='Confirm Password'
					value={signupValue.confirmPassword}
					onChange={(value) => onFieldChange('confirmPassword', value)}
				/>
				<CommonButton title='Submit' type='submit' fullWidth isPrimary />
				<p
					className='text-center text-gray-500 cursor-pointer'
					onClick={() => push('/login')}
				>
					Already have an account?{' '}
				</p>
			</form>
		</div>
	)
}

export default SignupPage
