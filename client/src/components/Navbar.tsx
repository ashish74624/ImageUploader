import { Link ,useNavigate } from 'react-router-dom'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import SmallLogo from '@/Icons/SmallLogo';
import { ModeToggle } from './ModeToggle';



export default function Navbar({userData}:any) {
  const navigate = useNavigate()
  const f:string= userData?.firstName.charAt(0);
  const l:string = userData?.lastName.charAt(0);

  const logOut=()=>{
    localStorage.removeItem('token');
    navigate('/');
  }
  return (
    <div className='bg-[#F3F4F7] dark:bg-gray-900 shadow-sm w-full flex justify-center min-h-[55px] h-[7vh] md:h-[8vh] lg:h-[10vh] border-b-2 border-gray-900 dark:border-black font-mono'>
        <nav className=' bg-transparent flex items-center min-h-[55px] h-[7vh] md:h-[8vh] lg:h-[10vh] max-w-screen-xl justify-between w-full mx-4 xl:mx-0 xl:px-2'>
          <Link className=' flex space-x-2' to={'/home'}>
            <SmallLogo/>
            <p className="text-[#4A5699] dark:text-white text-2xl md:text-3xl ">
                Image Uploader
            </p>
          </Link>
          <div className=' w-max h-12 flex items-center space-x-2'>
          {userData && 
            <DropdownMenu>
            <DropdownMenuTrigger className='bg-[#4A5699] text-white text-lg w-10 h-10 md:w-12 md:h-12 rounded-full'>{f}{l}</DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel onClick={logOut} className=' flex justify-center text-red-600 cursor-pointer'> Log Out </DropdownMenuLabel>
              </DropdownMenuContent>
            </DropdownMenu>
          }
          <ModeToggle/>
          </div>
        </nav>
    </div>
  )
}