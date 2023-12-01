import mysql from 'mysql2'
const db = mysql.createPool({
	connectionLimit: 25,
	port: 3306,
	host: 'localhost',
	user: 'root',
	password: '/*Asif01839465030*/',
	database: 'subscription',
})

db.getConnection((error, connection) => {
	if (error) {
		if (error.code === 'PROTOCOL_CONNECTION_LOST') {
			console.log('Database connection was closed.')
		} else if (error.code === 'ER_CON_COUNT_ERROR') {
			console.log('Database has too many connections.')
		} else if (error.code === 'ECONNREFUSED') {
			console.log('Database connection was refused.')
		} else if (error.code == 'ER_NOT_SUPPORTED_AUTH_MODE') {
			console.log(
				'MySQL client does not support authentication protocol requested by server.'
			)
		} else {
			console.log('Connecting database: ' + error.code)
		}
	}
	if (connection) connection.release()
	return
})
const pool = db.promise()

export default pool
