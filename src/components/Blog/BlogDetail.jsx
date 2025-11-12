import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router';
import { getBlog } from '../../Api/getBlog';
import { useBlogs } from '../../Context/BlogContext';

const BlogDetail = () => {
    const { blogId } = useParams();
    const { blogs, loading } = useBlogs();
    const [blog, setBlog] = useState([]);
    useEffect(() => {
        if (blogs.length && blogId) {
            const found = blogs.find((post) => String(post.blog_id) === String(blogId));
            setBlog(found)
        }
    }, [blogs, blogId])


    if (!blog) return <div>Blog not found.</div>;


    return (
        <div className='max-w-[850px] mx-auto rounded-3xl bg-white' style={{ fontFamily: "Sofia Pro" }}>
            {loading ? (
                <div className='text-4xl mx-auto text-center'>Loading...</div>
            ) : (
                <div>
                    {/* Bread Crumb */}
                    <nav className='text-base text-[#1475A1] mb-2 '>
                        <Link to={'/'}>Home</Link>/<Link to={'/blog'}>Blogs</Link>
                    </nav>

                    {/* Title */}
                    <div className='text-2xl md:text-3xl  mb-2 text-black font-bold'>{blog.title}</div>

                    {/* Image */}
                    <img
                        src={`${import.meta.env.VITE_API_URL}/storage/blog/${blog.image}`}
                        alt={blog.title}
                        className="w-[70%] mx-auto object-cover rounded-2xl mb-5"
                    />

                    {/* meta Data */}
                    <div className='text-gray-800 text-[1rem] mb-4'>
                        {blog.created_at && (
                            <span>{new Date(blog.created_at).toLocaleDateString('en-In', {
                                year: "numeric",
                                month: "short",
                                day: 'numeric'
                            })}</span>
                        )}
                        <span>&nbsp;|&nbsp; {blog.author_name || 'Netreach Team'}</span>
                    </div>

                    {/* Content */}
                    <div className="text-gray-700 text-base" dangerouslySetInnerHTML={{ __html: blog.description }} />
                </div>
            )}

        </div>
    )
}

export default BlogDetail