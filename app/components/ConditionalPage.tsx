import { getUserCookie } from '@/utils/authOperations'
import AdminPage from './AdminPage'
import SubscriberPage from './SubscriberPage'

const ConditionalPage = () => {
	const userInformation = getUserCookie()
	return <>{userInformation?.type_id === 1 ? <AdminPage /> : <SubscriberPage />}</>
}

export default ConditionalPage
