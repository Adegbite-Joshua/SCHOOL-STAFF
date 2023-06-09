import React from 'react'

const StudentInfo = ({name, func,  category, mainindex, email, func2}) => {
  return (
    <>
        <div onClick={()=>{func(category, mainindex, email); func2(name)}} className=' w-full p-2 my-1 flex space-x-2 items-center justify-center cursor-pointer bg-white hover:bg-slate-200 rounded-md'>
            <img src="vite.svg" className=' h-12 w-12 float-left' alt="" />
            <h6 contentEditable='false'>{name}</h6>
        </div>
    </>
  )
}

export default StudentInfo