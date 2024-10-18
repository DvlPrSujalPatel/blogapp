import React from 'react'
import appwriteService from "../appwrite/config"
import { useState, useEffect } from 'react'
import Container from '../components/container/Container'
import PostCard from "../components/PostCard"

function AllPosts() {
  const [posts, setPosts] = useState([])

  useEffect(() => {
    appwriteService.getPosts([]).then((posts) => {
      if (posts) {
        setPosts(posts.documents)
      }
    })
  }, [])

  return (
    <div className='w-full py-8'>
      <Container>
        {posts.length === 0 ? (
          <div className="w-full text-center py-4">
            <p>No posts available</p>
          </div>
        ) : (
          <div className="flex flex-wrap">
            {posts.map((post) => (
              <div className="p-2 w-1/4" key={post.$id}>
                <PostCard {...post} />
              </div>
            ))}
          </div>
        )}
      </Container>
    </div>
  )
}

export default AllPosts
