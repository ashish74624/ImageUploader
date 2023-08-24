import {useEffect, useState} from 'react'
import Folder from './Folder';
import Navbar from '../components/Navbar';
import jwt_decode from "jwt-decode";
import { useNavigate } from 'react-router-dom'


interface tokenType{
  _id:string,email:string,firstName:string,lastName:string
}


const backend = import.meta.env.VITE_BACKEND;

export default function Home() {
    const navigate = useNavigate();
    const [user,setUser] = useState< tokenType | null>(null)

    const verify =async(token:any)=>{
      const res = await fetch(`${backend}/api/users/verifyToken`,{
        headers: {
          'x-access-token':token 
        }
      });
      if(!res.ok){
        navigate('/');
        setUser(null);
      }
    }

    useEffect(()=>{
      const token = localStorage.getItem('token');
      if(token){
        const userDecoded = jwt_decode(token) as tokenType; 
        setUser(userDecoded)
      }
      verify(token)
    },[])

  return (
    <>
    <Navbar userData={user}/>
    <main className='h-screen w-screen bg-[#F3F4F7] overflow-hidden flex justify-center'>
      <Folder userData={user}/>
    </main>
    </>
  )
}
