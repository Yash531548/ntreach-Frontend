import { useState, useEffect, useMemo } from 'react';
import { MapPin, PhoneCall } from 'lucide-react';
import { fetchStates as getStates } from '../../Api/getState';

import WhatsappIcon from '../../assets/Static/WhatsApp.png';
import FacebookIcon from '../../assets/Static/Facebook.png';
import InstagramIcon1 from "../../assets/Static/Instagram1.png";

const NavigatorCard = ({ VnImage = "", VnName = "", VnStateList = [], VnMobile = "" ,vnInstagram = "", vnFacebook = "", vnLinkedin = ""}) => {
  const [states, setStates] = useState([]);

  useEffect(() => {
    const fetchStates = async () => {
      try {
        const response = await getStates();
        setStates(response);
      } catch (error) {
        console.error('Error fetching states:', error.message);
      }
    };
    fetchStates();
  }, []);

  // Keep decodedStates as array
  const decodedStates = useMemo(() => {
    if (!Array.isArray(VnStateList) || !states.length) return [];

    return VnStateList.map(code =>
      states.find(
        s => Number(s.state_code) === Number(code)
      )?.state_name
    ).filter(Boolean);
  }, [VnStateList, states]);

  // Format WhatsApp number (remove non-digits, assuming country code included)
  const whatsappLink = VnMobile
    ? `https://wa.me/${VnMobile.replace(/\D/g, '')}`
    : null;
  // Phone number link (using tel: protocol)
  const phoneLink = `tel:${VnMobile.replace(/\D/g, '')}`; // Ensures the phone number is numeric only

  return (
    <div
      className="
        bg-[#DAF3FF]
        rounded-3xl
        flex flex-col items-center
        px-2 py-4 sm:p-4 md:p-3
        w-full max-w-[180px]
        sm:max-w-[220px]
        md:max-w-[220px]
        shadow-md mx-auto
        transition-all
      "
      style={{ fontFamily: 'Sofia Pro', fontWeight: 400 }}
    >
      <div className="relative flex justify-center items-center h-[7rem] md:h-[9rem]">
        <div
          className="
            absolute rounded-full bg-[#FFD600]
            w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28
            top-1/2 left-1/2
            -translate-x-1/2 -translate-y-1/2
          "
        />
        <img
          src={VnImage}
          alt=""
          className="
            z-10 w-16 sm:w-20 md:w-24 md:h-24
            object-cover rounded-full relative shadow-lg mt-6
          "
        />
      </div>

      <div className="text-lg sm:text-xl md:text-2xl font-semibold text-black text-center">
        {VnName}
      </div>

      {!!decodedStates.length && (
        <div className="flex items-center mt-1 text-xs sm:text-sm w-full justify-center grow">
          <MapPin className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 mr-1 text-[#FF5593]" />
          <div
            className="max-w-[110px] sm:max-w-[160px] break-words text-center"
            title={decodedStates.join(', ')}
          >
            {decodedStates.map((name, index) => (
              <span key={index}>
                {name}
                {index < decodedStates.length - 1 && ', '}
              </span>
            ))}
          </div>
        </div>
      )}

      <div className=" mt-2 text-black font-bold text-sm sm:text-base">
        <a href={phoneLink} className='flex gap-2 '>
        <PhoneCall className='w-4 text-blue-500'/>
          {VnMobile}
        </a>
      </div>

      <div className="flex gap-2 mt-3 w-full items-center justify-center">
        {vnInstagram && (
          <a href={vnInstagram} target="_blank" rel="noopener noreferrer">
            <img src={InstagramIcon1} alt="Instagram" className="w-5 sm:w-6 cursor-pointer" />
          </a>
        )}
        <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
          <img src={WhatsappIcon} alt="WhatsApp" className="w-6 sm:w-7 cursor-pointer" />
        </a>
        {vnFacebook && (
          <a href={vnFacebook} target="_blank" rel="noopener noreferrer">
            <img src={FacebookIcon} alt="Facebook" className="w-5 sm:w-6 cursor-pointer" />
          </a>
        )}
      </div>
    </div>
  );
};

export default NavigatorCard;
