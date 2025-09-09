import React from 'react'
import NavigatorCard from './Teams/NavigatorCard'

import { useState } from 'react'
// import AssessmentRiskMeter from './AssementRiskMeter'


const AssementResult = () => {
    const [riskValue , setRiskValue] = useState(65)
    return (
        <div className='container w-full mx-auto flex items-center px-4 md:mb-8 sm:px-4 lg:px-10 xl:px-0 mt-9 2xl:ml-0'>
            <main
                className="container max-w-[1200px] flex flex-col mx-auto lg:max-w-[850px] xl:max-w-[1100px] gap-7 md:px-8 md:mt-8"
                style={{ fontFamily: "Sofia Pro", fontWeight: 400 }}>
                <div className='border flex  justify-between'>
                    
                </div>
                {/* Virtual Navigator */}
                <div className='space-y-8'>
                    <div>
                        <h2 className="text-3xl lg:text-4xl xl:text-[40px] md:mb-0">
                            Or Chat with <span className='text-[#1475A1]'> our Virtual Navigators </span>
                        </h2>
                    </div>
                    <div
                        className="
            grid gap-6 w-full
            grid-cols-2 
            sm:grid-cols-2 
            md:grid-cols-3 
            lg:grid-cols-3 
            xl:grid-cols-4
            justify-items-center
            mb-4 
            "
                    >
                        {/* Replace with dynamic mapping over your data */}
                        <NavigatorCard />
                        <NavigatorCard />
                        <NavigatorCard />
                        <NavigatorCard />
                        <NavigatorCard />
                        <NavigatorCard />
                        <NavigatorCard />
                        <NavigatorCard />
                        <NavigatorCard />
                        <NavigatorCard />
                    </div>
                </div>
            </main>
        </div>
    )
}

export default AssementResult