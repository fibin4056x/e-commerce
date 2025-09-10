import axios from 'axios'
import React, { createContext, useEffect, useState } from 'react'

const Context = createContext()

function Logincontext({ children }) {
  const [user, setuser] = useState(null)
  const [cart, setcart] = useState([])

  useEffect(() => {
    axios.get('http://localhost:3000/user')
      .then((r) => {
        if (Array.isArray(r.data) && r.data.length > 0) {
          setuser(r.data[0])  
        } else {
          setuser(null)
        }
      })
      .catch(() => setuser(null))
  }, [])

  useEffect(() => {
    if (user) {
      axios.get(`http://localhost:3000/cart?userId=${user.id}`)
        .then((res) => setcart(res.data))
        .catch(() => setcart([]))
    }
  }, [user])

  const addtocart = async (product) => {
    if (!user) {
      alert("Please login to add item to cart")
      return
    }

   
    const existingItem = cart.find(item => item.id === product.id)

    if (existingItem) {
     
      const updatedItem = { ...existingItem, quantity: existingItem.quantity + 1 }
      try {
        await axios.put(`http://localhost:3000/cart/${existingItem.id}`, updatedItem)
        setcart(cart.map(item => item.id === product.id ? updatedItem : item))
      } catch (err) {
        console.error(err)
      }
    } else {
     
      const newitem = {
        ...product,
        userId: user.id,
        quantity: 1
      }
      try {
        const res = await axios.post('http://localhost:3000/cart', newitem)
        setcart([...cart, res.data])
      } catch (err) {
        console.error(err)
      }
    }
  }

  const logout = () => {
    setuser(null)
    setcart([])
  }

  return (
    <Context.Provider value={{ user, setuser,setcart, logout, cart, addtocart }}>
      {children}
    </Context.Provider>
  )
}

export default Logincontext
export { Context }
