import { useState, useEffect } from 'react'
import { useLocation } from 'react-router'
import { Search as SearchIcon } from 'lucide-react'
import Blog from '../components/Blog'
import NavigatorCard from '../components/Teams/NavigatorCard'
import api from '../Api/api'

const Search = () => {
  const location = useLocation()

  // State
  const [posts, setPosts] = useState([])
  const [vns, setVns] = useState([])
  const [filteredPosts, setFilteredPosts] = useState([])
  const [filteredVns, setFilteredVns] = useState([])
  const [query, setQuery] = useState('')
  const [postsLoading, setPostsLoading] = useState(false)
  const [vnsLoading, setVnsLoading] = useState(false)

  // Get query param on mount
  useEffect(() => {
    const params = new URLSearchParams(location.search)
    const q = params.get('q') || ''
    setQuery(q)
  }, [location.search])

  // Fetch posts
  const fetchPosts = async () => {
    try {
      setPostsLoading(true)
      const response = await api.get('get_blog')
      if (response.data.status === 'success') {
        setPosts(response.data.data)
        setFilteredPosts(response.data.data)
      }
    } catch (error) {
      console.error('Error fetching posts:', error)
    } finally {
      setPostsLoading(false)
    }
  }

  // Fetch VNs
  const fetchVns = async () => {
    try {
      setVnsLoading(true)
      const response = await api.get('get_vns_list')
      if (response.data.status === 'success') {
        setVns(response.data.data)
        setFilteredVns(response.data.data)
      }
    } catch (error) {
      console.error('Error fetching VNs:', error)
    } finally {
      setVnsLoading(false)
    }
  }

  // Fetch data on mount
  useEffect(() => {
    fetchPosts()
    fetchVns()
  }, [])

  // Filter posts
  useEffect(() => {
    const lower = query.toLowerCase().trim()
    if (!lower) {
      setFilteredPosts(posts)
      setFilteredVns(vns)
    } else {
      setFilteredPosts(
        posts.filter(
          (post) =>
            post.title?.toLowerCase().includes(lower) ||
            post.meta_description?.toLowerCase().includes(lower)
        )
      )
      setFilteredVns(
        vns.filter(
          (vn) =>
            vn.name?.toLowerCase().includes(lower) || vn.state_name?.toLowerCase().includes(lower)
        )
      )
    }
  }, [query, posts, vns])

  return (
    <div className="container w-full mx-auto flex items-center px-4 md:mb-8 sm:px-4 lg:px-10 xl:px-0 mt-9 2xl:ml-0">
      <main
        className="container max-w-[1200px] flex flex-col mx-auto lg:max-w-[850px] xl:max-w-[1050px] gap-7 md:mt-8"
        style={{ fontFamily: 'Sofia Pro', fontWeight: 400 }}
      >
        <h2 className="text-3xl lg:text-4xl xl:text-[2.625rem] md:mb-0">Search</h2>

        {/* Search Input */}
        <div className="relative w-full max-w-3xl mb-8">
          <input
            autoFocus
            placeholder="Search articles or VNs..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full pl-12 pr-6 py-3 rounded-full shadow-lg/10 focus:outline-none text-xs border border-gray-200"
            style={{ fontFamily: 'Sofia Pro' }}
          />
          <SearchIcon className="absolute left-5 top-1/2 -translate-y-1/2 text-[#6B7280] w-4 h-4 pointer-events-none" />
        </div>

        {/* Posts Section */}
        <section>
          <h3 className="text-xl font-semibold mb-4">Articles</h3>
          {postsLoading ? (
            <p>Loading posts...</p>
          ) : filteredPosts.length > 0 ? (
            <div className="grid gap-8">
              {filteredPosts.map((post) => (
                <Blog key={post.id} post={post} />
              ))}
            </div>
          ) : (
            <p>No posts found.</p>
          )}
        </section>

        {/* VNs Section */}
        <section>
          <h3 className="text-xl font-semibold mb-4">VNs</h3>
          {vnsLoading ? (
            <p>Loading VNs...</p>
          ) : filteredVns.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredVns.map((vn) => (
                <NavigatorCard
                  key={vn.id}
                  VnName={vn.name}
                  VnImage={vn.profile_photo}
                  VnStateList={vn.state_list?.slice(0, 2)}
                  VnMobile={vn.mobile}
                />
              ))}
            </div>
          ) : (
            <p>No VNs found.</p>
          )}
        </section>
      </main>
    </div>
  )
}

export default Search
