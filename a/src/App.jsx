import React from 'react'
import { Route,Routes } from 'react-router-dom'
import Login from './registrationpage/loginpages/login'
import Registration from './registrationpage/Registration'
import { BrowserRouter } from 'react-router-dom'
import Index from './home'
import Men from './home/content/Men'
import Women from './home/content/Women'
import Cart from './home/content/Cart'
import Home from './home/Home'
import Details from './home/content/Details'

function App() {
  return (
    <div>
    <BrowserRouter>
    <Routes>
    <Route path='/' element={<Index/>}>
        <Route index element={<Home />} />
    <Route path='men' element={<Men/>}/>
     <Route path='women' element={<Women/>}/>
    <Route path='cart' element={<Cart/>}/>
    <Route path='product/:id' element={<Details/>}/>
    </Route>
    <Route path='/login' element={<Login/>}/>
    <Route path='registration' element={<Registration/>}/>
    </Routes>
    </BrowserRouter>
    </div>
  )
}

export default App