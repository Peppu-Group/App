import React from 'react'
import getstarted from '../assets/getstarted.png'
import IMG_2437 from '../assets/IMG_2437.png'
import { AiOutlineArrowRight } from 'react-icons/ai'
import { useNavigate } from 'react-router-dom'

const Login = () => {
    const navigate = useNavigate()
    gapi.load('client', gapiStart)
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
                // create function that searches drive to make sure peppubooks folder exist. Else, redirect to register.
                .then(text => checkFolder(text))
            // Add spinner here
        }
    })

    async function checkFolder(text) {
        let response;
        try {
            response = await gapi.client.drive.files.list({
                q: 'name=\'peppubooks\'',
            });
            console.log(response.result.files)
            if (response.result.files == 0) {
                // Add a modal that you're redirecting to register
                navigate('/register')
            } else {
                navigate('/', { state: { username: text.name, userimg: text.picture } })
            }
            // Add a guard to filter out Template Store
        } catch (err) {
            console.log(err)
        }
    }

    // Function to load the gapi client.
    // Gapi is the Google API client library, to load libraries and make requests.
    function gapiStart() {
        gapi.client.init({
        }).then(function () {
            gapi.client.load('drive', 'v3');
        }).then(function () {
            gapi.client.load('sheets', 'v4');
        }).then(function (response) {
            console.log('discovery document loaded');
        }, function (reason) {
            console.log('Error: ' + reason.result.error.message);
        });
    }

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
                    <img src={IMG_2437} />
                </figure>
                <article className='container-paragraph'>
                    <p>Let's make your <br /> life simple with our <br /> seamless book keeping</p>
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

export default Login
