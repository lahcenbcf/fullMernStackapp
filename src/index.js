import React, { useEffect, useState } from "react";
import {createRoot} from 'react-dom/client'
import Axios from "axios";
import {AiOutlineLogin} from 'react-icons/ai'
import {BsPhone} from 'react-icons/bs'
import {MdPriceCheck,MdOutlineProductionQuantityLimits} from 'react-icons/md'

const Form=({authData,checkIsAdmin,setCheckIsAdmin})=>{
    const [data,setData]=useState({name:"",price:'',qty:0})
    const captPrice=(e)=>{
        
        setData({...data,price:e.target.value})
    }
    const captQty=(e)=>{
       
        setData({...data,qty:e.target.value})
    }
    const submit=(e)=>{
        e.preventDefault()
        Axios.post('/mobiles/create',{...data}).then(()=>console.log('success'))
    }
    useEffect(()=>{
        if(authData.username==='admin' && authData.pass==='admin'){
            setCheckIsAdmin(true)
        }
    })
    return (
        <>
        <form className="container mx-auto border rounded border-green-400 p-4 flex flex-col gap-y-3 my-4">
            <div className="flex items-center gap-x-3"><BsPhone size={20} /> <label for="name" className="font-bold text-md text-start">Phone : </label></div>
                <input type='text' id='name' onChange={(e)=>{
                   setData({name:e.target.value})
                }} className='bg-white w-full p-2 border-emerald-500 border outline-none'></input>
            
            <div className="flex items-center gap-x-3"><MdPriceCheck size={20} /> <label for="name" className="font-bold text-md text-start">Price : </label></div>
                <input type='text' id='price' onChange={captPrice} className='bg-white w-full p-2 border-emerald-500 border outline-none'></input>
            
                <div className="flex items-center gap-x-3"><MdOutlineProductionQuantityLimits size={20} /> <label for="name" className="font-bold text-md text-start">Quantity : </label></div>
                <input type='number' id='qty' onChange={captQty} className='bg-white w-full p-2 border-emerald-500 border outline-none'></input>
            
            <button className="p-2 text-start bg-emerald-500 text-white" onClick={submit} disabled={!checkIsAdmin}>
                Create
            </button>
        </form>
        </>
    )
}

const RenderMobs=({authData,checkIsAdmin,setCheckIsAdmin})=>{
    
    const [mobs,setMobs]=useState([])
    const [editData,setEditData]=useState({name:"",price:"",qty:""})
    const [isEditing,setIsEditing]=useState(false)
    useEffect(()=>{
        const fetch=async ()=>{
       const data=await Axios.get('/mobiles').then((res)=>
             setMobs(res.data))
            }

            fetch()
      
    },[])
    const captName=(e)=>{
        e.preventDefault()
        setEditData({...editData,name:e.target.value})
    }
    const captPrice=(e)=>{
        e.preventDefault()
        setEditData({...editData,price:e.target.value})
    }
    const captQty=(e)=>{
        e.preventDefault()
        setEditData({...editData,qty:e.target.value})
    }
    const EditMobile=(e)=>{
        e.preventDefault()
        setIsEditing(true)
        }
     useEffect(()=>{
        if(authData.username==='admin' && authData.pass==='admin'){
            setCheckIsAdmin(true)
        }
     })
    return(
        <div className="container mx-auto p-3 grid grid-cols-2 md:grid-cols-4 gap-y-3">
            {
                mobs.map(mobile=><div className="relative border border-slate-500 rounded-sm p-3 h-auto w-[240px] shadow flex flex-col gap-y-4">
                    {!isEditing ? <div className="flex gap-1 items-center"><h5 className="text-start font-semibold text-slate-500 ">phone : </h5> <span className="text-sm text-black">{mobile.name}</span></div> : <input placeholder={mobile.name} className="p-1 bg-white outline-none border border-blue-500" type='text' onChange={captName}/> }
                    
                    {!isEditing ? <div className="flex gap-1 items-center"><h5 className="text-start font-semibold text-slate-500 ">price : </h5> <span className="text-sm text-black">{mobile.price}</span></div> : <input placeholder={mobile.price} className="p-1 bg-white outline-none border border-blue-500" type='text' onChange={captPrice}/> }
                    
                    {!isEditing ? <div className="flex gap-1 items-center"><h5 className="text-start font-semibold text-slate-500 ">stock : </h5> <span className="text-sm text-black">{mobile.qty}</span></div> : <input placeholder={mobile.qty} className="p-1 bg-white outline-none border border-blue-500" type='number' onChange={captQty}/> }
                    <div className="flex items-center justify-start gap-2">
                        <button className="p-1 rounded-sm bg-green-600 text-white" onClick={
                            !isEditing ? EditMobile : function saveMobile(event){
                                event.preventDefault()
                                setIsEditing(false)
                                Axios.post('/mobiles/edit',
                                    {...editData,_id:mobile._id}
                                ).then(()=>console.log('is sent successufuly'))
                            }
                            
                        } disabled={!checkIsAdmin}>{isEditing ? "save" : "edit"
                        }</button>
                        <button className="p-1 rounded-sm bg-red-700 text-white" onClick={(event)=>{
                            event.preventDefault()
                            Axios.delete(`/mobiles/delete:${mobile._id}`)
                        }} disabled={!checkIsAdmin}>Delete</button>
                    </div>
                    </div>)
            }
        </div>
    )
}

const Register=({setIslogin,getData})=>{
    const [logindata,setLogindata]=useState({username:"",pass:''})
    const getUsername=(e)=>{
setLogindata({...logindata,username:e.target.value})
    }
    const getPassword=(e)=>{
        setLogindata({...logindata,pass:e.target.value})
    }

    const connectTo=(e)=>{
        e.preventDefault()
        getData(logindata)
        Axios.post('/admin',{...logindata}).then(()=>console.log('succeed'))
        setIslogin(true)
    }
    return(
        <form className="h-[450px] w-[300px] p-3 border border-emerald-600 rounded-md my-5 shadow flex flex-col mx-auto">
            <AiOutlineLogin size={150} className="mx-auto text-emerald-400 my-3"/>
            <span className="text-center text-emerald-500 font-bold text-4xl my-3">login</span>
            <label for='username' className="text-slate-700 font-semibold indent-3 mb-1">username</label>
            <input onChange={getUsername} type='text' className="bg-white outline-none border border-slate-400 rounded-sm w-[90%] mx-auto mb-3 p-1"></input>
            <label for='username' className="text-slate-700 font-semibold indent-3 mb-1">password</label>
            <input onChange={getPassword} type='password' className="bg-white outline-none border border-slate-400 rounded-sm w-[90%] mx-auto mb-3 p-1" ></input>
            <button className="p-1 border border-emerald-500 bg-white text-emerald-500 my-4 hover:bg-emerald-500 hover:text-white" onClick={connectTo}>connect</button>
        </form>
    )
}
const App=()=>{
    const [islogin,setIslogin]=useState(false)
    const [AuthData,setAuthData]=useState(null)
    const [checkIsAdmin,setCheckIsAdmin]=useState(false)
    const getData=(data)=>{
        setAuthData(data)
    }
    return(
    <>
    {
        islogin ? <><Form authData={AuthData} checkIsAdmin={checkIsAdmin} setCheckIsAdmin={setCheckIsAdmin} />
        <RenderMobs authData={AuthData} checkIsAdmin={checkIsAdmin} setCheckIsAdmin={setCheckIsAdmin} /></> : <Register getData={getData} setIslogin={setIslogin} />
    }
    </>
    
    
)
}

const root=createRoot(document.getElementById('root'))
    root.render(<App />)