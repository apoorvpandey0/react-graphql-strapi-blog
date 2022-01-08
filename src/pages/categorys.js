import React from 'react'

import { Link, useParams } from 'react-router-dom';
import { useQuery,gql } from '@apollo/client';
import ReactMarkdown from 'react-markdown'

const GETCATEGORY_POSTS = gql`
query GetCategory($id:ID!){
    category(id:$id){
      data{
        id
        attributes{
          title
          blogs{
            data{
              id
              attributes{
                title
                excerpt
                content
                createdAt
                categories{
                  data{
                    id
                    attributes{
                      title
                    }
                  }
                }
                image{
                  data{
                    attributes{
                      url
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }`;


export default function Categorys() {
    var params = useParams();
    const {loading,error,data} = useQuery(GETCATEGORY_POSTS,{variables:{id:params.id}});
    if (loading) return <div>Loading...</div>
    if (error) return <div>Error...</div>
    console.log(data.category.data.attributes);

    return (
        <div>
            <h2>{data.category.data.attributes.title}</h2>
            {data.category.data.attributes.blogs.data.map(post=>(
                <div key={post.id} className='blog-card'> 
                    <h1 className='rating'>{post.id}</h1>
                    <h1>{post.attributes.title} </h1>
                    <h6>{post.attributes.createdAt}</h6>
                    <img width="100%" src={"http://localhost:1337"+post.attributes.image.data.attributes.url} alt="hi" />
                    <p className = "categories">Categories: {post.attributes.categories.data.map(c=>(
                        <span>
                            <Link to={`/category/${c.id}`}>{c.attributes.title}</Link>
                        </span>
                    ))}</p> 
                    <ReactMarkdown>{post.attributes.content.substring(0,200)}</ReactMarkdown>
                    <Link to={`/details/${post.id}`}>Read more</Link>
                </div>
            ))}
        </div>
    )
}
