import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Link } from "react-router-dom";
import SmallLogo from "@/Icons/SmallLogo";
import { ModeToggle } from "@/components/ModeToggle";


export default function HowItWorks() {
  return (
    <div className=" bg-[#F3F4F7] dark:bg-gray-900  h-screen w-screen ">
      <div className='bg-[#F3F4F7] dark:bg-gray-900 shadow-sm w-full flex justify-center min-h-[55px] h-[7vh] md:h-[8vh] lg:h-[10vh] border-b-2 border-gray-900 dark:border-black font-mono'>
        <nav className=' bg-transparent flex items-center min-h-[55px] h-[7vh] md:h-[8vh] lg:h-[10vh] max-w-screen-xl justify-between w-full mx-4 xl:mx-0 xl:px-2'>
          <Link className=' flex space-x-2' to={'/'}>
            <SmallLogo/>
            <p className="text-[#4A5699] dark:text-white text-2xl md:text-3xl ">
                Image Uploader
            </p>
          </Link>
          <div className=' w-max h-12 flex items-center space-x-2'>
          
          <ModeToggle/>
          </div>
        </nav>
    </div>
      <Accordion className=" w-[95vw] md:w-[90vw] lg:w-[80vw] bg-white dark:bg-gray-700 shadow-2xl mt-10 rounded-lg mx-auto" type="single" collapsible>
        <AccordionItem className="px-2" value="item-1">
          <AccordionTrigger >Step 1 : Create an Account</AccordionTrigger>
          <AccordionContent className="text-2xl">
            Add Information such as Name , Email and password and create an account
            <br />
            <Link className="text-blue-500 underline" to={'/register'}>
              <img className="h-72 w-72 mt-2 rounded-lg mx-auto shadow-lg" src="/s1.png" alt="" />
            </Link>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem className="px-2"  value="item-2">
          <AccordionTrigger>Step 2 : Create a Folder</AccordionTrigger>
          <AccordionContent className="text-2xl">
            Create a Folder to save all your images, this folder will be essential for the retrival of the images
            <br />
            <img className=" h-72 rounded-lg shadow-lg mx-auto border-black border mt-2  w-72" src="/s3.png" alt="" />
          </AccordionContent>
        </AccordionItem>
        <AccordionItem className="px-2" value="item-3">
          <AccordionTrigger>Step 3 : Upload your photos</AccordionTrigger>
          <AccordionContent className="text-2xl">
            After creating the folder , go into the folder and click the upload icon and Drag n Drop your photos 
            <br />
            <img className=" h-72 rounded-lg shadow-lg mx-auto border-black border mt-2  w-72" src="/s4.png" alt="" />

          </AccordionContent>
        </AccordionItem>
        <AccordionItem className="px-2" value="item-4">
          <AccordionTrigger>Step 4 : Retrieval of the Images </AccordionTrigger>
          <AccordionContent className="text-2xl">
            After uploading these Images all you have to do is to request this url:-
            https://image-get.vercel.app/your-email/folder-name/image-name/
            and you can use your image in any project or file.  
            <br />
              <img className=" h-72 rounded-lg shadow-lg mx-auto border-black border mt-2  w-72" src="/s7.png" alt="" />

          </AccordionContent>
        </AccordionItem>
      </Accordion>

    </div>
  )
}
