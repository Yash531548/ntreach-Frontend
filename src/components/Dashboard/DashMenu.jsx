// components/Dashboard/DashMenu.jsx

import { useNavigate } from 'react-router';
import HomeIcon from '../../assets/Dashboard/Mobile/Home.svg'
import ActiveHome from '../../assets/Dashboard/Mobile/HomeActive.svg'
import PrepConsultation from '../../assets/Dashboard/Mobile/PrepConsultation.svg'
import BookAppointment from '../../assets/Dashboard/Mobile/BookAppointment.svg'
import TestingCenter from '../../assets/Dashboard/Mobile/TestingCenter.svg'
import ActiveTesting from '../../assets/Dashboard/Mobile/TestingActive.svg'
import Teleconsultation from '../../assets/Dashboard/Mobile/Teleconsulation.svg'
import ActiveTeleconsultation from '../../assets/Dashboard/Mobile/TeleconsulationActive.svg'

const menuItems = [
    { key: 'Home', label: 'Dashboard Page', icon: HomeIcon, active: ActiveHome },
    { key: 'teleconsultation', label: 'Book a Teleconsultation',  icon: Teleconsultation, active: ActiveTeleconsultation},
    { key: 'Book an Appointment', label: 'Book an Appointment', icon: BookAppointment, to: '/bookappointment' },
    { key: 'PrEP Consultation', label: 'PrEP Consultation', icon: PrepConsultation, to: '/prepconsultation' },
    { key: 'Testing Centers', label: `Testing Centres`,  icon: TestingCenter, active: ActiveTesting  },
];
const DashMenu = ({ selected, setSelected }) => {
    const navigate = useNavigate();
    return (
        <nav className="fixed z-30 bottom-0 left-0 w-full bg-white border-t border-gray-200 flex justify-between px-2 py-1 shadow-lg lg:hidden flex-wrap">
            {menuItems.map(item => (
                <button
                    key={item.key}
                    onClick={() => item.to ? navigate(item.to) : setSelected(item.key)}
                    className={`flex flex-col flex-1 items-center  justify-start text-xs py-2 max-w-[48px]  ${selected === item.key
                        ? 'text-[#0063B9] font-semibold'
                        : 'text-gray-500'
                        }`}
                >
                    {/* {item.active ? item.active :   item.icon} */}
                    {
                        // If icon/active is a string, it's a file path, so use <img>
                        typeof (selected === item.key && item.active ? item.active : item.icon) === 'string'
                            ? <img src={selected === item.key && item.active ? item.active : item.icon} alt={item.label} className="w-6 h-6" />
                            : (selected === item.key && item.active ? item.active : item.icon)
                    }
                    <span className={`mt-1 text-[9px]   ${selected === item.key ? 'text-[#0063B9]' : ''}`}>
                        {/* {item.label.split(' ')[0]} first word for compact mobile look */}
                        {item.label}
                    </span>
                </button>
            ))}
        </nav>
    );
}

export default DashMenu;
