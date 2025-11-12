import React from 'react';
import { ArrowRight } from "lucide-react";
import { Link } from 'react-router';

// Use realistic image imports or URLs in actual use
const BlogCards = ({
    // image,
    // alt,
    // headline,
    // snippet,
    post,
    ctaText = "Read more",
    // ctaLink = "#"
}) => (
    <div className="rounded-3xl shadow-[0px_0px_25px_-1px_#00000026] bg-white overflow-hidden flex flex-col max-w-xs w-full">
        {/* Blog Image */}
        <div className="h-40 w-full overflow-hidden bg-gray-100">
            {/* <img src={image} alt={alt} className="w-full h-full object-cover" /> */}
            <img src={`${import.meta.env.VITE_API_URL}/storage/blog/${post.image}`} alt={post.title} className="w-full h-full object-cover" />
        </div>
        {/* Card Content */}
        <div className="flex flex-col gap-2 p-5 flex-1">
            {/* <h3 className="font-semibold text-base mb-1">{headline}</h3> */}
            <h3 className="font-semibold text-base mb-1">{post.title}</h3>
            {/* <p className="text-[#6B7280] text-[13px] flex-1 font-light">{post.snippet}</p> */}
            <p className="text-[#6B7280] text-[13px] flex-1 font-light">{post.meta_description}</p>
            <Link
                to={`/blog/${post.blog_id}`}
                className="mt-2 text-[#323FF7] font-medium flex items-center gap-1 transition hover:underline group text-xs"
            >
                {ctaText}
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
            {/* <a
                href={ctaLink}
                className="mt-2 text-[#323FF7] font-medium flex items-center gap-1 transition hover:underline group text-xs"
            >
                {ctaText}
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </a> */}
        </div>
    </div>
);

export default BlogCards;
