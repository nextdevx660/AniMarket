import React from 'react'

export default function RouteLayout({children}) {
  return (
    <div className='p-5 sm:px-10 md:px-36 lg:px-48'>
      {children}
    </div>
  )
}
