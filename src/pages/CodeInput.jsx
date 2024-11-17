import React, { useEffect, useState } from 'react'
import { Button } from "@/components/ui/button"
import {QRCodeSVG} from 'qrcode.react';  
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CodeInput = () => {
    const [textarea,setTextarea] = useState('');
    const [code,setcode] = useState('');
    const [createdAt,setcreatedAt] = useState('')
    const [deleteBy,setdeleteBy] = useState('')

    const backendUrl = import.meta.env.VITE_BACKENDURL;
    const frontendUrl = import.meta.env.VITE_FRONTENDURL;

    const submit = async (e) => {
        e.preventDefault();
      const res =   await fetch(`${backendUrl}/submit`,{
            method:'POST',
            headers : {
                'Content-Type' : 'application/json'
            },
            body:JSON.stringify({text : textarea})
        })  
        const data = await res.json();

        
        setcode(data.code)
        let time = new Date(data.timeStamp).toLocaleString();

        let [hour,minute,second] = time.split(',')[1].split(":").map(Number)
        
        minute += 15;
         
        if(minute >= 60){
          hour += Math.floor(minute / 60);
          minute = minute % 60;
        }
        if (hour >= 24) {
          hour = hour % 24;
      }

        const formattedTime = [
          String(hour).padStart(2, '0'),
          String(minute).padStart(2, '0'),
          String(second).padStart(2, '0'),
      ].join(':');
  

        setcreatedAt(time.split(',')[1])
        setdeleteBy(formattedTime)
        
    }

    const joinUrl = `${frontendUrl}/codeview?code=${code}`; // Use http, not https



  return (

    <div className='h-screen flex flex-col items-center justify-center w-full md:px-10 px-2'>

      <div className='w-[90%] md:w-[60%] flex justify-between flex-col lg:flex-row'>
        <div>
        {code && <h1 className='text-xl mb-4 text-border font-semibold flex text-black'><span className='font-normal text-black'>Sharing Code: </span><p className='text-black ml-1'> {code}</p></h1>}
        </div>
         
{
  code &&    <div className='flex justify-between  mb-3'>
  <div className='mr-8'>
    <p>Created At: <span>{createdAt}</span></p>
  </div>

  <div>
    <p>Expired By: <span>{deleteBy}</span></p>
  </div>

</div>
}
        
      </div>
        <form className='flex flex-col items-center w-full'>
                  <textarea placeholder='You can type here' className='p-3 outline-none border h-64 w-[90%] md:w-[60%] border-black' type="text" value={textarea} onChange={(e) => setTextarea(e.target.value)}/>
        </form>

        <div className=' h-5 flex justify-between w-[90%] md:w-[60%] mt-4'>
        <Button  onClick={submit} className={' items-start'}>Share text</Button>
        {code && <QRCodeSVG className='h-20 md:h-24' value={joinUrl} />}
        </div>

       
        <ToastContainer />

    </div>
  )
}

export default CodeInput 