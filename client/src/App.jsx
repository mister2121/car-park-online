import { Route, Routes } from "react-router-dom"
import "./App.css"
import Layout from "./components/Layout/Layout"
import HomePage from "./pages/Home/HomePage"
import LoginPage from "./pages/Login/LoginPage"
import RegisterPage from "./pages/Register/RegisterPage"
import { UserContextProvider } from "./components/UserContext"
import ContactPage from "./pages/Contact/ContactPage"
import Bookings from "./pages/UserBookings/Bookings"
import ProfilePage from "./pages/UserProfile/ProfilePage"
import Parkings from "./pages/UserParkings/Parkings"
import NewParking from "./pages/NewParking/NewParking"
import Listings from "./pages/Listings/Listings"
import SingleListingPage from "./pages/SingleListing/SingleListingPage"
import PrivateRoutes from "./components/PrivateRoutes"

function App() {
	return (
		<UserContextProvider>
			<Routes>
				<Route path='/' element={<Layout />}>
					<Route index element={<HomePage />} />
					<Route path='/login' element={<LoginPage />} />
					<Route path='/register' element={<RegisterPage />} />
					<Route element={<PrivateRoutes />}>
						<Route path='/contact' element={<ContactPage />} />
						<Route path='/bookings' element={<Bookings />} />
						<Route path='/profile' element={<ProfilePage />} />
						<Route path='/parkings' element={<Parkings />} />
						<Route path='/parkings/new' element={<NewParking />} />
						<Route path='/parkings/:id' element={<NewParking />} />
						<Route path='/listings' element={<Listings />} />
						<Route path='/listing/:id' element={<SingleListingPage />} />
					</Route>
				</Route>
			</Routes>
		</UserContextProvider>
	)
}

export default App
