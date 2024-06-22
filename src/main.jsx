import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'

import Friends from './components/Friends/Friends.jsx'
import Layout from './Layout.jsx'
import Groups from './components/Groups/Groups.jsx'
import Activities from './components/Activities/Activities.jsx'
import Profile from './components/Profile/Profile.jsx'
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<Layout />}>
      <Route path='' element={<Profile />} />
      <Route path='friends' element={<Friends />} />
      <Route path='activities' element={<Activities />} />
      <Route path='groups' element={<Groups />} />
      
    
    </Route>
  )
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
  
  <RouterProvider router={router} />
  </React.StrictMode>,
)
