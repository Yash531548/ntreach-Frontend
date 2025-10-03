import './App.css'
import Layout from './Layout/Layout'
import Home from './pages/Home'
import { Route, Routes } from 'react-router'
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

function App() {
  return (
    <>
      <ScrollToTop />
      <div className='bg-white h-screen '>
        <Routes >
          {/* Parent route uses Layout */}
          <Route path='/' element={< Layout />}>
            {/* Nested routes inherit the layout */}
            <Route index element={<Home />} />
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
        </Routes>
      </div>
    </>
  )
}

export default App
