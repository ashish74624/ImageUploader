'use client'
import Carousel from "nuka-carousel"


export default function Slider() {
  return (
    <Carousel className='bg-blue-500 w-screen h-[90vh] rounded-lg py-[4vh]'>
      <div className="h-[90vh] w-[95vw] rounded-lg mr-10 mx-8 p-8 flex bg-gray-100">
        <div className="">
          <h2 className="text-gray-900 text-8xl">Step 1:</h2>
          <h4 className="text-gray-900 text-5xl mt-2">Create an Account</h4>
          <p className="text-gray-900 text-xl mt-4">Add Information such as Name , Email and password and create an account</p>
        </div>
      </div>
      <div className="h-[90vh] w-full rounded-lg px-8">
        <img src="https://loremflickr.com/640/360" className="h-[90vh] w-full rounded-lg"/>
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
