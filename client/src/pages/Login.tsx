import { FormEvent } from 'react'
import { useState } from 'react'
import toast , {Toaster}  from 'react-hot-toast'
import { Link, useNavigate } from 'react-router-dom'
import Logo from '@/Icons/Logo'

const backend = import.meta.env.VITE_BACKEND


export default function Login() {

  const navigate = useNavigate();
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const [isDiabled,setIsDiabled] = useState(false);


  async function handleLogin(event: FormEvent) {
    event.preventDefault();
      // Check if the email is in a valid format
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(email)) {
        toast.error('Please enter a valid email address.');
        return;
      }
      try{
        setIsDiabled(true)
        const res = await fetch(`${backend}/api/users/login`,{
          method:'POST',
          headers:{
            "Content-Type":"application/json"
          },
          body:JSON.stringify({
            email:email,
            password:password
        })});
        const data = await res.json();
        if(res.ok){
          localStorage.setItem("token",data.user);
          toast.success('User Logged in');
          navigate('/home')
          setIsDiabled(false)
        }
        else{
          toast.error(data.msg)
          setIsDiabled(false)
        }
      }catch{
        toast.error("Error loggin in plz try later")
        setIsDiabled(false)
      } 
  }  


  return (
    <>
     <main className=' h-screen w-screen overflow-x-hidden overflow-y-scroll font-mono grid grid-cols-2'>
     <section className=" flex flex-col items-center justify-center h-screen w-[50vw] bg-gradient-to-l from-blue-300 via-blue-400 to-blue-500 pb-20">
        <div className=" text-4xl text-white mb-4">
          <div className=" w-full justify-center flex">
            <Logo/>
          </div>
          <Link to={'/'}>
            Image Uploader
          </Link>
        </div>
        <div className=" space-y-4">
          <h3 className= 'text-gray-800 text-3xl'>Login | Welcome Back</h3>
        </div>
      </section>
        {/* Form */}
        <section className=' h-screen w-[50vw] grid place-content-center bg-[#F3F4F7]'>

        
      <div className='bg-white w-[350px] md:w-96 h-max py-8 rounded-xl px-8 shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] justify-self-center mr-20'>
        <form onSubmit={handleLogin}>
          <div className='relative z-0 w-full mb-6 group '>
            <input type='email' name='email' id='email' className='block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-[#71B1D1] peer' placeholder=' ' required
            onChange={(e)=>{setEmail(e.target.value)}}
            />
            <label htmlFor='floating_email' className='peer-focus:font-medium absolute text-sm text-gray-500  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-[#71B1D1] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6'>Email address</label>
          </div>
          <div className='relative z-0 w-full mb-6 group'>
            <input type='password' name='password' id='password' className='block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-[#71B1D1] peer' placeholder=' ' required
            onChange={(e)=>{setPassword(e.target.value)}}
            />
            <label htmlFor='floating_password' className='peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-[#71B1D1] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6'>Password</label>
          </div>
            <button disabled={isDiabled} type='submit' className='border-gray-300 text-gray-200 text-sm rounded-lg bg-blue-500 focus:ring-blue-500 focus:border-blue-500  font-medium px-5 py-2.5 text-center'>Submit</button>
        </form>
          <p className="text-black text-xs mt-4">Don&apos;t have an account yet ?<a href={`/register`}><span className="text-xs text-blue-400 hover:underline pl-1">Sign up</span></a> </p>
      </div>
      </section>
      <Toaster/>
    </main> 
    </>
  )
}
