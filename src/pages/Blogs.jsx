import React from 'react'
import { ArrowRight, Search } from "lucide-react";
import EYNBlog from '../assets/Static/EYNBlog.png'
import BlogCards from '../components/Blog/BlogsCards';
import PPSBlog from '../assets/Static/PPSBlog.png'

const BlogSearchBar = () => (
    <div className="relative w-full max-w-3xl  mb-8 ">
        <input
            type="text"
            placeholder="Search articles..."
            className="w-full pl-12 pr-6 py-3 rounded-full shadow-lg/10 focus:outline-none text-xs border border-gray-200"
            style={{ fontFamily: "Sofia Pro" }}
        />
        <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-[#6B7280] w-4 h-4 pointer-events-none " />
    </div>
);

const BlogCard = () => (
    <div className="flex flex-col md:flex-row items-center lg:items-start  bg-white rounded-3xl shadow-[0px_0px_25px_-1px_#00000026] w-full max-w-[98%] mx-auto p-6 gap-6 md:gap-10 mb-5">
        {/* Left: Blog Image or Graphic */}
        <div className="flex-shrink-0 w-full md:w-[230px] md:h-[300px] rounded-2xl  bg-[#F5F5F5] flex items-center justify-center">
            <img src={EYNBlog} alt="Blog Feature" className="w-full h-full  object-cover md:object-contain rounded-2xl  " />
        </div>
        {/* Right: Blog Info */}
        <div className="flex-1 flex flex-col h-[280px] justify-between w-full lg:max-w-[50%]">
            <div>
                <h2 className="text-2xl md:text-2xl font-semibold mb-2" style={{ fontFamily: "Sofia Pro" }}>
                    Everything You Need to Know About HIV Testing in India
                </h2>
                <p className="text-[#6B7280] text-sm mb-6 font-light">
                    A comprehensive guide to HIV testing options, locations, and what to expect during the process.
                </p>
            </div>
            <div className="flex flex-row items-end ">
                <button
                    className="flex items-center justify-between shadow-lg hover:shadow-lg/30 pr-1.5 pt-1.5 pb-1.5 pl-4 border border-[#566AFF] 
            bg-[linear-gradient(to_bottom,_#323FF7_0%,_#323FF7_20%,_#33AEE5_100%)] 
            text-white rounded-full cursor-pointer w-full max-w-[190px] font-light text-sm"
                >
                    Read Article
                    <span className="flex items-center justify-center w-6 h-6 rounded-full bg-white text-black text-lg">
                        <ArrowRight width={17} />
                    </span>
                </button>
            </div>
        </div>
    </div>
);

const Blogs = () => {
    const blogs = [
        {
            image: PPSBlog, // Replace with actual image path
            alt: 'Party and Play can be risky!',
            headline: 'Party and Play Safely This Holiday Season!',
            snippet: 'Essential tips for staying safe during holiday celebrations and social gatherings.',
            ctaLink: '/blog/party-and-play-safely',
        },
        // Add more blog objects as needed
    ];
    return (
        <div className="container w-full mx-auto flex items-center px-4 md:mb-8 sm:px-4 lg:px-10 xl:px-0 mt-9 2xl:ml-0">
            <main
                className="container max-w-[1200px] flex flex-col mx-auto lg:max-w-[850px] xl:max-w-[1050px] gap-7  md:mt-8 "
                style={{ fontFamily: "Sofia Pro", fontWeight: 400 }}
            >
                <div>
                    <h2 className="text-3xl lg:text-4xl xl:text-[40px]  md:mb-0">
                        Blogs
                    </h2>
                </div>
                <div className=' w-full max-w-[98%] md:mt-8'>
                    <BlogSearchBar />
                    <BlogCard />
                    <div>
                        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 p-4">
                            {blogs.map((blog, idx) => (
                                <BlogCards key={idx} {...blog} />
                            ))}
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}

export default Blogs