import { useEffect , useState} from 'react';
import {useParams} from 'react-router-dom'
import toast, { Toaster } from 'react-hot-toast';
import CutIcon from '../Icons/CutIcon';
import { Image } from 'react-bootstrap';
import Delete from '../Icons/Delete';
import DropZone from '../components/DropZone';
import Navbar from '../components/Navbar';
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"
import Upload from '@/Icons/Upload';
import Refresh from '@/Icons/Refresh';


const backend = import.meta.env.VITE_BACKEND;
const cloudName = import.meta.env.VITE_CLOUD_NAME

export default function FolderPage() {
  const [visible,setVisible] = useState(false);
  const [folderArray,setFolderArray] = useState([]);

  const param =  useParams(); // This hook returns an object of key-value pairs
  //OR
  //const {folderName } = useParams()
  const folderName = param.folderName;
  const email = param.email;
  useEffect(()=>{
    const getFolderData = async ()=>{
      const res = await fetch(`${backend}/getFolderData/${email}/${folderName}`);
      const data = await res.json();
      setFolderArray(data);
    }
    getFolderData();
  },[folderName])
  

  const deleteImage =async (id:string) => {
    const res = await fetch(`${backend}/deleteImage/${id}`,{
      method:"DELETE",
      headers:{
        "Content-Type":"application/json"
      }
    });
    const data = await res.json();
    if(res.ok){
      toast.success(data.msg);
      setTimeout(()=>{
        window.location.reload();
      },1000)
    }
  }

  return (
    <main className='dark'>
    <Navbar userData={null}/>
    <section className='h-max min-h-[90vh] pb-10 w-screen bg-[#F3F4F7] flex flex-col items-center dark:bg-gray-900'>
      <div className='flex w-[90vw] md:w-[85vw] lg:w-[70vw] items-center h-20 justify-between px-4  border-b-2 border-gray-600 py-2 dark:bg-gray-900'>
        <h3 className=' font-mono text-xl md:text-3xl dark:text-white'>Folder: {folderName} | {folderArray.length} Images</h3>
        <span>
        <button className=' bg-[#4A5699] px-3 py-1 md:px-4 md:py-2 rounded-lg text-white' onClick={()=>{setVisible(!visible)}}>
          <Upload/>
        </button>
        <button className='bg-[#4A5699] px-3 py-1 md:px-4 md:py-2 rounded-lg text-white mx-2' onClick={()=>{window.location.reload();}}>
          <Refresh/>
        </button>
        </span>
      </div>
      <section className='w-[90vw] md:w-[85vw] lg:w-[70vw] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-y-8 justify-items-center'>
        {folderArray.map((data:any)=>(
            <div className=' w-64 h-64 bg-[conic-gradient(at_top,_var(--tw-gradient-stops))] from-gray-900 via-gray-100 to-gray-900 rounded-t-lg my-2 relative' key={data._id} >
              <Image className='h-64 w-64 rounded-t-lg' src={`https://res.cloudinary.com/${cloudName}/image/upload/v${data.imageCloud.versionName}/${data.imageCloud.generatedName}`} alt='Pic'/>
              <span className=' bg-gray-700 w-full h-10 flex justify-between items-center text-white pb-1 rounded-b-lg px-4 relative'>
                {data.imageName}
                <button onClick={()=>{deleteImage(data._id)}}>
                  <HoverCard>
                    <HoverCardTrigger>
                      <Delete/>
                    </HoverCardTrigger>
                    <HoverCardContent className='px-0 w-36 text-red-500'>
                      Delete this Image
                    </HoverCardContent>
                  </HoverCard>
                </button>
              </span>
            </div>
        ))}
      </section>
      <Toaster/>
    </section>
    { visible &&(
        <section className='fixed top-0 flex justify-center h-screen w-screen bg-gray-950/50 overflow-x-hidden overflow-y-scroll'>
            <div className=''>
              <DropZone folderName={folderName as string} email={email as string}/>
            </div>
            <button className='fixed top-0 right-6 rotate-45' onClick={()=>{setVisible(!visible)}}>
              <CutIcon/>
            </button>
        </section>
      )}
    </main>
  )
}
