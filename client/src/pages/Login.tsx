import { FormEvent } from 'react'
import { useState } from 'react'
import toast , {Toaster}  from 'react-hot-toast'


export default function Login() {

  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const [isDiabled,setIsDiabled] = useState(false);


  async function handleLogin(event: FormEvent) {

  }  


  return (
    <>
     <main className='bg-[#F3F4F7] h-screen w-screen flex flex-col pt-32 items-center space-y-8 overflow-x-hidden overflow-y-scroll pb-32 font-mono'>
      <h3 className= 'text-gray-800 text-3xl md:text-5xl'>Login | Welcome Back</h3>
        {/* Form */}
      <section className='bg-white w-[350px] md:w-96 h-max py-8 rounded-xl px-8 shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px]  '>
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
            <button disabled={isDiabled} type='submit' className='border-gray-300 text-gray-200 text-sm rounded-lg bg-blue-900 focus:ring-blue-500 focus:border-blue-500  font-medium px-5 py-2.5 text-center'>Submit</button>
        </form>
          <p className="text-black text-xs mt-4">Don&apos;t have an account yet ?<a href={`/register`}><span className="text-xs text-blue-900 hover:underline pl-1">Sign up</span></a> </p>
      </section>
      <Toaster/>
    </main> 
    </>
  )
}
