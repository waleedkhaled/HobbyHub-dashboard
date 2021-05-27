import React from 'react'
import { NavLink } from 'react-router-dom'

const itemsCore = [
  {
    name: 'Dashboard',
    link: '/',
  },
  {
    name: 'Manage Hobbies',
    link: '/hobbies',
  },
  {
    name: 'Manage Posts',
    link: '/posts',
  },
  {
    name: 'Manage Users',
    link: '/users',
  },
  {
      name:'Sign Out',
      link:'/auth',
  },
]


export type SidebarNavLinkProps = {
  item: {
    name: string
    link?: string
  }
}

const SidebarNavLink: React.FC<SidebarNavLinkProps> = ({ item }) => {
  const className = `
    block px-4 py-3 pl-12 mb-1
    rounded-xl font-semibold
    text-gray-600
    hover:text-gray-900
    hover:bg-primary-50
    transition
  `

  const activeClassName = `text-primary-500 hover:text-primary-500 bg-primary-50`

  return (
    <div>
      
      {item.link && !item.link.includes('http') && (
        <NavLink
          to={item.link}
          exact={item.link === '/'}
          className={className}
          activeClassName={activeClassName}
        >
          {item.name}
        </NavLink>
      )}
      {item.link && item.link.includes('http') && (
        <a href={item.link} className={className}>
          {item.name}
        </a>
      )}
      {!item.link && <button className={className}>{item.name}</button>}
    </div>
  )
}

const SideNav = () => {
  return (
    <div id="AppSidebarNav" className="px-4 py-4">
      {/* Sidebar Nav Section */}
      <div className="mb-10">
        <div className="text-xs text-center text-gray-500 mb-4">
        </div>
        {itemsCore.map((item) => (
          <SidebarNavLink  item={item}  />
        ))}
      </div>
      <div className="mb-10">
     
      </div>
    </div>
  )
}

export default SideNav