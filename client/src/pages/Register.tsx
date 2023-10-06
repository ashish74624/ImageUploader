import  { FormEvent } from 'react'
import { useState } from 'react'
import toast , {Toaster}  from 'react-hot-toast'
import { Link ,useNavigate } from 'react-router-dom'
import Logo from '@/Icons/Logo'

const backend = import.meta.env.VITE_BACKEND

export default function Register() {
  
  const [firstName,setFirstName] = useState('')
  const [lastName,setLastName] = useState('')
  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')
  const [isDiabled,setIsDiabled] = useState(false);
  const navigate = useNavigate();

    const handleRegister=async(event : FormEvent)=>{
      event.preventDefault();
      // Check if the email is in a valid format
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(email)) {
        toast.error('Please enter a valid email address.');
        return;
      }
      try{
        setIsDiabled(true)
        const res = await fetch(`${backend}/api/users/register`,{
          method:'POST',
          headers:{
            "Content-Type":"application/json"
          },
          body:JSON.stringify({
            firstName:firstName,
            lastName:lastName,
            email:email,
            password:password
        })});
        const data = await res.json();
        if(res.ok){
          setIsDiabled(false)
          toast.success('User registered');
          navigate('/login');
        }
        else{
          setIsDiabled(false)
          toast.error(data.msg)
        }
      }catch{
        setIsDiabled(false)
        toast.error("Error in registration plz try later")
      } 
    }
    
  return (
    <>
     <main className=' h-screen w-screen overflow-x-hidden overflow-y-scroll font-mono grid grid-cols-2 bg-[#F3F4F7]'>
     <section className="  hidden xl:flex flex-col items-center justify-center h-screen w-[50vw] bg-gradient-to-l from-blue-300 via-blue-400 to-blue-500 pb-20">
        <div className=" text-4xl text-white mb-4">
          <div className=" w-full justify-center flex">
            <Logo/>
          </div>
          <Link to={'/'}>
            Image Uploader
          </Link>
        </div>
        <div className=" space-y-4">
          <h3 className= 'text-gray-800 text-3xl'>Create a New Account</h3>
        </div>
      </section>
        {/* Form */}
        <section className=' h-[80vh] xl:h-screen w-screen xl:w-[50vw] flex flex-col justify-center items-center xl:grid xl:place-content-center bg-[#F3F4F7]'>
        <div className=" block xl:hidden text-4xl text-[#4A5699] mb-4">
          <div className=" w-full justify-center flex">
            <Logo/>
          </div>
          <Link to={'/'}>
            Image Uploader
          </Link>
          <h3 className= 'text-gray-800 text-2xl'>Create a New Account</h3>
        </div>
        
        <div className='bg-white w-80 lg:w-96 h-max py-4 pb-5 lg:pb-8  lg:py-8 rounded-xl px-8 shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px]'>
        
        <form onSubmit={handleRegister}>
              <div className="grid md:grid-cols-2 md:gap-6">
              <div className="relative z-0 w-full mb-3 md:mb-6 group">
                  <input type="text" name="first_name" id="first_name" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-[#71B1D1] peer" placeholder=" " required
                  onChange={(e)=>{setFirstName(e.target.value)}}
                  />
                  <label htmlFor="floating_first_name" className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-[#71B1D1] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">First name</label>
              </div>
              <div className="relative z-0 w-full mb-3 md:mb-6 group">
                  <input type="text" name="floating_last_name" id="floating_last_name" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-[#71B1D1] peer" placeholder=" " required
                  onChange={(e)=>{setLastName(e.target.value)}}
                  />
                  <label htmlFor="floating_last_name" className="peer-focus:font-medium absolute text-sm text-gray-500  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-[#71B1D1] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Last name</label>
              </div>
            </div>
            <div className="relative z-0 w-full mb-3 md:mb-6 group">
                <input type="email" name="floating_email" id="floating_email" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none    focus:outline-none focus:ring-0 focus:border-[#71B1D1] peer" placeholder=" " required
                onChange={(e)=>{setEmail(e.target.value)}}
                />
                <label htmlFor="floating_email" className="peer-focus:font-medium absolute text-sm text-gray-500  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-[#71B1D1]  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Email address</label>
            </div>
            <div className="relative z-0 w-full mb-3 md:mb-6 group">
                <input type="password" name="floating_password" id="floating_password" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-[#71B1D1] peer" placeholder=" " required
                onChange={(e)=>{setPassword(e.target.value)}}
                />
                <label htmlFor="floating_password" className="peer-focus:font-medium absolute text-sm text-gray-500  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-[#71B1D1] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Password</label>
            </div>
            <button 
            disabled={isDiabled}
            type='submit'
            className="text-white bg-blue-500 focus:outline-blue-900 active:bg-blue-900 active:outline-blue-500 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center">
              Submit
            </button>          
        </form>
        <p className='text-black text-xs mt-4'>Already have an account ?<Link to={'/login'}><span className='text-xs text-blue-500 hover:underline pl-1'>Login</span></Link> </p>
        </div>
      </section>
      <Toaster/>
    </main> 
    </>
  )
  }
