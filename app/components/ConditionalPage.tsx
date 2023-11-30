import { getUserCookie } from '@/utils/authOperations'
import AdminPage from '../pages/Admin/AdminPage'
import SubscriberPage from '../pages/Subscriber/SubscriberPage'

const ConditionalPage = () => {
	const userInformation = getUserCookie()
	return (
		<>
			{/* {userInformation?.type_id === 1 ? ( */}
				{/* <AdminPage /> */}
			{/* ) : userInformation?.type_id === 2 ? ( */}
				<SubscriberPage />
			{/* ) : ( */}
				{/* <></> */}
			{/* )} */}
		</>
	)
}

export default ConditionalPage
