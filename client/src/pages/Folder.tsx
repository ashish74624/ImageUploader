import { useEffect, useState } from "react"
import { Link } from 'react-router-dom'
import toast, { Toaster } from 'react-hot-toast';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    // DialogFooter,
  } from "@/components/ui/dialog"
import Plus from "@/Icons/Plus";
  

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

    const deleteFolder=async(email:string,id:string,folderName:string)=>{
        try{
            const res = await fetch(`${backend}/api/doc/deleteFolder`,{
                method:"DELETE",
                headers:{'Content-Type': 'application/json'},
                body: JSON.stringify({
                    email:email,
                    id:id,
                    folderName:folderName
                })
            });
            if(res.ok){
                toast.dismiss();
                setTimeout(()=>{
                    toast.success('Deleted Successfully');
                    window.location.reload();
                },100)
            }else{
                toast.dismiss();
                setTimeout(()=>{
                    toast.error(`Error in deleting`); 
                    },50)
                }
        }catch{
            toast.dismiss();
                setTimeout(()=>{
                    toast.error(`Error in deleting`); 
                    },50)
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
  <div className=" w-[90vw] md:w-[80vw] xl:w-[50vw] py-4 px-2 bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700 h-max mt-10">
    <div className="flex items-center justify-between mb-4">
        <h5 className="text-2xl font-bold leading-none text-gray-900 dark:text-white">Your Folders</h5>
        <Dialog>
            <DialogTrigger className=" bg-blue-600 p-[2px] rounded-lg active:bg-blue-800 active:scale-90 transition-all duration-300">
                <Plus/>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader className=" space-y-4">
                {/* <DialogTitle>Add New Folder</DialogTitle> */}
                <DialogDescription>
                <form onSubmit={createFolder} className='w-full h-max space-y-4'>
                    <div className="">
                        <label htmlFor="folder" className="block mb-2 text-lg font-medium text-gray-900 ">Folder Name</label>
                        <input type="text" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " onChange={(e) => {setFolderName(e.target.value)}} required/>
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
                <li key={folder._id} className="flex items-center space-x-4 justify-between w-full ">
                    <Link className=" flex w-full space-x-4 hover:bg-gray-100 bg-none py-3 sm:py-4 px-2 rounded-lg" to={`/folder/${userData?.email}/${folder.folderName}`}>
                        <span className="w-8 h-8 rounded-full bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 px-4"></span>
                        <p className="text-lg w-full font-medium text-gray-900 dark:text-white">
                            {folder.folderName}
                        </p>
                    </Link>
                    <Dialog>
                    <DialogTrigger className="bg-white hover:bg-red-500 hover:text-white transition-all border border-black w-28 h-8 rounded-lg duration-300">Delete</DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                        <DialogTitle>Are you sure absolutely sure?</DialogTitle>
                        <DialogDescription>
                            This action cannot be undone. This will permanently delete your Folder
                            and remove your data from our servers.
                            <div className=" w-full h-max">
                                <button 
                                onClick={()=>{deleteFolder(userData?.email,folder._id,folder.folderName )}} 
                                className=" w-20 h-10 bg-red-500 active:bg-red-800 rounded-lg text-white mt-2">
                                    Delete
                                </button>
                            </div>
                        </DialogDescription>
                        </DialogHeader>
                    </DialogContent>
                    </Dialog>
                </li>
            ))}
        </ul>
   </div>
   <Toaster/>
</div>
  )
}
