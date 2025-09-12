import React from 'react'
import { useParams } from 'react-router-dom'
export default function order() {
  const{id}=useParams()
   console.log(id);

  return (
    <div>
      <form action=""></form>
    </div>
  )
}
