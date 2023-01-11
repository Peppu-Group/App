import React, { useEffect, useState } from 'react'
import IMG_2437 from '../assets/IMG_2437.png'
import {MdOutlineDashboard} from 'react-icons/md'
import {IoMdNotificationsOutline} from 'react-icons/io'
import {MdOutlineHelpCenter} from 'react-icons/md'
import {FaFileInvoiceDollar} from 'react-icons/fa'
import {RiUserSettingsFill} from 'react-icons/ri'
import axios from 'axios'
const Sidebar = () => {
    function readCookie(name) {
        var nameEQ = name + "=";
        var ca = document.cookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ') c = c.substring(1, c.length);
            if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
        }
        return null;
    }

    const [UserImage, setUserImage] = useState()
    let url = JSON.parse(readCookie('userinfo')).userimg
    
   useEffect(() => {
     axios.get(url).then((response)=>{
        setUserImage(response.data)
     })
   }, [UserImage])
   
      
   
    

    return (
        <main>
            {/*Home page Nave-bar components style={{width: 74, height: 30, marginTop: 13}} */}
            <section className='home-sidebar'>
                <article className='sidenav'>
                    <a href='https://peppubooks.com'><img src={IMG_2437} className='side-img' /></a>
                 <section className='user-info'>
                    <a href='/'><img className='user-image' src={url}/></a>
                    <a href='/'><li className='username'>{JSON.parse(readCookie('userinfo')).username}</li></a>
                 </section>  


                 <section className='icons'>
                       <MdOutlineDashboard className='icon'/>
                    <a href='/'><li className='text'>Dashboard</li></a>
                 </section>  


                 <section className='icons'>
                        <FaFileInvoiceDollar className='icon'/>
                    <a href='/invoices'><li  className='text'>Invoices</li></a>
                 </section>

                 
                 <section className='icons'>
                        <IoMdNotificationsOutline className='icon'/>
                    <a href='/notifications'><li  className='text'>Notifications</li></a>
                 </section>


                 <section className='icons'>
                       <MdOutlineHelpCenter className='icon'/>
                    <a href='/help'><li  className='text'>Help</li></a>
                 </section>
                 <section className='icons'>
                        <RiUserSettingsFill className='icon'/>
                    <a href='/preferences'><li  className='text'>Preferences</li></a>
                 </section>
                </article>
            </section>
        </main>
    )
}

export default Sidebar