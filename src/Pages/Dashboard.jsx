import React from 'react'
import Sidebar from '../Components/Sidebar'
import { FaSearch } from 'react-icons/fa'

const Dashboard = () => {

  gapi.load('client', gapiStart)
   // Function to load the gapi client.
    // Gapi is the Google API client library, to load libraries and make requests.
    function gapiStart() {
      gapi.client.init({
      }).then(function () {
        gapi.client.load('drive', 'v3');
      }).then(function (response) {
        console.log('discovery document loaded');
      }, function (reason) {
        console.log('Error: ' + reason.result.error.message);
      });
    }

    // This function should list files in the peppubooks folder.
    // This means we should store parentinfo id as cookie.
    async function getFiles() {
      let response;
      // retrieve Id from session
      let folderId = '1AOvAPTdkRjYdYwOGJVxRI4sRxFTUhurp'
      try {
        response = await gapi.client.drive.files.list({
          'fields': 'files(name)',
          'q': `'${folderId}' in parents`
        });
        // Add a guard to filter out Template Store
        return response.result.files;
      } catch (err) {
        console.log(err);
        return;
      }
    }
    // name a constant and retrieve it in the body
    getFiles().then(function(result) {
      console.log(result); // This successfully returns template.
      // Embed for loop here, to return all files.

    });


  return (
    <body id='dash-board'>
      
    
    <main className='dashboard-main'>
      <aside>
        <Sidebar />
      </aside>

    <main>
      <header className='fixed'> 
      <h2>My&nbsp;Workspace</h2>
      <nav className='search'><FaSearch/></nav>
      </header>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut iste in ex dolor, soluta eos modi! Temporibus enim velit officiis! Quam autem odit quas harum vero fugiat tempora explicabo necessitatibus?</p>
      {/*
      // Filter this to print name alone.
      <p>{getFiles()} </p>
    */}
    </main>
    
    </main>
    </body>
  )
}

export default Dashboard