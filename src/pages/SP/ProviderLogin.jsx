import React, { useState } from "react";
import { useNavigate } from "react-router";
import logoBac from "../../assets/logo-bac.png";
import Humsafar from "../../assets/humsafar-logo.png";

const ProviderLogin = () => {
    const navigate = useNavigate();
    const [credentials, setCredentials] = useState({
        email: "",
        password: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCredentials((prev) => ({ ...prev, [name]: value }));
    };

    const handleLogin = async (e) => {
        e.preventDefault();

        const { email, password } = credentials;
        if (!email || !password) {
            alert("Please enter both email and password");
            return;
        }

        try {
            // TODO: replace with real login API call
            

            console.log("Login credentials:", credentials);
            alert("Login successful!");

            // Redirect to profile completion page
            navigate("/provider/profile");
        } catch (error) {
            console.error("Login error:", error);
            alert("Failed to login. Try again.");
        }
    };

    return (
        <div className="flex justify-center h-[95vh]">
            <div className="w-full md:max-w-xl mt-12">
                <div className="w-full p-2 mx-auto space-y-14">
                    <header className="flex justify-between items-center">
                        <img src={logoBac} alt="NETREACH Logo" className="h-8 xl:h-[49px] w-auto" />
                        <img src={Humsafar} alt="Humsafar Logo" className="h-10 md:h-18 w-auto" />
                    </header>

                    <div className="flex flex-col items-center space-y-6">
                        <h1 className="text-black text-2xl md:text-3xl font-medium">
                            Login with Email
                        </h1>

                        <form
                            onSubmit={handleLogin}
                            className="w-full max-w-md space-y-4 p-2"
                        >
                            <input
                                type="email"
                                name="email"
                                value={credentials.email}
                                onChange={handleChange}
                                placeholder="Enter Email Address"
                                className="outline-none bg-[#E9E9E9] placeholder:text-[#AFAFAF] w-full py-3 px-3 rounded-md"
                            />

                            <input
                                type="password"
                                name="password"
                                value={credentials.password}
                                onChange={handleChange}
                                placeholder="Enter Password"
                                className="outline-none bg-[#E9E9E9] placeholder:text-[#AFAFAF] w-full py-3 px-3 rounded-md"
                            />

                            <button
                                type="submit"
                                className="border border-[#566AFF] bg-[linear-gradient(180deg,_#323FF7_0%,_#33AEE5_100%)] rounded-md text-white w-full py-2 cursor-pointer"
                            >
                                Login
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProviderLogin;
