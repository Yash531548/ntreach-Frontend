import React, { createContext, useContext, useEffect, useState } from 'react'
import { getBlog } from '../Api/getBlog';

const BlogContext = createContext();

export const BlogProvider = ({children})=>{
    const [blogs, setBlogs] = useState([])
    const [loading , setLoading] = useState(null);

    useEffect(()=>{
        const fetchBlogs = async ()=>{
            setLoading(true);
            try {
                const response = await getBlog();
                setBlogs(response.data.data)
            } catch (error) {
                console.error("Error fetching blogs:", error);
            }finally{
                setLoading(false);
            }
        }
        fetchBlogs();
    },[])
    return (
        <BlogContext.Provider value={{loading, blogs}} >
            {children}
        </BlogContext.Provider>
    )
}

export const useBlogs = ()=> useContext(BlogContext);