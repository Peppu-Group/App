import Sidebar from '../Components/Sidebar';
import { FaSearch } from 'react-icons/fa';
import React, { useEffect, useState } from 'react';
import { useCookies } from "react-cookie";
import {FcFolder} from 'react-icons/fc';
import {FcOpenedFolder} from 'react-icons/fc';
import {MdCreateNewFolder} from 'react-icons/md';

const Dashboard = ({filename}) => {
  const [files, setFiles] = useState([]);
  const [cookies, setCookie] = useCookies(["file"]);

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
    let folderId = cookies.file.folderId;
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


  const renderFiles = () => {
    if (files && files.length > 0) {
      const filteredFiles = files.filter(
        (file) => file.name !== 'Template Store'
      );
      if (filteredFiles.length == 0) {
        return (
          <div>
            <FcOpenedFolder className='iicons'/> No folder, create one below.
          </div>
        );
      }
      return filteredFiles.map((file) => (
        <div>
          <FcFolder className='iicons'/> File Name: {file.name}
        </div>
      ));
    } else {
      return (
        <div>
           An error occured.
        </div>
      );
    }
  };

  const displayFiles = renderFiles(files);

  async function createWorkflow(name) {
    let file;
    let fileId;
    // File Metadata
    var fileMetadata = {
      name: name,
      mimeType: "application/vnd.google-apps.spreadsheet",
      parents: [cookies.file.folderId],
    };

    // Method to create file inside peppubooks folder
    try {
      file = await gapi.client.drive.files.create({
        resource: fileMetadata,
        fields: "id",
      });
      fileId = file.result.id;
      // Write fileId into template store
    } catch (err) {
      console.log(err);
      return;
    }
  }

  const promptToGetFileName = () => {
    if (window.prompt) {
      const filename = window.prompt("Enter File Name");

      createWorkflow(filename);
      // There'll be an alert to show file created successfully
    }
  };

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
          <div>
            <p className="ficon">Folders</p>
            <p>{displayFiles} </p>
          </div>
          <div>
            <p className="ficon">Workflows</p>
            <p onClick={promptToGetFileName}>
              {" "}
              <MdCreateNewFolder className="iicons" />
            </p>
          </div>
        </main>
      </main>
    </body>
  );
};
export default Dashboard;