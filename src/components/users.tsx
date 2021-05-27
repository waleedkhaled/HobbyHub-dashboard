import React, { useEffect, useState } from 'react'
import faker from 'faker'
import Content from './content'
import { instance } from '../services/api_instance'
import apiServices from '../services/api-services'

type UsersProps = {}

const content = faker.lorem.paragraphs(3)
const content2 = faker.lorem.paragraphs(3)
const content3 = faker.lorem.paragraphs(3)


const Users: React.FC<UsersProps> = () => {
  const [search, setSearch] = useState('');
  const [users, setUsers] = useState([]);
  console.log("users here : ", users);

  const fetchUsers = async () => {

    instance.get('users/all').then(
      res => {
        const user = res.data
        setUsers(user)
        console.log("users: ", users)
      }
    )
  }

  useEffect(() => {


    fetchUsers();
  }, []);

  const searchBar = () => {
    return (
      <div className="p-8 w-full">
        <div className="bg-white w-full  flex items-center rounded-full shadow-lg">
          <input className="w-full rounded-l-full  py-4 px-6 text-gray-700 leading-tight focus:outline-none " id="search" type="text" placeholder={"Please enter username"} onChange={event => setSearch(event.target.value)} />

          <div className="p-4">
            <button className="bg-primary-500 text-white rounded-full p-2 hover:bg-primary-600  w-12 h-12 flex items-center justify-center " >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    )

  }

  const ViewPost = (name: any, id: any, image: any, isSuspended: any) => {

    return (
      <div className=" bg-primary-50 w-full flex  overflow-hidden items-center rounded-xl shadow-sm border">
        <div className="p-2  flex items-center space-x-4">
          {(image === null) ?
            <div className='p-3 bg-primary-600 rounded-lg shadow-md'>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 shadow-xl bg-primary-600" fill="none" viewBox="0 0 24 24" stroke=" white">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            :
            <img src={image} className='h-14 w-14 object-fill rounded-md shadow-md' />
          }
        </div>
        <div className="flex-grow p-3">
          <div className="font-semibold text-gray-600 text-shadow">
            {name}
          </div>
        </div>
        { (!isSuspended) ?
          <button className="h-full bg-primary-100 hover:bg-primary-200 shadow-inner"
            onClick={
              () => {
                try {
                  instance.put('/admin/user/suspend', {

                    'username': name
                  })
                    .then(res => {
                      console.log(res);
                      fetchUsers();
                    }
                    ).catch(error => {
                      console.log("catched error ", error);
                    })
                } catch (error) {
                  console.log(error);
                }

              }


            }
          >
            <p className='text-primary-700 font-bold px-2 py-1' >Suspend</p>
          </button>
          :
          <button className="h-full bg-primary-100 hover:bg-primary-200 shadow-inner"
            onClick={
              () => {
                try {
                  instance.put('/admin/user/unsuspend', {
                    'username': name
                  })
                    .then(res => {
                      console.log(res);
                      fetchUsers();
                    }
                    ).catch(error => {
                      console.log("catched error ", error);
                    })
                } catch (error) {
                  console.log(error);
                }

              }
            }
          >
            <p className='text-primary-700 font-bold px-2 py-1' >Unsuspend</p>
          </button>
        }
      </div>
    );
  }

  return (
    <div className="px-14 py-8">
      {searchBar()}
      <div className='grid grid-flow-col sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 grid-flow-row-dense gap-5'>
        {

          users.filter((data: any) => {
            if (search === '') {
              return data;
            }
            else if (data.username.toLowerCase().indexOf(search.toLowerCase()) === 0) {
              return data;
            }
          }).map((user: any) => {

            return ViewPost(user.username, user.id, user.imageUrl, user.suspended);

          })
        }
      </div>
    </div>
  )
}

export default Users