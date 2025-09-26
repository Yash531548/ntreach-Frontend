
import React, { useEffect, useState } from 'react';
import Sidebar from '../components/Dashboard/Sidebar';
import RightTab from '../components/Dashboard/RightTab';
import UserProfile from '../components/Dashboard/UserProfile';
import BookAConsultant from '../components/Dashboard/BookAConsultant';
import TestingCenters from '../components/Dashboard/TestingCenters';
import ResultData from '../components/Dashboard/ResultData';
import UpcomingAppointMent from '../components/Dashboard/UpcomingAppointMent';
import RescheduleAppointment from '../components/Dashboard/RescheduleAppointment';
import PastConsultation from '../components/Dashboard/PastConsultation';
import Health from '../components/Dashboard/Health';
import AppointmentDetail from '../components/Dashboard/AppointmentDetail';
import Notification from '../components/Dashboard/Notification';
import UpperMenu from '../components/Dashboard/UpperMenu';


const Dashboard = () => {
    const [selectedView, setSelectedView] = useState('Home');
    const [subView, setSubView] = useState(null); // for inside pages like Reschedule
    
    const renderContent = () => {
        switch (selectedView) {
            case 'Home':
                if (subView === "Appointment Detail") {
                    return < AppointmentDetail setSubView={setSubView} setSelectedView={setSelectedView} />
                }
                return < Health setSubView={setSubView} setActive={setSelectedView} />;
            case 'Upcoming Appointments':
                if (subView === 'Reschedule') {
                    return < RescheduleAppointment setSubView={setSubView} setSelectedView={setSelectedView} />
                }
                return < UpcomingAppointMent setSubView={setSubView} />;
            case 'teleconsultation':
                if (subView === 'Past Consultation') {
                    return < PastConsultation setSubView={setSubView} />
                }
                return < BookAConsultant setSubView={setSubView} setSelectedView={setSelectedView} />;
            case 'My Results/Past Data':
                return < ResultData setSubView={setSubView} setSelectedView={setSelectedView} />;
            case "userProfile":
                return < UserProfile setSelectedView={setSelectedView} />
            case "Notifications":
                return < Notification setSelectedView={setSelectedView} />;
            // case "Health & Wealth":
            //     // Redirect to /blog and return nothing
            //     console.log("click on health & wealth icon")
            //     navigate("/blog");
            //     return null;

            case "Testing Centers":
                return < TestingCenters setActive={setSelectedView} />;
            case "PrEP Consultation":
                return <div className="p-6 text-xl font-semibold">👤 PrEP Consultation</div>;
            case "Book an Appointment":
                return <div className="p-6 text-xl font-semibold">👤 Book an Appointment</div>;
            default:
                return <div className="p-6">Select a view</div>;
        }
    };

    return (
        <div className="container w-full min-h-[calc(100vh-64px-60px)] mx-auto flex items-center justify-center px-4 sm:px-4
        lg:px-10 
        xl:px-0 mt-9
        2xl:ml-0 
        ">
            <main className="container max-w-[1200px]  min-h-[calc(100vh-64px-100px)]  flex  lg:max-w-[950px] 
            xl:max-w-[1250px]  justify-between">
                 
                {/* Center Section with Left and Middle */}
                <div className='w-full  xl:w-[85%] rounded-4xl flex flex-col lg:flex-row'>

                    {/* Left Panel */}
                   <div className='lg:hidden mb-6  w-full overflow-x-auto'>
                        <UpperMenu  setSelectedView={setSelectedView}/>
                    </div>
                    <div className='hidden bg-[#DAE9F0] rounded-l-4xl w-[30%]  lg:flex flex-col gap-4 '>

                        <Sidebar active={selectedView} setActive={setSelectedView} />
                    </div>

                    {/* Middle Panel */}
                    <div className=' rounded-r-4xl w-full lg:w-[70%] flex  lg:shadow-sm lg:border-r-gray-200  '>
                        {renderContent()}
                    </div>
                </div>

                {/* Right Panel */}
                {/* <div className=' w-[20%] '> */}
                <div className=' hidden lg:block w-[20%] xl:w-[15%] '>
                    <RightTab active={selectedView} setActive={setSelectedView} />
                </div>
            </main>
        </div>
    );
};

export default Dashboard;
