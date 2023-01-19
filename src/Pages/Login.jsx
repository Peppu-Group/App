import React from "react";
import getstarted from "../assets/getstarted.png";
import IMG_2437 from "../assets/IMG_2437.png";
import { AiOutlineArrowRight } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import { useCookies } from "react-cookie";

const Login = () => {
  const navigate = useNavigate();
  gapi.load("client", gapiStart);
  const [cookies, setCookie] = useCookies(["file"]);
  let client = google.accounts.oauth2.initTokenClient({
    client_id:
      "810913561449-r80nc33r20qe18ij2bcll7i6sv4r8bkg.apps.googleusercontent.com",
    scope:
      "https://www.googleapis.com/auth/calendar.readonly \
              https://www.googleapis.com/auth/spreadsheets \
              https://www.googleapis.com/auth/userinfo.profile \
              https://www.googleapis.com/auth/drive",
    ux_mode: "popup",
    callback: (response) => {
      // run fetch request to get user info
      let value = fetch(
        "https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=" +
        response.access_token,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
          },
        }
      )
        .then((value) => value.json())
        // create function that searches drive to make sure peppubooks folder exist. Else, redirect to register.
        .then((text) => checkFolder(text));
      // Add spinner here
    },
  });


  async function checkFolder(text) {
    let response;
   
    // check cookies, make sure that folderId and fileId are registerd. If not, get the id by username and store it in cookies.
      // This could be a problem if the user switches to a new computer.
      if (cookies.file == undefined ) {
        let foldername = 'Peppubooks'
        let filename = 'Template Store'
        let folderid;
        let fileid;
        try {
          folderid = await gapi.client.script.scripts.run({
            // remember to create a .env file to add sensitive information
            'scriptId': 'AKfycbzkB3j5U6pn_n9n2DN3OTLyjRA5owEN2C-u_sZyICYNCXwTs7DbTu0KIjTke2zQR5OE8g',
            'resource': {
              'function': 'get_folder_id',
              "parameters": [
                foldername,
            ],
            },
          })
          // store folderid as `folderid.result.response.result`
        } catch (err) {
          return toast.error(err);
        }

        try {
          fileid = await gapi.client.script.scripts.run({
            'scriptId': 'AKfycbzkB3j5U6pn_n9n2DN3OTLyjRA5owEN2C-u_sZyICYNCXwTs7DbTu0KIjTke2zQR5OE8g',
            'resource': {
              'function': 'get_id',
              "parameters": [
                filename,
            ],
            },
          })
        } catch (err) {
          return toast.error(err);
        }
        setCookie("file", { fileId: fileid.result.response.result, folderId: folderid.result.response.result}, {
          path: "/"
        })
      }

    try {
      response = await toast.promise(
        gapi.client.drive.files.list({
          q: "name='peppubooks'",
        }),
        {
          pending: 'Signing in...',
        }
      )
      if (response.result.files == 0) {
        navigate("/register");
        toast.error('You have not registered your account. Redirecting to register')
        // Add a modal that you're redirecting to register
      } else {
        navigate("/", {
          state: { username: text.name, userimg: text.picture },
        });
        toast.success('Sign-in Successful! Preparing Dashboard 👌')
      }
    } catch (err) {
      toast.error(err)
    }
  }

  // Function to load the gapi client.
  // Gapi is the Google API client library, to load libraries and make requests.
  function gapiStart() {
    gapi.client
      .init({})
      .then(function () {
        gapi.client.load("drive", "v3");
      })
      .then(function () {
        gapi.client.load("sheets", "v4");
      })
      .then(function () {
        gapi.client.load('script', 'v1');
      })
      .then(
        function (response) {
          console.log("discovery document loaded");
        },
        function (reason) {
          console.log("Error: " + reason.result.error.message);
        }
      );
  }

  function getAuthCode() {
    // Request authorization code and obtain user consent
    // Return code to backend.
    // let code = getAuthCode()
    client.requestAccessToken();
  }

  return (

    <main className="container">
      {/* The big image in the get started page* */}
      <figure className="container-image">
        <img src={getstarted} width={600} />
      </figure>
      {/** The write ups in the right conner */}
      <section className="container-text">
        <figure>
          <img src={IMG_2437} />
        </figure>
        <article className="container-paragraph">
          <p>
            Let's make your <br /> life simple with our <br /> seamless book
            keeping
          </p>
        </article>

        <article className="getstarted-with-google">
          <a href="#">
            Get started <span className="g-in-google">G</span>
            <span className="o-in-google">o</span>
            <span className="onext-in-google">o</span>
            <span className="g-in-google">g</span>
            <span className="l-in-google">l</span>
            <span className="e-in-google">e</span>
          </a>
        </article>

        <article className="works">
          <p onClick={getAuthCode}>See how Peppu works </p>
          <figure className="icon">
            <AiOutlineArrowRight />
          </figure>
        </article>
      </section>
    </main>

  );
};

export default Login;