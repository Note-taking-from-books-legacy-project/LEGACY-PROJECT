import axios from 'axios';
import { useState, useEffect } from "react";
import "./style.css";
// import styled from "styled-components"
import {IconContext} from "react-icons"
import {FiPlus,FiMinus} from "react-icons/fi"



export default function Display(props){
    const [infos, setInfos] = useState([])  
    const [clicked, setClicked] = useState(false);
    const [update, setUpdate]=useState("")

    useEffect(()=>{
        axios.get("http://localhost:8000/api/books").then(({data})=>{
            setInfos(data)
            console.log(data)  
        })
        
    })

    
    function toggle (index){
        if(clicked===index){
            return setClicked(null)
        }
      setClicked(index)  
    }
    function upDate(id){
        axios.put("http://localhost:8000/api/books/" +id, {note:update}).then(()=>
        {console.log("updated")})
    }


    function del(id){
        axios.delete("http://localhost:8000/api/books/" +id).then(()=>
        {console.log("deleted")})
    }


    return(
        <div className='main'>

    <IconContext.Provider value={{color:"blue", size :"25 px"}}>
    
    < div className ="accordionSection">
    <div className ="container">

        {infos.map((e,index)=>{
            return (
                <>
                <div className="wrap" onClick={()=>toggle(index)} key={index}>
                <h1 key={e._id}> {e.title} {e.author}</h1>
                <span> { clicked===index ? <FiMinus/> :<FiPlus/>}</span>
                </div>
                {clicked === index ? (<div className="dropDown"
                ><p key={e._id}> {e.note} 
                <button className='btn' onClick={()=>{
                    del(e._id)
                    }}> delete</button></p>
                </div>):null}
                
                <button className='btn'
                onClick={()=>{
                    upDate(e._id)
                    }}> Update</button> 

                <input onChange={(e)=> {
                    setUpdate(e.target.value)
                }}>
                </input>
                
                
                </>
             )
            })} 
    </div>

    </div>
    
    
    </IconContext.Provider>
    
    </div>  
    )   
    }
