import './App.css'
import Layout from './Layout/Layout'
import Home from './pages/Home'
import { Navigate, Route, Routes, useLocation } from 'react-router'
import { VnProvider } from './Context/VnContext.jsx'
import Questionnaire from './pages/Questionnaire'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import HealthWealth from './components/Dashboard/HealthWealth'
import PrepConsultation from './components/Dashboard/PrepConsultation'
import BookAppointment from './components/Dashboard/BookAppointment'
import ScheduleAppointment from './components/Dashboard/ScheduleAppointment'
import AppointmentConfirmed from './components/Dashboard/AppointmentConfirmed'
import LoginWithNumber from './pages/LoginWithNumber'
import ScrollToTop from './Utility/ScrollToTop'
import About from './pages/About'
import Contact from './pages/Contact'
import FAQs from './pages/FAQs'
import Team from './pages/Team'
import Risk from './pages/Risk'
import Blogs from './pages/Blogs'
import CounsellarForm from './components/CounsellarForm'
import AssementResult from './components/AssementResult'
import ProtectedRoute from './Utility/ProtectedRoute'
import Search from './pages/Search'
import ProviderLogin from './pages/SP/ProviderLogin'
import ProviderDashboardLayout from './Layout/ProviderDashboardLayout'
import ProviderMyAppointments from './components/SP/ProviderMyAppointments'
import ProviderMySlots from './components/SP/ProviderMySlots'
import ProviderProfile from './pages/SP/ProviderProfile'
import ProviderUpcomingAppointments from './components/SP/ProviderUpcomingAppointments'
import ProviderPastAppointments from './components/SP/ProviderPastAppointments'

function App() {
  const { pathname } = useLocation();

  // Check if current path starts with /provider
  const isProviderPath = pathname.startsWith('/provider');
  return (
    <>
      <ScrollToTop />
      <div className={`bg-white ${isProviderPath ? "" : "h-screen"}  `}>
        <Routes >
          {/* Parent route uses Layout */}
          <Route path='/' element={<VnProvider><Layout /></VnProvider>}>
            {/* Nested routes inherit the layout */}
            <Route index element={<Home />} />
            <Route path=":vnName" element={<Home />} />
            <Route path="/questionnaire" element={
              <ProtectedRoute >
                <Questionnaire />
              </ProtectedRoute>
            } />
            <Route path='/about' element={<About />} />
            <Route path='/contact' element={<Contact />} />
            <Route path='/team' element={<Team />} />
            <Route path='/faqs' element={<FAQs />} />
            <Route path='/risk' element={<Risk />} />
            <Route path='/blog' element={<Blogs />} />
            <Route path='/login' element={<Login />} />
            <Route path='/loginwithnumber' element={<LoginWithNumber />} />
            <Route path='/dashboard' element={
              <ProtectedRoute >

                <Dashboard />
              </ProtectedRoute>
            } />
            <Route path="/prepconsultation" element={
              <ProtectedRoute>
                <PrepConsultation />
              </ProtectedRoute>
            } />

            <Route path='/bookappointment' element={<BookAppointment />} />
            <Route path='/schedulesppointment' element={<ScheduleAppointment />} />
            <Route path='/assessmentresult' element={<AssementResult />} />
            <Route path='/counsellorform' element={<CounsellarForm />} />
            <Route path='/appointmentconfirmed' element={<AppointmentConfirmed />} />

            <Route path="/search" element={<Search />} />
          </Route>
          <Route path="/provider">
            <Route path="login" element={<ProviderLogin />} />
            <Route path="profile" element={<ProviderProfile />} />
            <Route path="dashboard" element={<ProviderDashboardLayout />}>
              <Route index element={<Navigate to="appointments/upcoming" replace />} />
              <Route path="appointments">
                <Route path="upcoming" element={<ProviderUpcomingAppointments />} />
                <Route path="past" element={<ProviderPastAppointments />} />
              </Route>
              <Route path="slots" element={<ProviderMySlots />} />
            </Route>
          </Route>
        </Routes>
      </div>
    </>
  )
}

export default App
