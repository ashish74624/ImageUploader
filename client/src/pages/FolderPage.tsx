import { useEffect , useState} from 'react';
import {useParams} from 'react-router-dom'
import toast, { Toaster } from 'react-hot-toast';
import CutIcon from '../Icons/CutIcon';
import { Image } from 'react-bootstrap';
import Delete from '../Icons/Delete';
import DropZone from './DropZone';

const backend = import.meta.env.VITE_BACKEND;
const cloudName = import.meta.env.VITE_CLOUD_NAME

export default function FolderPage() {
  const [visible,setVisible] = useState(false);
  const [folderArray,setFolderArray] = useState([]);

  const param =  useParams(); // This hook returns an object of key-value pairs
  //OR
  //const {folderName } = useParams()
  const folderName = param.folderName;
  useEffect(()=>{
    const getFolderData = async ()=>{
      const res = await fetch(`${backend}/getFolderData/${folderName}`);
      const data = await res.json();
      setFolderArray(data);
      folderArray.sort();
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
    <>
    <main className='h-max min-h-screen pb-10 w-screen bg-[#F3F4F7] flex flex-col items-center'>
      <nav className='flex w-[90vw] md:w-[85vw] lg:w-[70vw] items-center h-20 justify-between px-4  border-b-2 border-gray-600 py-2
      '>
        <h3 className=' font-mono text-xl md:text-3xl'>Folder: {folderName}</h3>
        <span>
        <button className=' bg-lime-300 px-3 py-1 md:px-4 md:py-2 rounded-full' onClick={()=>{setVisible(!visible)}}>
          Upload
        </button>
        <button className='bg-blue-300 px-3 py-1 md:px-4 md:py-2 rounded-full mx-2' onClick={()=>{window.location.reload();}}>
          Refresh
        </button>
        </span>
      </nav>
      <section className='w-[90vw] md:w-[85vw] lg:w-[70vw] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4'>
        {folderArray.map((data:any)=>(
            <div className=' w-64 h-64 bg-[conic-gradient(at_top,_var(--tw-gradient-stops))] from-gray-900 via-gray-100 to-gray-900 rounded-lg overflow-hidden  my-2 relative' key={data._id} >
              <Image className=' object-cover h-80 w-80' src={`https://res.cloudinary.com/${cloudName}/image/upload/v${data.imageCloud.versionName}/${data.imageCloud.generatedName}`} alt='Pic'/>
              <span className=' bg-gray-300/50 w-full h-20 absolute bottom-0 flex justify-center items-center text-blue-800'>
                {data.imageName}
              </span>
              <button onClick={()=>{deleteImage(data._id)}} className='px-2 py-2 bg-red-500 rounded-lg absolute top-0 right-0'>
                <Delete/>
              </button>
            </div>
        ))}
      </section>
      <Toaster/>
    </main>
    { visible &&(
        <section className='fixed top-0 flex justify-center h-screen w-screen bg-gray-950/50 overflow-x-hidden overflow-y-scroll'>
            <div className=''>
              <DropZone folderName={folderName as string}/>
            </div>
            <button className='fixed top-0 right-6 rotate-45' onClick={()=>{setVisible(!visible)}}>
              <CutIcon/>
            </button>
        </section>
      )}
    </>
  )
}
