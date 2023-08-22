import { Link } from "react-router-dom";

export default function Landing() {

  return (
    <>
    <main className="grid grid-cols-2 font-mono h-screen w-screen">
      <section className=" bg-blue-400 text-white text-5xl justify-center items-center flex h-screen">
        Image Uploader
      </section>
      <section className=" flex flex-col justify-center items-center h-screen">
        <div className=" space-y-4">
        <h3 className="text-3xl flex w-full justify-center">Welcome</h3>
        <div className=" flex space-x-2">
          <Link to={'/login'}>
            <button className=" bg-blue-400 text-white px-4 py-2 rounded-lg">Login</button>
          </Link>
          <Link to={'/register'}>
            <button className=" bg-blue-400 text-white px-4 py-2 rounded-lg">Sign Up</button>
          </Link>
        </div>
        </div>
      </section>
    </main>
    </>
  )
}
