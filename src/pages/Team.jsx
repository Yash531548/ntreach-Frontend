import React from 'react';
import NavigatorCard from '../components/Teams/NavigatorCard';
import { VnData } from '../libs/vnData';

const Team = () => {
    
    return (
        <div className='container w-full mx-auto flex items-center px-4 md:mb-8 sm:px-4 lg:px-10 xl:px-0 mt-9 2xl:ml-0'>
            <main
                className="container max-w-[1200px] flex flex-col mx-auto lg:max-w-[850px] xl:max-w-[1100px] gap-7 md:px-8 md:mt-8"
                style={{ fontFamily: "Sofia Pro", fontWeight: 400 }}>
                <div>
                    <h2 className="text-3xl lg:text-4xl xl:text-[2.625rem] md:mb-0">
                        Our Virtual Navigators
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
                    {VnData.map((vn) => (
                        <NavigatorCard
                            key={vn.VnID}
                            VnImage={vn.VnImage}
                            VnName={vn.VnName}
                            VnState={vn.VnState}
                            VnMobile={vn.VnMobile}
                        />
                    ))}
                </div>
            </main>
        </div>
    );
};

export default Team;
