// ImageUploader.tsx
import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import UploadIcon from '../Icons/UploadIcon';
import toast, { Toaster } from 'react-hot-toast';
import convertToBase64 from '../lib/convertToBase64';

const backend = import.meta.env.VITE_BACKEND;

const DropZone: React.FC = () => {
  const [images, setImages] = useState<File[]>([]);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    // Process the dropped images here, if needed.
    // For now, we'll just add them to the state.
    setImages((prevImages) => [...prevImages, ...acceptedFiles]);
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    accept: 'image/*' as any, // Specify the accepted file types here
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
                      folderName: 'Test',
                      imageName: img.name ,
                      image:img.path,
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
    <section className='h-max w-screen flex justify-center mt-10'>
    <div >
      <div {...getRootProps({ className: 'dropzone' })}>
        <input {...getInputProps()} />
        <div className='flex flex-col justify-center items-center h-96 w-[70vw] rounded-lg bg-blue-200 border-dashed border-2 border-blue-950' >
            <UploadIcon/>
            <p>Drag and drop some images here, or click to select files</p>
        </div>
      </div>
      <div >
      <button className=' bg-lime-300 px-3 py-1 md:px-4 md:py-2 rounded-full' onClick={()=>{imageUpload()}}>
          Upload
        </button>
        <div className='grid grid-cols-5 w-[70vw]'>
            {images.map((image, index) => (
                <div key={index} className="w-48 h-48 relative my-4">
                <img
                  className="w-48 h-48 rounded-lg my-4"
                  src={URL.createObjectURL(image)}
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
    </div>
    <Toaster/>
    </section>
  );
};

export default DropZone;
