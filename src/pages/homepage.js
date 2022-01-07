import React from 'react'
import { Link } from 'react-router-dom'
import useFetch from '../hooks/useFetch'

export default function Homepage() {
    const { data, error, loading } = useFetch('http://localhost:1337/api/blog-posts/?populate=*')

    if (loading) return <div>Loading...</div>
    if (error) return <div>Error...</div>
    return (
        <div>
            {data.map(post=>(
                <div key={post.id} className='blog-card'> 
                    <h1 className='rating'>{post.id}</h1>
                    <h1>{post.attributes.title} </h1>
                    <h6>{post.attributes.createdAt}</h6>
                    <img width="auto" height="400" src={"http://localhost:1337"+post.attributes.image.data.attributes.url} alt="hi" />
                    <p>{post.attributes.content.substring(0,200)} ...</p>
                    <Link to={`/details/${post.id}`}>Read more</Link>
                </div>
            ))}
        </div>
    )
}
