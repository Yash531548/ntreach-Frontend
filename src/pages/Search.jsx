import { useState, useEffect } from 'react'
import { useLocation } from 'react-router'
import { getBlog } from '../Api/getBlog'
import { Search as SearchIcon } from 'lucide-react'
import Blog from '../components/Blog'

const Search = () => {
  const location = useLocation()

  const [posts, setPosts] = useState([])
  const [query, setQuery] = useState('')
  const [filteredPosts, setFilteredPosts] = useState([])
  const [loading, setLoading] = useState(false)

  // Get query param on mount
  useEffect(() => {
    const params = new URLSearchParams(location.search)
    const q = params.get('q') || ''
    setQuery(q) // Autofill search input
  }, [location.search])

  // Fetch all posts
  const fetchPosts = async () => {
    try {
      setLoading(true)
      const response = await getBlog()
      if (response.data.status === 'success') {
        setPosts(response.data.data)
        setFilteredPosts(response.data.data)
      }
    } catch (error) {
      console.error('Error fetching posts:', error)
    } finally {
      setLoading(false)
    }
  }

  // Run only on first load
  useEffect(() => {
    fetchPosts()
  }, [])

  // Filter posts when query changes
  useEffect(() => {
    if (query.trim() === '') {
      setFilteredPosts(posts)
    } else {
      const lower = query.toLowerCase()
      setFilteredPosts(
        posts.filter(
          (post) =>
            post.title?.toLowerCase().includes(lower) ||
            post.meta_description?.toLowerCase().includes(lower)
        )
      )
    }
  }, [query, posts])

  return (
    <>
      <div className="container w-full mx-auto flex items-center px-4 md:mb-8 sm:px-4 lg:px-10 xl:px-0 mt-9 2xl:ml-0">
        <main
          className="container max-w-[1200px] flex flex-col mx-auto lg:max-w-[850px] xl:max-w-[1050px] gap-7  md:mt-8 "
          style={{ fontFamily: 'Sofia Pro', fontWeight: 400 }}
        >
          <div>
            <h2 className="text-3xl lg:text-4xl xl:text-[2.625rem] md:mb-0">Search</h2>
          </div>

          <div className=" w-full max-w-[98%] md:mt-8">
            {/* Search Input */}
            <div className="relative w-full max-w-3xl mb-8">
              <input
                placeholder="Search articles..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full pl-12 pr-6 py-3 rounded-full shadow-lg/10 focus:outline-none text-xs border border-gray-200"
                style={{ fontFamily: 'Sofia Pro' }}
              />
              <SearchIcon className="absolute left-5 top-1/2 -translate-y-1/2 text-[#6B7280] w-4 h-4 pointer-events-none " />
            </div>

            {/* Loader */}
            {loading && <p>Loading posts...</p>}

            {/* Posts List */}
            {filteredPosts.length > 0 ? (
              <div className="grid gap-8">
                {filteredPosts.map((post, index) => (
                  <Blog key={index} post={post} />
                ))}
              </div>
            ) : (
              !loading && <p>No posts found.</p>
            )}
          </div>
        </main>
      </div>
    </>
  )
}

export default Search
