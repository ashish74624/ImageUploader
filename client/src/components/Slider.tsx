'use client'
import Carousel from "nuka-carousel"
import { Link} from 'react-router-dom'


export default function Slider() {
  return (
    <Carousel className='bg-blue-500 w-screen h-[90vh] rounded-lg py-[4vh] '>
      <div id="1" className="h-[90vh] w-[90vw] md:w-[95vw] rounded-lg mx-auto lg:mx-8 flex bg-gray-100 overflow-hidden shadow-lg  mb-auto md:mt-auto">
        <div className="p-2 md:p-6 lg:p-8">
          <h2 className="text-gray-900 text-4xl md:text-6xl lg:text-8xl">Step 1:</h2>
          <h4 className="text-gray-900 text-2xl md:text-4xl lg:text-5xl mt-1 leading-7 md:leading-normal lg:mt-4">Create an Account</h4>
          <p className="text-gray-900 text-base md:text-lg lg:text-xl mt-1 leading-5 md:leading-normal lg:mt-4">Add Information such as Name , Email and password and create an account</p>
        </div>
        <div className="relative group bg-[#60A5FA] flex">
          <Link to={'/register'} className=" bg-gray-800 absolute -bottom-10 group-hover:bottom-0 w-full lg:h-32 md:h-24 h-12 flex justify-center items-center z-10 text-white bg-opacity-0 opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:bg-opacity-50">
            Go To Register Page
          </Link>
          <img className=" self-center min-h-[600px] md:max-h-full md:h-full w-[600px] md:w-[750px]" src="/s1.png" alt="" />
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
      {/* 3rd slide */}
      <div className="h-[90vh] w-[95vw] rounded-lg mx-8 flex bg-gray-100 overflow-hidden shadow-lg">
        <div className="p-8 w-[55%] ">
          <h2 className="text-gray-900 text-8xl">Step 3:</h2>
          <h4 className="text-gray-900 text-5xl mt-4">Upload your photos</h4>
          <p className="text-gray-900 text-xl mt-4">
            After creating the folder click the upload icon and Drag n Drop your photos  
          </p>
        </div>
        <div className="">
          {/* <img className=" h-[50%] w-[750px]" src="/s2.png" alt="" /> */}
          <img className=" h-full w-[750px]" src="/s4.png" alt="" />
        </div>
      </div>
      {/* 4th */}
      <div className="h-[90vh] w-[95vw] rounded-lg mx-8 flex bg-gray-100 overflow-hidden shadow-lg">
        <div className="p-8 w-[55%] ">
          <h2 className="text-gray-900 text-8xl">Step 4:</h2>
          <h4 className="text-gray-900 text-5xl mt-4">Click on the Upload button</h4>
          <p className="text-gray-900 text-xl mt-4">
            After clicking on the upload button use the Drag n Drop or just select the files to upload  
          </p>
        </div>
        <div className="">
          {/* <img className=" h-[50%] w-[750px]" src="/s2.png" alt="" /> */}
          <img className=" h-[30%] w-[750px]" src="/s5.png" alt="" />
          <img className=" h-[70%] w-[750px]" src="/s6.png" alt="" />
        </div>
      </div>
    </Carousel>
  )
}
