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
            <Route path='/Questionnaire' element={<Questionnaire />} />
            <Route path='/About' element={<About />} />
            <Route path='/Contact' element={<Contact />} />
            <Route path='/team' element={<Team />} />
            <Route path='/faqs' element={<FAQs />} />
            <Route path='/risk' element={<Risk />} />
            <Route path='/blog' element={<Blogs />} />
            <Route path='/Login' element={<Login />} />
            <Route path='/LoginWithNumber' element={<LoginWithNumber />} />
            <Route path='/Dashboard' element={<Dashboard />} />
            <Route path='/prepConsultation' element={<PrepConsultation />} />
            <Route path='/healthWealth' element={<HealthWealth />} />
            <Route path='/bookAppointment' element={<BookAppointment />} />
            <Route path='/ScheduleAppointment' element={<ScheduleAppointment />} />
            <Route path='/appointmentConfirmed' element={<AppointmentConfirmed />} />

          </Route>
        </Routes>
      </div>
    </>
  )
}

export default App
