
import React, { useEffect, useState } from 'react'
import faker from 'faker'
import Content from './content'
import axios from 'axios'
import authHeader from '../services/auth-header'
import { instance } from '../services/api_instance'
import CustomDialog from './dialog'

type HobbiesProps = {

}

const HobbyCard = (name: any, id: any, fetchData: any, openEdit: any, closeEdit: any, EditId: any, image: string, description: string) => {

  return (
    <div className="shadow border overflow-hidden rounded-lg">
      <div className="flex items-center space-x-4 p-4 pb-10 bg-primary-50">

        {

          <div className="flex items-center p-4 bg-primary-600 text-white rounded-lg shadow-md">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
            </svg>
          </div>}
        <div className="flex-1">
          <p className="text-gray-600 font-semibold font-bold text-shadow-sm uppercase truncate">{name}</p>
          {/* <p className="text-gray-400 font-semibold font-light text-shadow uppercase m-y-5 overflow-ellipsis max-h-8">{description}</p> */}


          <div className="flex items-baseline space-x-4">
          </div>
        </div>
      </div>
      <div className='flex flex-row w-full shadow-md bg-yellow-500'>

        <button className="w-1/2 p-3 text-lg font-semibold bg-primary-100 text-primary-700 hover:bg-primary-200 cursor-pointer text-center px-11 shadow-md" onClick={() => {
          openEdit("Edit", name, description);
          EditId(id);

        }}>
          Edit
                </button>

        <button className="w-1/2 p-3 text-lg font-semibold bg-primary-100 text-primary-700 hover:bg-primary-200 cursor-pointer text-center px-8 shadow-md"
          onClick={
            () => {
              try {
                instance.delete('/admin/hobby/' + name)
                  .then(res => {
                    console.log(res)
                    fetchData();
                  }
                  ).catch(error => {
                    console.log("catched error ", error)
                  })
              } catch (error) {
                console.log(error)
              }

            }
          }>
          Delete
                </button>
      </div>

    </div>
  )
}

const Hobbies: React.FC<HobbiesProps> = () => {

  const fetchData = () => {
    instance.get('/hobby/all')
      .then(response => {
        setData(response.data)
        console.log("fetched ", data)
      })
  }

  const [search, setSearch] = useState('');
  const [data, setData] = useState([]);
  const [showDialog, setShowDialog] = useState(false);
  const [editedText, setEditedText] = useState('');
  const [editedId, setEditedId] = useState('');
  const [modalTitle, setModalTitle] = useState('Edit')
  const [newName, setNewName] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [editStatus, setEditStatus] = useState(false);
  const [oldName, setOldName] = useState('');
  const [oldDescription, setOldDescription] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const openModal = (title: any, name: any, description: any) => {
    setModalTitle(title);
    setOldName(name);
    setOldDescription(description);
    setShowDialog(true);
  }

  const CloseModal = () => {
    setShowDialog(false);
    fetchData();
  }

  const handleNameCallback = (name: any) => {
    console.log("new name ", name);
    setNewName(name);
    fetchData();
  }

  const handledescriptionCallback = (description: any) => {
    console.log("new description ", description);
    setNewDescription(description);
    fetchData();
  }

  const FAB = () => {
    return (
      <div className="flex fixed bottom-12 w-full  flex ml-36 md:ml-96">
        <button
          className="text-white px-6 w-auto h-12 bg-primary-500 rounded-full hover:bg-primary-700 active:shadow-lg mouse shadow transition ease-in duration-200 focus:outline-none"
          onClick={() => {
            openModal("Add", "", "")

          }}>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 inline-block br-4 mb-1" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
          </svg>
          <span>Add Hobby</span>
        </button>
      </div>

    )
  }


  const searchBar = () => {
    return (
      <div className="p-8 w-full">
        <div className="bg-white w-full  flex items-center rounded-full shadow-lg">
          <input className="w-full rounded-l-full  py-4 px-6 text-gray-700 leading-tight focus:outline-none" id="search" type="text" placeholder={'Please enter Hobby Name'} onChange={event => setSearch(event.target.value)} />

          <div className="p-4">
            <button className="bg-primary-500 text-white rounded-full p-2 hover:bg-primary-600 focus:outline-none w-12 h-12 flex items-center justify-center" onClick={() => {
              instance.get('/' + search)
                .then(response => {
                  const obj = response.data.contentList.find((e: any) => {
                    return e.contentType == "TEXT"
                  })
                  console.log(obj.value);
                })
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
  return (
    <div className="px-14 py-8">
      <div >
        <CustomDialog open={showDialog} closeCallback={CloseModal} nameTextCallback={handleNameCallback} descriptionTextCallback={handledescriptionCallback} title={modalTitle} id={editedId} oldName={oldName} oldDescription={oldDescription} />


        {searchBar()}
        <div className=' grid grid-flow-col sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 grid-flow-row-dense gap-5'>
          {data.filter((data: any) => {
            if (search === '') {
              return data;
            }
            else if (data.name.toLowerCase().indexOf(search.toLowerCase()) === 0) {
              return data;
            }
          }).map((hobby: any) => {
            return HobbyCard(hobby.name, hobby.id, fetchData, openModal, CloseModal, setEditedId, hobby.image, hobby.description)
          })}
        </div>
        <FAB />
      </div>
    </div>
  )
}

export default Hobbies