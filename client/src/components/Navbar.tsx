import { Link } from 'react-router-dom'


export default function Navbar() {
  return (
    <div className='bg-gray-900 shadow-sm w-full flex justify-center'>
        <nav className=' bg-transparent  flex items-center min-h-[55px] h-[7vh] md:h-[8vh] lg:h-[10vh] max-w-screen-xl justify-between w-full px-2'>
          <Link to={'/'}>
        <p className="text-white text-2xl">
            Upload
            </p>
            </Link>
            <span className='space-x-4 text-xl text-blue-600'>
              <Link to='/'>Home</Link>
              <Link to={'/folder'}>Folders</Link>
            </span>
        </nav>
    </div>
  )
}