import React from 'react'
import { Link } from 'react-router-dom'
import useFetch from '../hooks/useFetch'

export default function Homepage() {
    const { data, error, loading } = useFetch('http://localhost:1337/api/blog-posts')

    if (loading) return <div>Loading...</div>
    if (error) return <div>Error...</div>
    return (
        <div>
            {data.map(post=>(
                <div key={post.id} className='blog-card'> 
                    <h1>{post.attributes.title} </h1>
                    <h6>{post.attributes.createdAt}</h6>
                    <img src={post.attributes.image} alt="" srcset="" />
                    <p>{post.attributes.content}</p>
                    <Link to={`/details/${post.id}`}>Read more</Link>

                </div>
            ))}
        </div>
    )
}
