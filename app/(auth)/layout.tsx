import React,{ReactNode} from 'react'

const Authlayout = ({children}: {children: ReactNode}) => {
  return (
    <div className='w-full h-screen flex justify-center'><div className="auth-layout">{children}</div>
    </div>
    
  )
}

export default Authlayout;