import { Link } from 'react-router-dom'


export default function Navbar() {
  return (
    <div className='bg-[#F3F4F7] shadow-sm w-full flex justify-center min-h-[55px] h-[7vh] md:h-[8vh] lg:h-[10vh] border-b-2 border-gray-900'>
        <nav className=' bg-transparent flex items-center min-h-[55px] h-[7vh] md:h-[8vh] lg:h-[10vh] max-w-screen-xl justify-center w-full px-2'>
          <Link to={'/'}>
            <p className="text-gray-900 text-2xl md:text-3xl font-mono">
                Upload
            </p>
          </Link>
        </nav>
    </div>
  )
}