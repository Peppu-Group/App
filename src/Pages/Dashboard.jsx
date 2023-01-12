import React from 'react'
import Sidebar from '../Components/Sidebar'
import { FaSearch } from 'react-icons/fa'

const Dashboard = () => {
  
  return (
   

    <body id='dash-board'>
    <main className='dashboard-main'>
  
      <aside  className='aside'>
        <Sidebar/>
      </aside>

    <section>
      <header className='fixed' > 
      <h2>My&nbsp;Workspace</h2>
      <nav className='search'><FaSearch/></nav>
      </header>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut iste in ex dolor, 
        soluta eos modi! Temporibus enim velit officiis! Quam autem odit quas harum vero fugiat 
        tempora explicabo necessitatibus?</p>
    </section>
    
    </main>
    </body>
  )
}

export default Dashboard