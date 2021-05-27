import React, { useEffect, useState } from 'react'
import Modal from 'react-modal';
import faker from 'faker'
import Content from './content'
import { instance } from '../services/api_instance'




const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    width: '28%',
    height: '35%'

  }
};

type DashboardProps = {}

const content = faker.lorem.paragraphs(3)
const content2 = faker.lorem.paragraphs(3)
const content3 = faker.lorem.paragraphs(3)


const Posts: React.FC<DashboardProps> = () => {
  const [search, setSearch] = useState('');
  const [data, setData] = useState([]);
  const [isFetching, setIsFetching] = useState(true);
  let subtitle: any;
  useEffect(() => {

  }, []);

  const fetchData = () => {
    try {

      instance.get('/hobby/' + search)
        .then(response => {

          console.log(response.data);
          setData(response.data);

        })

    } catch (error) {
      throw error
    }
  }

  const searchBar = () => {
    return (
      <div className="p-8 w-full">
        <div className="bg-white w-full  flex items-center rounded-full shadow-lg">
          <input className="w-full rounded-l-full  py-4 px-6 text-gray-700 leading-tight focus:outline-none" id="search" type="text" placeholder={"Please enter Hobby name"} onChange={event => setSearch(event.target.value.toLowerCase())} />

          <div className="p-4">
            <button className="bg-primary-500 text-white rounded-full p-2 hover:bg-primary-600 focus:outline-none w-12 h-12 flex items-center justify-center" onClick={() => {
              fetchData();
            }}>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    )

  }
  const ViewPost = (text: any, categories: any, id: any, index: any, image: any) => {

    console.log("my image: ", image)
    console.log("my index is :", index)
    return (
      <div className="max-w-xs rounded overflow-hidden shadow my-2 self-center rounded-lg bg-white">
        <img className="w-full max-h-56 object-fill shadow-sm" src={image ? image : 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAQMAAADCCAMAAAB6zFdcAAAAMFBMVEX09PTMzMzJycnq6urNzc3x8fHk5OTh4eH29vbt7e3S0tLp6enU1NTd3d3a2trX19c8DpNmAAACj0lEQVR4nO3b3XKDIBCGYUWI60/S+7/bimgxSDtiZtpmfZ+TjkYP+LqIEFJVAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAICLkV+863+Syp2jJgXpPmpTz0z+73r4ZD45DhpSEBlyLTzKtKIgBfdCAj6E4a8b8Dq5G+sL+xQfQv/+dSC9b0dzxtCM073W/XUTXmdDp567tZSpuqkSzPtnICGDan20iR/vDkYwZ1DrySCeOD7oi8IMpuIeboO7cgbS9PPD/n74XnUZyG19LewPloK6DEKDauuPP66ZgcgY35lNcygEbRlUbjNtMI9MBvuJgboMum0GYyaDZkxbqy0DaWIGtt5nMLXXpFMDbRk8zx/TvrC8FvfJWW0ZTJMnGyfEu//4MmomZ7VlsFlLyRd9CEHS04oy8CsJS0OT6bBIE5+W20rQl0ElrTV+NWVMXhO3j8unEDRmIO72eLRd2hGaejtkTKPDeoHCDKpl4SC5oEnXXL+mEzoz2H+8eRbEYlgejJoziMsoIl1aBaESwqeaM4iHXSYBP3KE69RmIM4OTx0+Z+4OWjOQytl17iz5KghDpFObwRzBsoCwHxFiGYR5ltIMfAR2DiE3ImwKwX8noTMDt86bTPN9FSwZ6KwDcf1P7b5ABrJ2hCtn4A62X3EGzhbsxtCZQUkVKM2gLAKVGfiltJIUVGbw8+sAGVwuA3uoS+jO4MJ1MBTuy9OYgSvblzeoXD8o2pUX7lWXwQlKMoh7NIuFOtCwR9OvGNj2dkY7rzYoyOBujD29Z3sqotyWlTcjr+7dT7+efEfSlU0YkwhuBXt7/y9x996e0z80VMFMw89xAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD4JZ9ILiKqS5HIMQAAAABJRU5ErkJggg=='} />

        <div className="px-6 py-4">

          <p className="text-gray-600 text-base font-bold text-shadow truncate">
            {text}
          </p>
          {
            !text && <div className={"h-6"}>

            </div>
          }

        </div>
        <div className="px-6 py-4">
          {categories.map((category: string, index: any) => {
            if (index < 2)
              return <span className="inline-block bg-grey-lighter rounded-full px-3 py-1 text-sm font-semibold text-gray-500 mr-2 text-shadow">#{category}</span>
          })
          }

        </div>
        <div className='flex flex-row justify-evenly '>
          <div className=' w-full text-center  bg-primary-100 hover:bg-primary-200 shadow-md'>
            <button className=' font-bold text-primary-700 p-3 w-full h-full' onClick={() => {
              instance.delete('/admin/post/' + id)
                .then(res => {
                  const posts = data.filter(item => item[id] !== id);
                  setData(posts);
                  fetchData();
                }
                )

            }}>Delete</button>
          </div>
        </div>
      </div>
    );
  }


  return (
    <div className="px-14 py-8">

      {searchBar()}

      <div className='grid grid-flow-col sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 grid-flow-row-dense gap-5'>
        {data.map((post: any, index) => {
          let image;
          console.log("post is", post)
          let obj = post.contentList.find((e: any) => {
            // console.log("entered")
            return e.contentType == "TEXT"
          })


          if (obj && obj.contentType == "TEXT") {
            if (post.contentList[1] != undefined)
              image = post.contentList[1].value;
            return ViewPost(obj.value, post.categories, post.id, index, image)
          }

          if (isFetching == true)
            setIsFetching(false)
        })

        }


      </div>

    </div>
  )
}

export default Posts