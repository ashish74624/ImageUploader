import { Link ,useNavigate } from 'react-router-dom'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"



export default function Navbar({userData}:any) {
  const navigate = useNavigate()
  const f:string= userData?.firstName.charAt(0);
  const l:string = userData?.lastName.charAt(0);

  const logOut=()=>{
    localStorage.removeItem('token');
    navigate('/');
  }
  return (
    <div className='bg-[#F3F4F7] shadow-sm w-full flex justify-center min-h-[55px] h-[7vh] md:h-[8vh] lg:h-[10vh] border-b-2 border-gray-900 font-mono'>
        <nav className=' bg-transparent flex items-center min-h-[55px] h-[7vh] md:h-[8vh] lg:h-[10vh] max-w-screen-xl justify-between w-full px-2'>
          <Link to={'/home'}>
            <p className="text-gray-900 text-2xl md:text-3xl ">
                Image Uploader
            </p>
          </Link>
          {userData && 
            <DropdownMenu>
            <DropdownMenuTrigger className='bg-blue-900 text-white text-lg w-12 h-12 rounded-full'>{f}{l}</DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel onClick={logOut} className=' flex justify-center text-red-600 cursor-pointer'> Log Out </DropdownMenuLabel>
              </DropdownMenuContent>
            </DropdownMenu>
          }
          

        </nav>
    </div>
  )
}