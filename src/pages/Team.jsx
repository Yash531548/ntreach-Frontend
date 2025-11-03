import { useEffect, useState } from 'react';
import { useVn } from '../Context/VnContext'
import NavigatorCard from '../components/Teams/NavigatorCard';
import { VnData } from '../libs/vnData';
import { getVns } from '../Api/getVns';

const Team = () => {
    const { vnData, loading } = useVn()
    const [teamVns, setTeamVns] = useState([]);
    const [loadingApi, setLoadingApi] = useState(false);

    useEffect(() => {
        // Fetch data on mount
        async function fetchData() {
            setLoadingApi(true);
            try {
                const response = await getVns();
                console.log("response", response.data.data)
                // response.data is expected to be your VN array.
                let data = response.data.data;

                // Handle if data is an object, not an array
                if (!Array.isArray(data)) {
                    // If it's an object, wrap it in an array, if null fallback to []
                    data = data ? [data] : [];
                }
                setTeamVns(data)
                // setTeamVns(response.data || []);
            } catch (err) {
                setTeamVns([]); // fallback to empty array on error
            } finally {
                setLoadingApi(false);
            }
        }
        fetchData();
    }, []);

    // If vnData is loaded and has a name, filter it. Otherwise, show all
    // const displayedVns =
    //     !loading && vnData?.name
    //         ? VnData.filter(vn => vn.VnName === vnData.name)
    //         : VnData;
    const displayedVns =
        !loading && vnData?.name
            ? teamVns.filter(vn => vn.name === vnData.name)
            : teamVns;
    // Sort alphabetically by VnName (after filtering)
    // const sortedVns = displayedVns.slice().sort((a, b) =>
    //     a.VnName.localeCompare(b.VnName)
    // );
    const sortedVns = displayedVns.slice().sort((a, b) =>
        (a.name || '').localeCompare(b.name || '')
    );
    // console.log("team vn", teamVns)

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
                    {/* {displayedVns.map((vn, i) => ( */}
                    {/* {sortedVns.map((vn, i) => (
                        <NavigatorCard
                            key={i}
                            VnImage={vn.VnImage}
                            VnName={vn.VnName}
                            VnState={vn.VnState}
                            VnMobile={vn.VnMobile}
                        />
                    ))} */}
                    {loadingApi ? (
                        <div>Loading...</div>
                    ) : (
                        sortedVns
                            .filter(vn => !vn.vncode.startsWith("PO"))
                            .map((vn, i) => (
                                <NavigatorCard
                                    key={i}
                                    VnImage={vn.profile_photo}
                                    VnName={vn.name}
                                    VnStateList={vn.state_list?.slice(0, 2)}
                                    VnMobile={vn.mobile_number}
                                    vnInstagram={vn.instagram_url}
                                    vnFacebook={vn.facebook_url}
                                    vnLinkedin={vn.linkedin_url}
                                />
                            ))
                    )}
                </div>
            </main>
        </div>
    );
};

export default Team;
