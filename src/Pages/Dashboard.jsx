import Sidebar from '../Components/Sidebar';
import { FaSearch } from 'react-icons/fa';
import React, { useEffect, useState } from 'react';
import { useCookies } from "react-cookie";
import { FcFolder } from 'react-icons/fc';
import { FcOpenedFolder } from 'react-icons/fc';
import { MdCreateNewFolder } from 'react-icons/md';
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';

const Dashboard = () => {
  const [files, setFiles] = useState([]);
  const [cookies, setCookie] = useCookies(["file"]);
  const navigate = useNavigate()

  gapi.load('client', gapiStart);

  // Function to load the gapi client.
  // Gapi is the Google API client library, to load libraries and make requests.
  function gapiStart() {
    gapi.client.init({
    })
    .then(function () {
      gapi.client.load('script', 'v1');
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
    let folderId = cookies.file.folderId;
    try {
      response = await gapi.client.drive.files.list({
        fields: 'files(name)',
        q: `'${folderId}' in parents`,
      });
      return response.result.files;

      // Add a guard to filter out Template Store
    } catch (err) {
      return navigate('/login');
    }
  }

  async function createTransaction(name) {
    console.log("mee")
    // Search for fileId in Template store,
    let url = `https://docs.google.com/spreadsheets/d/${cookies.file.fileId}/edit`;
    let id;
    try {
      id = await gapi.client.script.scripts.run({
        'scriptId': 'AKfycbzkB3j5U6pn_n9n2DN3OTLyjRA5owEN2C-u_sZyICYNCXwTs7DbTu0KIjTke2zQR5OE8g',
        'resource': {
          'function': 'return_row',
          "parameters": [
            url,
            name,
        ],
        },
      })
    } catch (err) {
      return toast.error(err);
    }
    // Write value into transaction file

    try {
      let update = await gapi.client.sheets.spreadsheets.values.append({
        spreadsheetId: id.result.response.result,
        range: 'Transactions!A:E',
        valueInputOption: 'RAW',
        insertDataOption: 'INSERT_ROWS',
        'resource': {
          "range": "Transactions!A:E",
          "majorDimension": "ROWS",
          "values": [
            [
            '2023-01-01',
            '1',
            'description',
              '500',
              'Sales',
              'Bank'
            ]
          ],
        }
      })
    } catch (err) {
      return navigate('/login');
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
            <FcOpenedFolder className='iicons' /> No folder, create one below.
          </div>
        );
      }
      return filteredFiles.map((file) => (
        <div>
          <FcFolder onClick={() => createTransaction(file.name)} className='iicons'/> File Name: {file.name}
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
    let response;

    // Filebody
    var body = { name: name, parents: [cookies.file.folderId] };
    // Check that filename doesn't already exist in folder before creating
    try {
      response = await gapi.client.drive.files.list({
        q: `name=\'${name}\'`
      });
      if (response.result.files != 0) {
        toast.error('You already have a file with this name present, try a different name');
      } else {
        // Method to create file inside peppubooks folder
        try {
          file = await gapi.client.drive.files.copy({
            'fileId': "1S4GMiZ0H0_6OHH7DEnjZt07-6kk0eMP4YSNUmRcKZXA",
            'resource': body
          });
          fileId = file.result.id;
          toast.success(`Created ${file.result.name} successfully`)
          // Write fileId into template store
        } catch (err) {
          return navigate('/login');
        }

        // FileResource
        try {
          // copy fileId into template store
          let update = await gapi.client.sheets.spreadsheets.values.append({
            spreadsheetId: cookies.file.fileId,
            range: 'A:B',
            valueInputOption: 'RAW',
            insertDataOption: 'INSERT_ROWS',
            'resource': {
              "range": "A:B",
              "majorDimension": "ROWS",
              "values": [
                [
                  name,
                  fileId
                ]
              ],
            }
          })
        } catch (err) {
          return navigate('/login');
        }
      }
    } catch (err) {
      return toast.error(err);
    }
  }

  const promptToGetFileName = () => {
    if (window.prompt) {
      const filename = window.prompt("Enter File Name");

      if (filename.length < 1) {
        throw(toast.error(`couldn't create file with no name`))
      }

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