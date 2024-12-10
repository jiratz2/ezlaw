"use client"
import React, {useState} from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

function CreateFolderPage() {
    const [foldername, setFoldername] = useState("");
    const [folderdesc, setFolderdesc] = useState("");

    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if(!foldername){
            alert("Please complete input");
            return;
        }

        try{
            const res = await fetch("http://localhost:3000/api/folders",{
                method: "POST",
                headers:{
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({foldername,folderdesc})
            })

            if(res.ok){
                router.push("/");
            }else{
                throw new Error("Failed to create Folder");
            }

        }catch(error){
            console.log(error)
        }
    }

  return (
    <div className='container mx-auto py-10'>
        <h3 className='text-3xl font-bold'>Create Folder</h3>
        <hr className='my-3'/>
        <Link href="/" className='bg-gray-500 inline-block text-white border py-2 px-3 rounded my-2'>Go Back</Link>
        <form onSubmit={handleSubmit}>
            <input onChange={(e) => setFoldername(e.target.value)} type="text" className='w-[300] block bg-gray-200 py-2 px-3 rounded text-lg my-2' placeholder='folder name' />
            <input onChange={(e) => setFolderdesc(e.target.value)} type="text" className='w-[300] block bg-gray-200 py-2 px-3 rounded text-lg my-2' placeholder='folder description' />
            <button type='submit' className='bg-green-500 text-white border py-2 px-3 rounded text-lg my-2'>Create Folder</button>
        </form>
    </div>
  )
}

export default CreateFolderPage;
