import Sidebar from '../Components/Sidebar';
import { FaSearch } from 'react-icons/fa';
import React, { useEffect, useState } from 'react';
import { useCookies } from "react-cookie";

const Dashboard = () => {
  const [files, setFiles] = useState([]);
  
  const [cookies, setCookie] = useCookies(["file"]);
  console.log(cookies.file)
  gapi.load('client', gapiStart);

  // Function to load the gapi client.
  // Gapi is the Google API client library, to load libraries and make requests.
  function gapiStart() {
    gapi.client
      .init({})
      .then(function () {
        gapi.client.load('drive', 'v3');
      })
      .then(
        function (response) {
          console.log('discovery document loaded');
        },
        function (reason) {
          console.log('Error: ' + reason.result.error.message);
        }
      );
  }

  // This function should list files in the peppubooks folder.
  // This means we should store parentinfo id as cookie.

  async function getFiles() {
    let response;
    // retrieve Id from session
    let folderId = '1AOvAPTdkRjYdYwOGJVxRI4sRxFTUhurp';
    try {
      response = await gapi.client.drive.files.list({
        fields: 'files(name)',
        q: `'${folderId}' in parents`,
      });
      return response.result.files;

      // Add a guard to filter out Template Store
    } catch (err) {
      console.log(err);
      return;
    }
  }

  useEffect(() => {
    const fetchFiles = async () => {
      const files = await getFiles();
      setFiles(files);
    };

    fetchFiles();
  }, [gapi]);

  const displayFiles =
    files && files.length > 0
      ? files.map((file) => <div>File Name: {file.name}</div>)
      : 'No files found.';
       
  return (
    <body id="dash-board">
      <main className="dashboard-main">
        <aside>
          <Sidebar />
        </aside>

        <main>
          <header className="fixed">
            <h2>My&nbsp;Workspace</h2>
            <nav className="search">
              <FaSearch />
            </nav>
          </header>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut iste in
            ex dolor, soluta eos modi! Temporibus enim velit officiis! Quam
            autem odit quas harum vero fugiat tempora explicabo necessitatibus?
          </p>

          <p>{displayFiles} </p>
        </main>
      </main>
    </body>
  );
};

export default Dashboard;