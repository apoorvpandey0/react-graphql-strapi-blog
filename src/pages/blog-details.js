import React from 'react'
import { Link, useParams } from 'react-router-dom';
import { useQuery,gql } from '@apollo/client';
import ReactMarkdown from 'react-markdown'
// import useFetch from '../hooks/useFetch';

const GET_BLOG_POST = gql`
query GetBlogs($id:ID!){
    blogPost(id:$id){
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
`

export default function BlogDetails() {
    var params = useParams();
    
    // REST API
    // var { data, error, loading } = useFetch('http://localhost:1337/api/blog-posts/?populate=*' + params.id);

    // GraphQL API
    const {loading,error,data} = useQuery(GET_BLOG_POST,{variables:{id:params.id}});
    
    
    if (loading) return <div>Loading...</div>
    if (error) return <div>Error...</div>
    
    console.log(data);
    var post = data.blogPost.data;
    return (
        <div>
                <div key={post.id} className='blog-card'> 
                    <h1 className='rating'>{post.id}</h1>
                    <h1>{post.attributes.title} </h1>
                    <h6>{post.attributes.createdAt}</h6>
                    <img width="auto" height="400" src={"http://localhost:1337"+post.attributes.image.data.attributes.url} alt="hi" />
                    <ReactMarkdown>{post.attributes.content}</ReactMarkdown>
                </div>
        </div>
    )
}
