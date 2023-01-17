import React from 'react'
import getstarted from '../assets/getstarted.png'
import IMG_2437 from '../assets/IMG_2437.png'
import { AiOutlineArrowRight } from 'react-icons/ai'
import { useNavigate } from 'react-router-dom'
import { useCookies } from "react-cookie";
import { toast } from 'react-toastify';


const Getstarted = () => {
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
        // create function that searches drive to make sure peppubooks folder doesn't exist. Else, redirect to login.
        .then(text => createFolder(text))
      // Add spinner here
    }
  })

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

  const [cookies, setCookie] = useCookies(["file"]);

  // Function to create peppubooks folder in the user's drive.
  // This function also creates a Template Store in the peppubooks folder.
  async function createFolder(text) {
    let response;
    try {
      response = await gapi.client.drive.files.list({
        q: 'name=\'peppubooks\'',
      });

      if (response.result.files == 0) {
        // Declare file, folder, folderId,fileId
        let file;
        let folder;
        let folderId;
        let fileId;
        // Folder Metadata
        var folderMetadata = {
          'name': 'Peppubooks',
          'mimeType': 'application/vnd.google-apps.folder'
        };
        // Method to create folder
        try {
          folder = await gapi.client.drive.files.create({
            resource: folderMetadata,
            fields: 'id',
          });
          folderId = folder.result.id;
        } catch (err) {
          console.log(err);
          return;
        }


        // File Metadata
        var fileMetadata = {
          'name': 'Template Store',
          'mimeType': 'application/vnd.google-apps.spreadsheet',
          'parents': [folderId],
        };

        // Method to create file inside peppubooks folder
        try {
          file = await gapi.client.drive.files.create({
            resource: fileMetadata,
            fields: 'id',
          });
          fileId = file.result.id;
          setCookie("file", { fileId: fileId, folderId: folderId }, {
            path: "/"
          });
        } catch (err) {
          console.log(err);
          return;
        }
        navigate('/', { state: { username: text.name, userimg: text.picture } })
      } else {
        navigate('/login')
        toast.error('You already have an account registered with Peppubooks. Redirecting to login')
      }
    } catch (err) {
      console.log(err);
      return;
    }
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

export default Getstarted
