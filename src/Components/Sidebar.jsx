import React from 'react'
import IMG_2437 from '../assets/IMG_2437.png'
import {RiDashboardFill} from 'react-icons/ri'
import {IoMdNotificationsOutline} from 'react-icons/io'
import {MdOutlineHelpCenter} from 'react-icons/md'
import {FaFileInvoiceDollar} from 'react-icons/fa'
import {GrUserSettings} from 'react-icons/gr'
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
    let url = JSON.parse(readCookie('userinfo')).userimg
    let user_img = fetch(url)
        .then(res => { return res.blob() })
        .then(blob => {
            var img = URL.createObjectURL(blob);
            return img
        })

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
                    <section className='dash-icon'>
                       <RiDashboardFill />
                    </section>
                    <a href='/'><li>Dashboard</li></a>
                 </section>  
                 <section className='icons'>
                    <section className='invoice-icon'>
                        <FaFileInvoiceDollar/>
                    </section>
                    <a href='/invoices'><li>Invoices</li></a>
                 </section>
                 <section className='icons'>
                    <section className='icon'>
                        <IoMdNotificationsOutline/>
                    </section>
                    <a href='/notifications'><li className='notification'>Notifications</li></a>
                 </section>
                 <section className='icons'>
                    <section className='help-icon'>
                       <MdOutlineHelpCenter />
                    </section>
                    <a href='/help'><li>Help</li></a>
                 </section>
                 <section className='icons'>
                    <section className='pref-icon'>
                        <GrUserSettings />
                    </section>  
                    <a href='/preferences'><li>Preferences</li></a>
                 </section>
                </article>
            </section>
        </main>
    )
}

export default Sidebar