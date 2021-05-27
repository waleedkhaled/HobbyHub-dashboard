import React, { MouseEvent, memo } from 'react'

type TheHeaderProps = {
  onSidebarToggleClick(e: MouseEvent<HTMLButtonElement>): void
}

const TheHeader: React.FC<TheHeaderProps> = ({ onSidebarToggleClick }) => {
  console.log('render The Header')

  return (
    <div
      className="
        TheHeader
        absolute flex w-full h-full items-center px-8
         bg-white 
      "
    >
      <button onClick={onSidebarToggleClick} className="mr-auto lg:hidden text-shadow-sm text-primary-600 text-lg ">
        Toggle Sidbar
      </button>
     
    </div>
  )
}

export default memo(TheHeader)