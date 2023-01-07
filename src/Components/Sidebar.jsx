import React from 'react'
import IMG_2437 from '../assets/IMG_2437.png'
const Sidebar = () => {
  return (
    <main>
        {/*Home page Nave-bar components style={{width: 74, height: 30, marginTop: 13}} */}
      <section className='home-sidebar'>
        <article className='sidenav'>
            <a href='https://peppubooks.com'><img src={IMG_2437} className='side-img'/></a>
           <a href='/dashboard'><li>Dashboard</li></a>
           <a href='/invoices'><li>Invoices</li></a>
           <a href='/notifications'><li>Notifications</li></a>
           <a href='/help'><li>Help</li></a>
           <a href='/preferences'><li>Preferences</li></a>
      </article>
      </section>
    </main>
  )
}

export default Sidebar