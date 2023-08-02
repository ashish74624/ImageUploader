import { useEffect, useState } from "react"
import Navbar from "../components/Navbar";
import { Link } from 'react-router-dom'

const backend = import.meta.env.VITE_BACKEND;

export default  function Folder() {
    const [folders,setFolders]:any[] = useState([]);
    useEffect(()=>{
        const getFolders =async () => {
            const res = await fetch(`${backend}/getFolders`);
            const data:any = await res.json();
            setFolders(data.folderList)
        }
        getFolders();
    },[])
    // console.log(folders);
  return (
    <main className="bg-[#F3F4F7] h-screen w-screen overflow-hidden">
    <Navbar/>
    <section className=" h-screen w-screen flex justify-center">
        
<div className="w-full max-w-md p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700 h-max mt-10">
    <div className="flex items-center justify-between mb-4">
        <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white">Folders</h5>
   </div>
   <div className="flow-root">
        <ul role="list" className="divide-y divide-gray-200 dark:divide-gray-700">
            {folders.map((folder:any)=>(
                <li className="py-3 sm:py-4">
                <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500">
                            
                        </div>
                    </div>
                    <div className="flex-1 min-w-0">
                        <Link to={`folder/${folder.folderName}`}>
                        <p className="text-lg font-medium text-gray-900 truncate dark:text-white">
                            {folder.folderName}
                        </p>
                        </Link>
                    </div>
                </div>
            </li>
            ))}
            
            
        </ul>
   </div>
</div>

    </section>
    </main>
  )
}
