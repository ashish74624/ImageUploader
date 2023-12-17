'use client'
import Carousel from "nuka-carousel"
import { Link} from 'react-router-dom'


export default function Slider() {
  return (
    <Carousel className='bg-blue-500 w-screen h-[90vh] rounded-lg py-[4vh]'>
      <div className="h-[90vh] w-[95vw] rounded-lg mx-8 flex bg-gray-100 overflow-hidden shadow-lg">
        <div className="p-8">
          <h2 className="text-gray-900 text-8xl">Step 1:</h2>
          <h4 className="text-gray-900 text-5xl mt-4">Create an Account</h4>
          <p className="text-gray-900 text-xl mt-4">Add Information such as Name , Email and password and create an account</p>
        </div>
        <div className="relative group">
          <Link to={'/register'} className=" bg-gray-800 absolute -bottom-10 group-hover:bottom-0 w-full h-32 flex justify-center items-center z-10 text-white bg-opacity-0 opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:bg-opacity-50">
            Go To Register Page
          </Link>
          <img className=" h-full w-[750px]" src="/s1.png" alt="" />
        </div>
      </div>
      {/* 2nd slide */}
      <div className="h-[90vh] w-[95vw] rounded-lg mx-8 flex bg-gray-100 overflow-hidden shadow-lg">
        <div className="p-8 w-[55%] ">
          <h2 className="text-gray-900 text-8xl">Step 2:</h2>
          <h4 className="text-gray-900 text-5xl mt-4">Create a Folder</h4>
          <p className="text-gray-900 text-xl mt-4">
            Create a Folder to save all your images, this folder will be essential for the retrival of the images
          </p>
        </div>
        <div className="">
          {/* <img className=" h-[50%] w-[750px]" src="/s2.png" alt="" /> */}
          <img className=" h-full w-[750px]" src="/s3.png" alt="" />
        </div>
      </div>
      <div className="h-[90vh] w-full rounded-lg px-8">
        <img src="https://loremflickr.com/640/360" className="h-[90vh] w-full rounded-lg"/>
      </div>
      <div className="h-[90vh] w-full rounded-lg px-8">
        <img src="https://loremflickr.com/640/360" className="h-[90vh] w-full rounded-lg"/>
      </div>
    </Carousel>
  )
}
