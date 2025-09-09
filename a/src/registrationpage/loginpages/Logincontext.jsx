import axios from 'axios'
import React, { createContext, useEffect, useState } from 'react'
const Context = createContext()
function Logincontext({children}) {
 const [user,setuser]=useState('')

    useEffect(()=>{
        axios.get('http://localhost:3000/user').then((r)=>{
       setuser(r.data)
        })
    
    
   

    },[])


    console.log("from Context" + user);
    
         const logout = () => {
    setuser(null)
  };

    
  return (
    <div>
      <Context.Provider value={{user,setuser,logout}}>
        {children}
</Context.Provider>      
    </div>
  )
}

export default Logincontext
export{Context}