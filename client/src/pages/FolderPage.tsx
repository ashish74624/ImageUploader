import { useEffect , useState} from 'react';
import {useParams} from 'react-router-dom'
import toast, { Toaster } from 'react-hot-toast';
import CutIcon from '../Icons/CutIcon';
import { Image } from 'react-bootstrap';
import convertToBase64 from '../lib/convertToBase64';
import Delete from '../Icons/Delete';

const backend = import.meta.env.VITE_BACKEND

export default function FolderPage() {
  const [visible,setVisible] = useState(false);
  const [file,setFile] = useState('');
  const [imageName,setImageName] = useState('')
  const [isDiabled,setIsDiabled] = useState(false);
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
    }
    getFolderData();
  },[folderName])
  

  const handleImageSelect = async(event:any) => {
    //Never user blob URL for image upload
    let uploadedImage = event.target.files[0];
    setImageName(uploadedImage.name);
    const base64 = await convertToBase64(uploadedImage);
    setFile(base64 as string);
    };

  const imageUpload=async()=>{
    console.log(file)
    toast.loading("Uploading...");
        setIsDiabled(true);
        try{
          const res = await fetch(`${backend}/upload`,{
          method:'POST',
          headers:{
              "Content-Type":"application/json"
          },
          body: JSON.stringify({
            folderName: folderName,
            imageName: imageName ,
            image:file,
          })
        }
        )
        const data = await res.json();
        if(res.ok){
          toast.dismiss();
          setFile('')
          setTimeout(()=>{
            toast.success(data.msg);
            setIsDiabled(false);
          },100)
        }
        else{
          toast.dismiss();
          setTimeout(()=>{
            toast.error(data.msg);
            setIsDiabled(false);
          },100)
          
        }
      
        }catch(err){
          toast.dismiss();
          setTimeout(()=>{
            toast.error("Error Posting Image");
            setIsDiabled(false);
          },100)
        }
  }

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
    <main className='h-screen w-screen bg-[#F3F4F7] flex flex-col items-center'>
      <nav className='flex w-[90vw] md:w-[85vw] lg:w-[70vw] items-center h-20 justify-between px-4 divide-y-2 divide-gray-600 border-b-2 border-gray-600 py-2
      '>
        <h3 className=' font-mono text-xl md:text-3xl'>Folder: {folderName}</h3>
        <button className=' bg-lime-300 px-3 py-1 md:px-4 md:py-2 rounded-full' onClick={()=>{setVisible(!visible)}}>
          Upload
        </button>
      </nav>
      <section className='w-[90vw] md:w-[85vw] lg:w-[70vw] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-4 space-y-4 md:space-y-0'>
        {folderArray.map((data:any)=>(
            <div className='w-80 h-80 bg-red-400 rounded-lg overflow-hidden relative' key={data._id}>
              <Image className=' object-cover h-80 w-80' src={`https://res.cloudinary.com/dcgjy3xv7/image/upload/v${data.imageCloud.versionName}/${data.imageCloud.generatedName}`} alt='Pic'/>
              <span className=' bg-gray-300/50 w-full h-20 absolute bottom-0 flex justify-center items-center'>
                {data.imageName}
              </span>
              <button onClick={()=>{deleteImage(data._id)}} className='px-2 py-2 bg-red-500 text-white rounded-lg absolute top-0 right-0'>
                <Delete/>
              </button>
            </div>
        ))}
        
      </section>
      <Toaster/>
    </main>
    { visible &&(
        <>
          <section
          className={`mt-0 z-50 fixed top-0 bg-slate-900/40 h-screen w-screen flex flex-col justify-center items-center overflow-x-hidden overflow-y-scroll md:block pb-32`}>
        <article className='w-[310px] h-[410px] md:w-[350px] md:h-[450px] mx-auto my-10'>
          {file?
          (<>
          <div className="bg-white w-[300px] h-[400px] md:w-[340px] md:h-[440px] flex flex-col my-10 mx-auto">
          <div className="relative">
              <button className="px-3 py-1 rounded-full transition hover:bg-black text-white bg-black/50 absolute top-8 right-8"
              onClick={()=>{setFile('');setImageName('')}}
              >X</button>
              <Image src={file} className="flex flex-col items-center justify-center w-[260px] h-[315px] md:w-[300px] mt-[20px] md:h-[350px]  cursor-pointer bg-[#1d1d1f] mx-auto"alt='Hello' width={100} height={100}/>
          </div>
          <div className="bg-white flex-grow flex justify-center items-center text-blue-400 text-lg font-light underline">
            {imageName}
          </div>
      </div>
          </>)
          :
          (<>
          <div className="bg-white w-[300px] h-[400px] md:w-[340px] md:h-[440px] flex flex-col my-10 mx-auto">
          <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-[260px] h-[315px] md:w-[300px] mt-[20px] md:h-[350px]  cursor-pointer bg-[#1d1d1f] mx-auto">
              <div className=" flex flex-col justify-start items-center">
                  <svg className="h-10 w-10 mx-auto text-gray-400 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                  </svg>
                  <p className="mb-2 text-sm text-gray-50 font-semibold">Click to upload</p>
              </div>
              <input id="dropzone-file" type="file" className="hidden" onChange={handleImageSelect} />
          </label>
          <div className="bg-white flex-grow  flex justify-center items-center">
            {imageName}
          </div>
      </div>
          </>)}
      <div className='w-full'>
        <button 
        disabled={isDiabled}
        className='bg-[#F8C732] h-10 w-24 text-xl rounded-full text-gray-200 font-semibold flex items-center justify-center mx-auto '
        onClick={imageUpload}>
          Post 
        </button>
      </div>
    </article>
    <button className='fixed top-[0.5rem] right-4 rotate-45'
    onClick={()=>{setVisible(!visible); toast.dismiss();}}
    ><CutIcon/></button>
  </section>
        </>
      )}
    </>
  )
}
