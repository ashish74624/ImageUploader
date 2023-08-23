import {useEffect, useState} from 'react'
import toast, { Toaster } from 'react-hot-toast';
import Folder from './Folder';
import Navbar from '../components/Navbar';
import jwt_decode from "jwt-decode";
import { useNavigate } from 'react-router-dom'


interface tokenType{
  _id:string,email:string,firstName:string,lastName:string
}


const backend = import.meta.env.VITE_BACKEND;

export default function Home() {
    const navigate = useNavigate();
    const [folderName, setFolderName] = useState('');
    const [user,setUser] = useState< tokenType | null>(null)

    async function createFolder(event: any)  {
      event.preventDefault();
      toast.loading("Creating Folder...");
      try{
        const res = await fetch(`${backend}/api/doc/${user?.email}/addFolder/`,{
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
                window.location.reload()
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

    const verify =async(token:any)=>{
      const res = await fetch(`${backend}/api/users/verifyToken`,{
        headers: {
          'x-access-token':token 
        }
      });
      if(!res.ok){
        navigate('/');
        setUser(null);
      }
    }

    useEffect(()=>{
      const token = localStorage.getItem('token');
      if(token){
        const userDecoded = jwt_decode(token) as tokenType; 
        setUser(userDecoded)
      }
      verify(token)
    },[])

  return (
    <>
    <Navbar userData={user}/>
    <main className='h-screen w-screen bg-[#F3F4F7] overflow-hidden'>
      <section className="w-[65vw] mx-auto h-screen flex justify-between ">
      <form onSubmit={createFolder} className='w-[500px] h-max p-4 bg-white shadow-md rounded-md mt-10'>
  <div className="mb-6">
    <label htmlFor="folder" className="block mb-2 text-sm font-medium text-gray-900 ">Your Folder Name</label>
    <input type="text" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " onChange={(e) => {
                setFolderName(e.target.value);
              }} required/>
  </div>
  
  <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center ">Create Folder</button>
</form>
      <Folder userData={user}/>
      </section>
      <Toaster/>
    </main>
    </>
  )
}
