import React from 'react';
import chatbot from "../assets/chatbot.png";
import { Mic, SearchIcon } from 'lucide-react';
const ChatBot = () => {
    return (
        <div className="fixed bottom-[12%] right-[12%] gap-4 rounded-full  cursor-pointer bg-[#F3F3F3] drop-shadow-md">
                            
                                <img src={chatbot} alt="Ask" className="w-14 h-14 rounded-full border-2 absolute top-[-26%] right-[92%]  " />
                                <div className="flex items-center  ">
                                    < SearchIcon color='#838383'className='w-4 h-4 ml-4 mr-2'/>
                                    <input
                                        type="text"
                                        placeholder="Ask a question"
                                        className=" text-gray-700 outline-none text-xs  w-22"
                                    />
                                    <button className="bg-gradient-to-b from-[#323FF7] to-[#33AEE5] text-white w-8 h-8 flex items-center justify-center rounded-full shrink-0">
                                        <Mic />
                                    </button>
                                </div>
                            
                        </div>
    );
};

export default ChatBot;
