import { useEffect, useState } from "react"
import { Link } from 'react-router-dom'
import toast, { Toaster } from 'react-hot-toast';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    // DialogTitle,
    DialogTrigger,
    // DialogFooter,
  } from "@/components/ui/dialog"
  

const backend = import.meta.env.VITE_BACKEND;

export default  function Folder({userData}:any) {
    const [folders,setFolders]:any[] = useState([]);
    const [folderName, setFolderName] = useState('');
    // console.log(userData)
    const createFolder=async(event:any)=>{
        event.preventDefault();
    //   toast.loading("Creating Folder...");
      try{
        const res = await fetch(`${backend}/api/doc/${userData.email}/addFolder/`,{
            method:'POST',
            headers:{'Content-Type':'application/json'},
            body : JSON.stringify({
              folderName:folderName
            })
          });
          const data = await res.json();
          if(res.ok){
            // toast.dismiss();
            setTimeout(()=>{
                toast.success(data.msg);
                window.location.reload()
            },100)
          }
          else{
            // toast.dismiss();
            setTimeout(()=>{
                toast.error(data.msg);
            },100)
          }
      }catch{
        // toast.dismiss();
            setTimeout(()=>{
                toast.error("Folder Not Created - Server Down");
            },100)
      }
    }
    useEffect(()=>{
        const getFolders =async () => {
            const res = await fetch(`${backend}/${userData.email}/getFolders`);
            const data:any = await res.json();
            setFolders(data.folderList)
        }
        getFolders();
    },[userData])
    // console.log(folders);
  return (
<div className="w-[50vw] p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700 h-max mt-10">
    <div className="flex items-center justify-between mb-4">
        <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white">Folders</h5>
        <Dialog>
            <DialogTrigger>Add Folder</DialogTrigger>
            <DialogContent>
                <DialogHeader className=" space-y-4">
                {/* <DialogTitle>Add New Folder</DialogTitle> */}
                <DialogDescription>
                <form onSubmit={createFolder} className='w-full h-max space-y-4'>
  <div className="">
    <label htmlFor="folder" className="block mb-2 font-medium text-gray-900 ">Folder Name</label>
    <input type="text" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " onChange={(e) => {
                setFolderName(e.target.value);
              }} required/>
  </div>
  
  <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center ">Create Folder</button>
</form>
                </DialogDescription>
                </DialogHeader>
            </DialogContent>
        </Dialog>

   </div>
   <div className="">
        <ul role="list" className="divide-y divide-gray-200 dark:divide-gray-700">
            {folders.map((folder:any)=>(
                <li className="py-3 sm:py-4" key={folder._id}>
                <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500">
                            
                        </div>
                    </div>
                    <div className="flex-1 min-w-0">
                        <Link to={`/folder/${userData?.email}/${folder.folderName}`}>
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
   <Toaster/>
</div>
  )
}
