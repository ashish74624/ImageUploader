import { Link } from "react-router-dom";
import Poster from "../components/Poster";
import Logo from "../Icons/Logo";

export default function Landing() {

  return (
    <>
    <main className="grid grid-cols-1 md:grid-cols-2 font-mono h-screen w-screen overflow-hidden relative">
      <Poster/>
      <section className=" flex flex-col items-center h-screen bg-gradient-to-t md:bg-gradient-to-l from-blue-100 via-blue-300 to-blue-500 relative w-screen md:w-[50vw] justify-center">
        <div className=" w-max h-max mb-20">
        <div className=" text-4xl text-white mb-2">
          <div className=" w-full justify-center flex">
            <Logo/>
          </div>
          Image Uploader
        </div>
        <div className=" space-y-4">
        <h3 className="text-[2rem] font-semibold flex w-full justify-center">Get Started</h3>
        <div className=" flex space-x-2">
          <Link className=" focus:outline-none" to={'/login'}>
            <button className=" bg-blue-600 hover:bg-blue-700 active:bg-blue-800 focus:outline-purple-400 focus:outline-4 text-white w-36 h-12 text-2xl rounded-lg">Login</button>
          </Link>
          <Link className=" focus:outline-none" to={'/register'}>
            <button className=" bg-blue-600 hover:bg-blue-700 active:bg-blue-800 focus:outline-purple-400 focus:outline-4 text-white w-36 h-12 text-2xl rounded-lg">Sign Up</button>
          </Link>
        </div>
        </div>
        </div>
      </section>
      
      <div className=" absolute w-screen bottom-0 flex justify-center items-center h-8 bg-black text-white">
          Created By: <a className=" hover:underline ml-1" href="https://ashish74624.vercel.app" target="_main">Ashish Kumar</a> 
        </div>
    </main>
    </>
  )
}
