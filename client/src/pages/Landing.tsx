import { Link } from "react-router-dom";
import Poster from "../components/Poster";
import Logo from "../Icons/Logo";

export default function Landing() {

  return (
    <>
    <main className="grid grid-cols-1 md:grid-cols-2 font-mono h-screen w-screen overflow-hidden relative">
      <Poster/>
      <section className=" flex flex-col items-center h-screen bg-gradient-to-t md:bg-gradient-to-l from-blue-100 via-blue-300 to-blue-500 relative w-screen md:w-[50vw] justify-center">
        <div className=" text-xl text-white mb-4">
          {/* above change back to 4xl */}
          <div className=" w-full justify-center flex">
            <Logo/>
          </div>
          Image Uploader
        </div>
        <div className=" space-y-4">
        <h3 className="text-[2rem] font-semibold flex w-full justify-center">Get Started</h3>
        <div className=" flex space-x-2">
          <Link to={'/login'}>
            <button className=" bg-blue-600 text-white w-36 h-12 text-2xl rounded-lg">Login</button>
          </Link>
          <Link to={'/register'}>
            <button className=" bg-blue-600 text-white w-36 h-12 text-2xl rounded-lg">Sign Up</button>
          </Link>
        </div>
        </div>
      </section>
      
      <div className=" absolute w-screen bottom-0 flex justify-center items-center h-8 bg-black text-white">
          Created By: <a className=" hover:underline" href="https://github.com/ashish74624" target="_main">Ashish Kumar</a> 
        </div>
    </main>
    </>
  )
}
