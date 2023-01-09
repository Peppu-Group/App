import React from 'react'
import getstarted from '../assets/getstarted.png'
import IMG_2437 from '../assets/IMG_2437.png'
import {AiOutlineArrowRight} from 'react-icons/ai'
import {useNavigate} from 'react-router-dom'
const Getstarted = () => {


  const navigate = useNavigate()
  let client = google.accounts.oauth2.initTokenClient({
    client_id: '810913561449-r80nc33r20qe18ij2bcll7i6sv4r8bkg.apps.googleusercontent.com',
    scope: 'https://www.googleapis.com/auth/calendar.readonly \
              https://www.googleapis.com/auth/spreadsheets \
              https://www.googleapis.com/auth/userinfo.profile \
              https://www.googleapis.com/auth/drive',
    ux_mode: 'popup',
    callback: (response) => {
      // run fetch request to get user info
      let value = fetch('https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=' + response.access_token, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
        },
      })
        .then(value => value.json())
        .then(text => document.cookie = "userinfo=" + JSON.stringify({ username: text.name, userimg: text.name }))
        .then(navigate('/'))
    }
  })

  function getAuthCode() {
    // Request authorization code and obtain user consent
    // Return code to backend.
    // let code = getAuthCode()
    client.requestAccessToken()
  }

  return (
    <main className='container'>


      {/* The big image in the get started page* */}
        <figure className='container-image'>
            <img src={getstarted} width={600} />
        </figure>



        {/** The write ups in the right conner */}
        <section className='container-text'>


            <figure>
                 <img src={IMG_2437}  />
            </figure>


            <article className='container-paragraph'>
              <p>Let's make your <br /> life simple with our <br/> seamless book keeping</p>
            </article>


            <article className='getstarted-with-google'>
                <a href='#'>Get started <span className='g-in-google'>G</span ><span className='o-in-google'>o</span><span className='onext-in-google'>o</span><span className='g-in-google'>g</span><span className='l-in-google'>l</span ><span className='e-in-google'>e</span></a>
               
            </article>


            <article className='works'>
                
                
                <p onClick={getAuthCode}>See how Peppu works </p>

                <figure className='icon'>
                  <AiOutlineArrowRight />
                </figure>


            </article>


            
        </section>
    </main>
  )
}

export default Getstarted