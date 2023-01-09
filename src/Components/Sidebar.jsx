import React from 'react'
import IMG_2437 from '../assets/IMG_2437.png'
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
    return (
        <main>
            {/*Home page Nave-bar components style={{width: 74, height: 30, marginTop: 13}} */}
            <section className='home-sidebar'>
                <article className='sidenav'>
                    <a href='https://peppubooks.com'><img src={IMG_2437} className='side-img' /></a>
                    <a href='/'><li>{readCookie('userinfo').username}</li></a>
                    <a href='/'><li>{readCookie('userinfo').picture}</li></a>
                    <a href='/'><li>Dashboard</li></a>
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