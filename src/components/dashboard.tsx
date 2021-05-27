import React, { useEffect, useState } from 'react'
import faker from 'faker'
import Content from './content'
import { instance } from '../services/api_instance'
import Posts from './posts'
import authHeader from '../services/auth-header'

type DashboardProps = {}

const content = faker.lorem.paragraphs(3)
const content2 = faker.lorem.paragraphs(3)
const content3 = faker.lorem.paragraphs(3)


const Dashboard: React.FC<DashboardProps> = () => {
const [usersNumber,setUsersNumber] = useState(10);
const [postsNumber,setPostsNumber] = useState(12);
const [hobbiesNumber,setHobbiesNumber] = useState(5);
const [isLoading, setIsLoading] = useState(true);






useEffect(() => {

    const fetchAnalytics= async ()=>{
       
        
        instance.get('/analytics/posts-number').then(
          res=>{
            setPostsNumber(res.data);
            
          }
        )

        instance.get('/analytics/users-number').then(
            res=>{
              setUsersNumber(res.data);
              
            }
          )

          
          instance.get('/analytics/hobbies-number').then(
            res=>{
              setHobbiesNumber(res.data);
              
             
            }
          )
  
        
       }

       fetchAnalytics().then(()=>{
        
       
        
        console.log(postsNumber)
        if(authHeader())
         setIsLoading(false);
       })
    },[]);


 const DashboardItem = (title:string, number:number, svg:any)=>{
   return(
    <div className="mt-5">
    <div className="">
        <div className="w-full px-2 sm:w-full xl:w-full">
            <div className="flex items-center px-5 py-6 shadow-md rounded-lg bg-primary-50 ">
                <div className="p-3 rounded-full bg-primary-600 bg-opacity-75">
                   {svg}
                </div>

                <div className="mx-5">
                    <h4 className="text-2xl font-semibold text-gray-700">{number}</h4>
                    <div className="text-gray-500">{title}</div>
                </div>
            </div>
        </div>
</div>
</div>
   )
 }
 if(isLoading){
  console.log("loading is :",isLoading)
   return <div className="flex justify-center text-4xl mt-48 text-primary-500 uppercase text-shadow-md">
    <p>Loading ...</p> 
     </div>
 }
 
else{
  console.log("loading is :",isLoading)
  return (
   
    <div className="px-14 py-8 grid grid-cols-3">


{DashboardItem("users",usersNumber,
 <svg className="h-8 w-8 text-white" viewBox="0 0 28 30" fill="none"
 xmlns="http://www.w3.org/2000/svg">
 <path
     d="M18.2 9.08889C18.2 11.5373 16.3196 13.5222 14 13.5222C11.6804 13.5222 9.79999 11.5373 9.79999 9.08889C9.79999 6.64043 11.6804 4.65556 14 4.65556C16.3196 4.65556 18.2 6.64043 18.2 9.08889Z"
     fill="currentColor"></path>
 <path
     d="M25.2 12.0444C25.2 13.6768 23.9464 15 22.4 15C20.8536 15 19.6 13.6768 19.6 12.0444C19.6 10.4121 20.8536 9.08889 22.4 9.08889C23.9464 9.08889 25.2 10.4121 25.2 12.0444Z"
     fill="currentColor"></path>
 <path
     d="M19.6 22.3889C19.6 19.1243 17.0927 16.4778 14 16.4778C10.9072 16.4778 8.39999 19.1243 8.39999 22.3889V26.8222H19.6V22.3889Z"
     fill="currentColor"></path>
 <path
     d="M8.39999 12.0444C8.39999 13.6768 7.14639 15 5.59999 15C4.05359 15 2.79999 13.6768 2.79999 12.0444C2.79999 10.4121 4.05359 9.08889 5.59999 9.08889C7.14639 9.08889 8.39999 10.4121 8.39999 12.0444Z"
     fill="currentColor"></path>
 <path
     d="M22.4 26.8222V22.3889C22.4 20.8312 22.0195 19.3671 21.351 18.0949C21.6863 18.0039 22.0378 17.9556 22.4 17.9556C24.7197 17.9556 26.6 19.9404 26.6 22.3889V26.8222H22.4Z"
     fill="currentColor"></path>
 <path
     d="M6.64896 18.0949C5.98058 19.3671 5.59999 20.8312 5.59999 22.3889V26.8222H1.39999V22.3889C1.39999 19.9404 3.2804 17.9556 5.59999 17.9556C5.96219 17.9556 6.31367 18.0039 6.64896 18.0949Z"
     fill="currentColor"></path>
</svg>
)}

{DashboardItem("posts",postsNumber,
<svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" viewBox="0 0 20 20" fill="currentColor">
  <path d="M2 5a2 2 0 012-2h7a2 2 0 012 2v4a2 2 0 01-2 2H9l-3 3v-3H4a2 2 0 01-2-2V5z" />
  <path d="M15 7v2a4 4 0 01-4 4H9.828l-1.766 1.767c.28.149.599.233.938.233h2l3 3v-3h2a2 2 0 002-2V9a2 2 0 00-2-2h-1z" />
</svg>
)}

{DashboardItem("hobbies",hobbiesNumber,
<svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" viewBox="0 0 20 20" fill="currentColor">
  <path d="M11 3a1 1 0 10-2 0v1a1 1 0 102 0V3zM15.657 5.757a1 1 0 00-1.414-1.414l-.707.707a1 1 0 001.414 1.414l.707-.707zM18 10a1 1 0 01-1 1h-1a1 1 0 110-2h1a1 1 0 011 1zM5.05 6.464A1 1 0 106.464 5.05l-.707-.707a1 1 0 00-1.414 1.414l.707.707zM5 10a1 1 0 01-1 1H3a1 1 0 110-2h1a1 1 0 011 1zM8 16v-1h4v1a2 2 0 11-4 0zM12 14c.015-.34.208-.646.477-.859a4 4 0 10-4.954 0c.27.213.462.519.476.859h4.002z" />
</svg>
)}
    </div>
  )
}
}

export default Dashboard