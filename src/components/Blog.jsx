import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router'
const BASE_URL = import.meta.env.VITE_API_URL

function Blog({ post }) {
  function slugify(text) {
    return text
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '') // Remove non-alphanumeric except space & hyphen
      .replace(/\s+/g, '-') // Replace spaces with hyphens
      .replace(/--+/g, '-'); // Collapse multiple hyphens
  }

  return (
    <>
      <div className="max-w-[98%] mx-auto min-h-64 flex flex-row gap-10 p-6 mb-5 rounded-3xl shadow-[0px_0px_25px_-1px_#00000026]">
        {/* Left: Blog Image or Graphic */}
        <div className="flex-shrink-0 w-[230px] rounded-2xl">
          {post.image && (
            <img
              src={`${BASE_URL}/storage/blog/${post.image}`}
              alt=""
              className="w-full h-full object-contain rounded-2xl"
            />
          )}
        </div>

        {/* Right: Blog Info */}
        <div className="flex-1 flex flex-col">
          <h2 className="text-2xl font-semibold mb-2" style={{ fontFamily: 'Sofia Pro' }}>
            {post.title}
          </h2>
          <p
            className="text-[#6B7280] text-sm font-light line-clamp-4 mb-6"
            dangerouslySetInnerHTML={{ __html: post.meta_description }}
          ></p>

          <div className="flex mt-auto">
            <Link to={`/blog/${post.blog_id}/${slugify(post.title)}`}>
              <button
                className="flex items-center justify-between shadow-lg hover:shadow-lg/30 pr-1.5 pt-1.5 pb-1.5 pl-4 border border-[#566AFF] 
              bg-[linear-gradient(to_bottom,_#323FF7_0%,_#323FF7_20%,_#33AEE5_100%)] 
              text-white rounded-full cursor-pointer w-[190px] font-light text-sm"
              >
                Read Article
                <span className="text-black bg-white flex items-center justify-center w-6 h-6 rounded-full">
                  <ArrowRight width={17} />
                </span>
              </button>
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}

export default Blog
