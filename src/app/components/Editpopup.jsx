"use client"
import React,{useState, useEffect} from "react";

export default function Editpopup({ folder, onClose, onSave, params }) {

    const { id } = params;

    const [foldername, setFoldername] = useState("");
    const [folderdesc, setFolderdesc] = useState("");

    const getFolderById = async (id) =>{
        try{
            const res = await fetch(`http://localhost:3000/api/folders/${id}`,{
                method: "GET",
                cache: "no-store"
            })

            if(!res.ok){
                throw new Error("Failed to fetch a folder");
            }
            const data = await res.json();
            console.log("edit folder: ",data);
            setFolderData(data.folder);

        }catch(error){
            console.log(error);
        }
    }

    useEffect(() =>{
        getFolderById(id);
    },[]);
    
    const handleSave = async (e) =>{
        e.preventDefault();
        try{
            const res = await fetch(`http://localhost:3000/api/folders/${id}`,{
                method: "PUT",
                headers:{
                    "Content-Type" : "application/json",
                },
                body: JSON.stringify({foldername,folderdesc}),
            });

            if(res.ok){
                const updatedFolder = await res.json();
                onSave(updatedFolder);
            }else{
                throw new Error("Failed to update folder");
            }
        }catch(error){
            console.log("Error updating folder: ",error);
        }
    };

    return(
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-5 rounded-lg w-1/3">
                <h2 className="text-2xl mb-4">Edit Folder</h2>
                <input type="text" value={foldername} onChange={(e) => setFoldername(e.target.value)} className="block w-full mb-3 p-2 border rounded-md" placeholder="Folder Name" />
                <input type="text" value={folderdesc} onChange={(e) => setFolderdesc(e.target.value)} className="block w-full mb-3 p-2 border rounded-md" placeholder="Folder Description"></input>
                <div className="flex justify-end gap-3">
                    <button onClick={onClose} className="bg-red-500 text-white py-2 px-4 rounded-md">Cancel</button>
                    <button onClick={handleSave} className="bg-blue-500 text-white py-2 px-4 rounded-md">Save</button>
                </div>
            </div>
        </div>

    );
}