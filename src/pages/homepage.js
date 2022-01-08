import React from 'react'
import { Link } from 'react-router-dom'
// import useFetch from '../hooks/useFetch'
import {useQuery,gql} from "@apollo/client";
import ReactMarkdown from 'react-markdown' 


const GET_BLOGS = gql`
query GetBlogs{
    blogPosts{
      data{
        id,
        attributes{
                  title,
          excerpt,
          content,
          publishedAt,
                 image{
                  data{
                    id,
                    attributes{
                      url
                    }
                  }
               }
        }
      }
    }
  }
`;



export default function Homepage() {
    // REST API
    // const { data, error, loading } = useFetch('http://localhost:1337/api/blog-posts/?populate=*')

    // GraphQL API
    const {loading,error,data} = useQuery(GET_BLOGS);
    console.log(data);

    if (loading) return <div>Loading...</div>
    if (error) return <div>Error...</div>
    
    return (
        <div>
            {data.blogPosts.data.map(post=>(
                <div key={post.id} className='blog-card'> 
                    <h1 className='rating'>{post.id}</h1>
                    <h1>{post.attributes.title} </h1>
                    <h6>{post.attributes.createdAt}</h6>
                    <img width="auto" height="400" src={"http://localhost:1337"+post.attributes.image.data.attributes.url} alt="hi" />
                    <ReactMarkdown>{post.attributes.content.substring(0,200) +" ..."}</ReactMarkdown>
                    <Link to={`/details/${post.id}`}>Read more</Link>
                </div>
            ))}
        </div>
    )
}
