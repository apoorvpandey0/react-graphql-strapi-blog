import React from 'react'

import {useQuery,gql} from '@apollo/client'
import { Link } from 'react-router-dom'

const GET_CATEGORIES = gql`
query GetCategories{
    categories{
      data{
        id,
        attributes{
          title
        }
    }
}
}`;

export default function Header() {
    const {loading,error,data} = useQuery(GET_CATEGORIES);
    console.log(data);

    if (loading) return <div>Loading...</div>
    if (error) return <div>Error...</div>
    return (
        <div className='site-header'>
            <Link to="/"><h1>Strapi React GraphQL Blogs</h1></Link>
            <nav className='categories'>
                <span>Filter reviews by category: </span>
                {data.categories.data.map(category =>(
                <Link key={category.id} to={`/category/${category.id}`}>{category.attributes.title}</Link>
            ))}
            </nav>            
        </div>
    )
}
