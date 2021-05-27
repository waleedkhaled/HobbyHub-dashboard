import axios from 'axios';
import useAxios from 'axios-hooks'
import React, { useState } from 'react'


type ContentProps = {
  dataHolder:any,
  searchBar:any,
  data:any,
  }
  

  

const Content: React.FC<ContentProps> = (props) => {
 // const posts = [{id:1, value:"first post"}, {id:2, value:"second post"}, {id:3, value:"third post"}, {id:4, value:"forth post"}, {id:5, value:"fifth post"}]







const {dataHolder} = props;

  return (
    <div className="w-full h-full mx-auto flex flex-col">
      {/* {dataHolder} */}
        {props.searchBar()}
        <div className='   grid grid-flow-col sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 grid-flow-row-dense gap-5'>
    {props.data.map((post:any)=>(
    
      <props.dataHolder />

    ))}
        </div>
    </div>
  )
}

export default Content;
