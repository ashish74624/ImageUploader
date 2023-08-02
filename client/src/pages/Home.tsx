import {useState} from 'react'
import Navbar from '../components/Navbar';
import toast, { Toaster } from 'react-hot-toast';

const backend = import.meta.env.VITE_BACKEND;

export default function Home() {
    const [folderName, setFolderName] = useState('');

    async function createFolder(event: any)  {
      event.preventDefault();
      toast.loading("Creating Folder...");
      try{
        const res = await fetch(`${backend}/addFolder/`,{
            method:'POST',
            headers:{'Content-Type':'application/json'},
            body : JSON.stringify({
              folderName:folderName
            })
          });
          const data = await res.json();
          if(res.ok){
            toast.dismiss();
            setTimeout(()=>{
                toast.success(data.msg);
            },100)
          }
          else{
            toast.dismiss();
            setTimeout(()=>{
                toast.error(data.msg);
            },100)
          }
      }catch{
        toast.dismiss();
            setTimeout(()=>{
                toast.error("Folder Not Created - Server Down");
            },100)
      }
     
    };
  return (
    <main className='h-screen w-screen overflow-hidden'>
      <Navbar />
      


      <section className="w-screen h-screen bg-[#F3F4F7] flex justify-center ">
      <form onSubmit={createFolder} className='w-[500px] h-max p-4 bg-white shadow-md rounded-md mt-10'>
  <div className="mb-6">
    <label htmlFor="folder" className="block mb-2 text-sm font-medium text-gray-900 ">Your Folder Name</label>
    <input type="text" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " onChange={(e) => {
                setFolderName(e.target.value);
              }} required/>
  </div>
  
  <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center ">Create Folder</button>
</form>
      </section>
      <Toaster/>
    </main>
  )
}
