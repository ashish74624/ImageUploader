import Navbar from "./components/Navbar"


function App() {

  return (
    <>
      <Navbar/>
      <section className="w-screen h-screen bg-[#F3F4F7] flex justify-center ">
        <form className="w-[500px] h-max bg-white shadow-md rounded-lg mt-12 p-4" action="">
          <div className="flex flex-col">
            <label className=" text-purple-500 font-semibold" htmlFor="folder">Folder Name</label>
            <input className="bg-gray-300 h-8 rounded-lg pl-2" placeholder="Enter folder Name" type="text" id="folder" />
          </div>
          <button className="bg-purple-400 text-yellow-200 w-full h-10 flex justify-center items-center text-xl rounded-full mt-4" type="submit">Create folder</button>
        </form>
      </section>
    </>
  )
}

export default App
