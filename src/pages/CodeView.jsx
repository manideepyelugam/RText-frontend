import React, { useEffect, useState } from 'react';
import { useSearchParams } from "react-router-dom";
import {QRCodeSVG} from 'qrcode.react';
import { Button } from '@/components/ui/button';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CodeView = () => {
    const [text, setText] = useState('');
    const [code, setCode] = useState('');
    const [error, setError] = useState('');
    const [searchParams] = useSearchParams();
    const [createdAt,setcreatedAt] = useState('')
    const [deleteBy,setdeleteBy] = useState('')


    const backendUrl = import.meta.env.VITE_BACKENDURL;
    const frontendUrl = import.meta.env.VITE_FRONTENDURL;
    


    useEffect(() => {
        const codeFromQuery = searchParams.get("code");
        if (codeFromQuery) {
            fetch(`${backendUrl}/enter/${codeFromQuery}`)
                .then((res) => res.json())
                .then((data) => {
                    if (data.text) {
                        setText(data.text.text);
                        setCode(data.code);
                        convertTime(data.text.timeStamp);
                    } else {
                        setError("Room not found");
                        toast("Room not found");
                    }
                    
                })
                .catch((err) => setError("Error fetching room details"));
        }


        function convertTime(timeStamp){
            let time = new Date(timeStamp).toLocaleString();
    
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

        // Use http, not https


    }, [searchParams]);

    const joinUrl = `${frontendUrl}/codeview?code=${code}`;

    const copyCode = () => {
        if(text){
            navigator.clipboard.writeText(text)
              .then(()=>{
                toast("Code copied to clipboard")
              })
              .catch((e) => {
                console.error("failed to copy",e)
                toast("Code copied to clipboard")

              })
        }
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className='h-screen flex flex-col items-center justify-center'>
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

            <div className='h-[400px] w-[90%] md:w-[60%] border p-3 border-black'>
                  <p style={{ whiteSpace: 'pre-wrap' }}>{text}</p>
            </div>

            <div className=' h-5 flex justify-between w-[90%] md:w-[60%] mt-4'>
        {code && <QRCodeSVG className='h-20 md:h-24' value={joinUrl} />}
        <Button onClick={copyCode}>Copy Code</Button>

        </div>
        <ToastContainer />

        </div>
    );
};

export default CodeView;

