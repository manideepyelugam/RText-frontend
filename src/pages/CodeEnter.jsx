import React from 'react'
import  { useEffect, useState } from 'react'
import { Button } from "@/components/ui/button"
import { useNavigate ,Link} from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CodeEnter = () => {
    const [inputCode,setinputCode] = useState('')
    const navigate = useNavigate();

    const backendUrl = import.meta.env.VITE_BACKENDURL;

    const submit = async(e) => {
        e.preventDefault()
        const res = await fetch(`${backendUrl}/open`,{
                 method : "POST",
                 headers:{
                    'Content-Type' : 'application/json'
                },
                body:JSON.stringify({code : inputCode})
        })
        const data = await res.json();
        if (data.success) {
            navigate(data.redirectUrl);

        } else {
            toast(data.message || "Room not found");
        }
              

    }
  return (
    <div className='bg-white h-screen flex items-center justify-center'>
       
         <div >
        <form className='flex flex-col items-center'>
            <p className='text-[#202125] font-medium text-small'>What is your sharing code ?</p>
                  <input maxLength={4} className='border w-20 h-10 text-center font-medium text-lg px-1 bg-transparent border-[#202125]  text-[#202125] my-4 rounded ' placeholder='Code' type="text" value={inputCode} onChange={(e) => setinputCode(e.target.value)}/>
                  <div>
                  <Button onClick={submit} className={`bg-transparent mr-2 border-[#202125] border text-[#202125] hover:bg-[#202125] hover:text-white`}>Show Text</Button>
                  <Link to='/codeinput'><Button className={`bg-transparent border-[#202125] border text-[#202125] hover:bg-[#202125] hover:text-white`}>Type and Share now</Button></Link>
                  </div>
              
        </form>

      
           
    </div>
    <ToastContainer />

    </div>
  )
}

export default CodeEnter