import React from 'react'

const StudentLastPerformance = () => {
  return (
    <>
        <div className='flex space-x-2 items-center'>
            <div className=" basis-2/5 h-44">
                <label htmlFor="lastStudentCW">Last ClassWork</label>
                <input type="text" placeholder='Last student classwork' className=' w-full focus:outline-0 rounded-md focus:ring-2 focus:ring-blue-600' />
            </div>
            <div className=" basis-3/5 h-44">
                <label htmlFor="lastStudentCW">Last Test</label>
                <input type="text" placeholder='Last student test' className=' w-full focus:outline-0 rounded-md focus:ring-2 focus:ring-blue-600' />
            </div>
            <div className=" basis-3/5 h-44">
                <label htmlFor="lastStudentCW">Last Exam</label>
                <input type="text" placeholder='Last student exam' className=' w-full focus:outline-0 rounded-md focus:ring-2 focus:ring-blue-600' />
            </div>
        </div>
    </>
  )
}

export default StudentLastPerformance