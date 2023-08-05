import  { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import UploadIcon from '../Icons/UploadIcon';
import toast, { Toaster } from 'react-hot-toast';
import convertToBase64 from '../lib/convertToBase64';

const backend = import.meta.env.VITE_BACKEND;

interface DropZoneProps{
    folderName:string
}

const DropZone = ({folderName}:DropZoneProps) => {
  const [images, setImages] = useState<{ name: string; base64: string }[]>([]); // Store objects with name and Base64

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    // Process the dropped images here, convert each image to Base64, and add them to the state.
    for (const file of acceptedFiles) {
      try {
        const base64: string = await convertToBase64(file) as string; // Explicitly type 'base64' as string
        setImages((prevImages) => [...prevImages, { name: file.name,  base64 }]);
      } catch (error) {
        console.error(error);
      }
    }
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    accept: 'image/*' as any,
    onDrop,
    multiple: true,
  });

  const removeImage = (index: number) => {
    setImages((prevImages) => {
      const updatedImages = [...prevImages];
      updatedImages.splice(index, 1);
      return updatedImages;
    });
  };

  const imageUpload=async()=>{
    toast.loading("Uploading...");
    console.log(images)
        try{
            images.forEach(async(img:any)=>{
                const res = await fetch(`${backend}/upload`,{
                    method:'POST',
                    headers:{
                        "Content-Type":"application/json"
                    },
                    body: JSON.stringify({
                      folderName: folderName,
                      imageName: img.name ,
                      image:img.base64,
                    })
                  }
                  )
                  const data = await res.json();
                  if(res.ok){
                    toast.dismiss();
                  //   setFile('')
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
                
            })
          
        }catch(err){
          toast.dismiss();
          setTimeout(()=>{
            toast.error("Error Posting Image");
          },100)
        }
  }

  return (
    <div className='h-screen w-screen overflow-x-hidden overflow-y-scroll pt-24 flex flex-col items-center' >
      <div {...getRootProps({ className: 'dropzone' })}>
        <input {...getInputProps()} />
        <div className='flex flex-col justify-center items-center h-96 w-[85vw] md:w-[70vw] rounded-lg bg-blue-200 border-dashed border-2 border-blue-950' >
            <UploadIcon/>
            <p className='text-base'>Drag and drop some images here</p>
        </div>
      </div>
      <div >
        <div className='w-[85vw] md:w-[70vw] flex justify-center mt-6'>
      <button className=' bg-lime-300 px-3 py-1 md:px-4 md:py-2 rounded-full' onClick={()=>{imageUpload()}}>
          Upload
        </button>
        </div>
        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 w-[85vw] md:w-[70vw]'>
            {images.map((image, index) => (
                <div key={index} className=" w-32 h-32 md:w-40 md:h-40 lg:w-48 lg:h-48 relative my-4">
                <img
                  className="w-32 h-32 md:w-40 md:h-40 lg:w-48 lg:h-48 rounded-lg my-4"
                  src={image.base64}
                  alt={`Image ${index}`}
                />
                <button
                  className="absolute top-2 right-0 px-3 py-1 hover:opacity-100 opacity-50 text-white bg-slate-800 rounded-full"
                  onClick={() => removeImage(index)}
                >
                  X
                </button>
                <p className='w-full h-4 text-lime-500 absolute bottom-0 text-sm text-ellipsis overflow-hidden'>
                    {image.name}
                </p>
              </div>
                
                ))}
        </div>
      </div>
    <Toaster/>
    </div>
  );
};

export default DropZone;
