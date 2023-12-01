'use server'
import pool from '@/utils/db'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
type TResponseType = {
	status?: number
	message?: string
}
export async function signup(obj: TUserInformation) {
	let response = {
		status: 400,
		message: '',
	}
	try {
		const { username, email, password } = obj
		const userExistQuery = `SELECT email FROM user WHERE email='${email}'`
		const [rows] = await pool.query(userExistQuery) //terminate this
		// @ts-ignore
		if (rows?.length > 0) {
			response.message = 'User already exist of this email'
			return response
		}
		const hashedPassword = await bcrypt.hash(password || '', 10)
		const userCreationQuery = `INSERT INTO user (username, email, password, type_id) values ('${username}', '${email}', '${hashedPassword}', 2)`
		await pool.query(userCreationQuery)
		response.status = 200
		response.message = 'User signup successful'
		return response
	} catch (error) {
		response.message = 'Error occured during user signup'
		return response
	}
}

export async function login(
	obj: TUserInformation
): Promise<TResponseType & { token?: string; user?: TUserInformation }> {
	let response = {
		status: 400,
		message: '',
		token: '',
		user: undefined,
	}
	try {
		const { email, password } = obj
		const getUserByEmailQuery = `SELECT * FROM user WHERE email='${email}'`
		const [rows] = await pool.query(getUserByEmailQuery)
		// @ts-ignore
		if (rows?.length < 1) {
			response.message = 'User not found with this email'
			return response
		}
		// @ts-ignore
		const { password: userPassword, ...user }: TUserInformation = rows?.[0]
		const passwordMatched = await bcrypt.compare(password as string, userPassword as string)
		if (!passwordMatched) {
			response.message = 'Password did not matched'
			return response
		}
		const token = jwt.sign(user, 'secret', { expiresIn: 60 * 60 })
		response.token = token
		response.message = 'User logged-in successfully'
		response.status = 200
		response.user = user as any
		return response
	} catch (error) {
		response.message = error.message || 'Something wrong'
		return response
	}
}

// get package list
export async function getPackages(): Promise<TResponseType & { packageList?: TPackage[] }> {
	let response = {
		status: 400,
		message: 'Error occured during package loading',
		packageList: [],
	}
	try {
		const getPackageQuery = `SELECT * FROM package`
		const [rows] = await pool.query(getPackageQuery)
		response.status = 200
		response.message = ''
		// @ts-ignore
		response.packageList = rows
		return response
	} catch (error) {
		return response
	}
}

// create package and update
export async function createAndUpdatePackage(packageObj: TPackage) {
	let response = {
		status: 400,
		message: 'Error occured during package creation',
	}
	try {
		const { id, package_name } = packageObj
		const getPackageQuery = `SELECT package_name FROM package WHERE package_name='${package_name}'`
		const [row] = await pool.query(getPackageQuery)
		// @ts-ignore
		if (row?.length > 0) {
			response.message = 'Duplicate Package Detected'
			return response
		}
		if (id) {
			const packageUpdateQuery = `UPDATE package SET package_name='${package_name}' WHERE id=${id}`
			await pool.query(packageUpdateQuery)
			response.message = 'Package updated successfully'
		} else {
			const packageCreateQuery = `INSERT INTO package (package_name) values ('${package_name}')`
			await pool.query(packageCreateQuery)
			response.message = 'Package created successfully'
		}
		response.status = 200
		return response
	} catch (error) {
		return response
	}
}
// delete package
export async function deletePackage(id: number) {
	let response = {
		status: 400,
		message: 'Error occured during package deletion',
	}
	try {
		const packageDeleteQuery = `DELETE FROM package where id=${id}`
		await pool.query(packageDeleteQuery)
		response.status = 200
		response.message = 'Package deleted successfully'
		return response
	} catch (error) {
		return response
	}
}

// get user list
export async function getUserList(): Promise<TResponseType & { userList?: TUserInformation[] }> {
	let response = {
		status: 400,
		message: 'Error occured during get users',
		userList: [],
	}
	try {
		const getUserListQuery = `SELECT * FROM user WHERE type_id!=1`
		const [rows] = await pool.query(getUserListQuery)
		response.status = 200
		response.message = ''
		// @ts-ignore
		response.userList = rows
		return response
	} catch (error) {
		return response
	}
}

// delete user
export async function deleteUser(id: number) {
	let response = {
		status: 400,
		message: 'Error occured during user deletion',
	}
	try {
		const deleteUserQuery = `DELETE FROM user WHERE id=${id}`
		await pool.query(deleteUserQuery)
		response.status = 200
		response.message = 'User deleted successfully'
		return response
	} catch (error) {
		return response
	}
}

// get subscribedOrUnsubscribed packages
export async function getSubscribedOrUnSubscribedPackages(
	id: number,
	type: 'subscribed' | 'unsubscribed'
): Promise<TResponseType & { packageList?: TPackage[] }> {
	let response = {
		status: 400,
		message: 'Error occured during packages',
		packageList: [],
	}
	try {
		let query = ''
		if (type === 'subscribed') {
			query = `SELECT package.* FROM package JOIN subscription ON package.id=subscription.package_id WHERE subscription.user_id=${id}`
		} else {
			query = `SELECT * FROM package WHERE package.id NOT IN (SELECT package_id FROM subscription WHERE subscription.user_id=${id})`
		}
		const [row] = await pool.query(query)
		response.status = 200
		response.message = ''
		// @ts-ignore
		response.packageList = row
		return response
	} catch (error) {
		return response
	}
}

// subscribe or unsubscribe
export async function subscribeOrUnSubscribe(
	userId: number,
	packageId: number = 0,
	type: 'subscribe' | 'unsubscribe'
) {
	let response = {
		status: 400,
		message: 'Error occured during subscribe',
	}
	try {
		let query = ''
		if (type === 'subscribe') {
			query = `INSERT INTO subscription (user_id, package_id) values (${userId}, ${packageId})`
		} else {
			query = `DELETE FROM subscription WHERE user_id=${userId} AND package_id=${packageId}`
		}
		await pool.query(query)
		response.status = 200
		response.message = `Package ${type}d successfully`
		return response
	} catch (error) {
		return response
	}
}
