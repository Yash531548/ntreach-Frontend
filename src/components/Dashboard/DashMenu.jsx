// components/Dashboard/DashMenu.jsx
import { Home, Calendar, Book, FilePlus2, User2, User, FileText } from 'lucide-react';
import { useNavigate } from 'react-router';

const menuItems = [
    { key: 'Home', label: 'Dashboard Page', icon: <Home size={22} /> },
    { key: 'teleconsultation', label: 'Book a Teleconsultation', icon: <Calendar size={22} /> },
    { key: 'Book an Appointment', label: 'Book Appt.', icon: <Book size={22} />, to: '/bookappointment' },
    { key: 'PrEP Consultation', label: 'PrEP Consult', icon: <FileText size={22} />, to: '/prepconsultation' },
    { key: 'Testing Centers', label: 'Testing', icon: <User size={22} /> },
];
const DashMenu = ({ selected, setSelected }) => {
    const navigate = useNavigate();
    return (
        <nav className="fixed z-30 bottom-0 left-0 w-full bg-white border-t border-gray-200 flex justify-between px-2 py-1 shadow-lg lg:hidden">
            {menuItems.map(item => (
                <button
                    key={item.key}
                    onClick={() => item.to ? navigate(item.to) : setSelected(item.key)}
                    className={`flex flex-col flex-1 items-center justify-center text-xs py-2 ${selected === item.key
                        ? 'text-[#0063B9] font-semibold'
                        : 'text-gray-500'
                        }`}
                >
                    {item.icon}
                    <span className={`mt-1 ${selected === item.key ? 'text-[#0063B9]' : ''}`}>
                        {item.label.split(' ')[0]} {/* first word for compact mobile look */}
                    </span>
                </button>
            ))}
        </nav>
    );
}

export default DashMenu;
