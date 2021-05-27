import React, { memo } from 'react'
import { NavLink } from 'react-router-dom'
// import GitHubButton from 'react-github-btn'
// import BaseLogo from '_common/BaseLogo'
import SidebarNav from './SideNav'

type TheSidebarProps = {}

const TheSidebar: React.FC<TheSidebarProps> = () => {
  return (
    <div className="TheSidebar absolute h-full w-full flex flex-col">

      
      <div className="h-20 flex items-center top-0 px-4 justify-center">

      <div className='px-6 py-1 bg-primary-100 rounded-lg'>
        <p className='text-primary-500 leading-loose font-bold'>
        Hobby Hub
          </p>
          </div>

        <NavLink to="/" className="flex items-center">
          {/* <BaseLogo
            size={30}
            className="ml-10 mr-4 text-primary-500 align-middle"
          />{' '} */}
       
        </NavLink>
      </div>
      <div className="SidebarNavContainer flex-1 overflow-y-auto">
        <SidebarNav />
      </div>
      <div
        className="
          SidebarFooterContainer
          px-4 py-2 text-sm bg-opacity-75 text-center flex justify-around items-center
          h-14
        "
      >
      </div>
    </div>
  )
}

export default memo(TheSidebar)