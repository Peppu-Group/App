import Sidebar from '../Components/Sidebar';
import { FaSearch } from 'react-icons/fa';
import React, { useEffect, useState } from 'react';
import { useCookies } from "react-cookie";
import { FcFolder } from 'react-icons/fc';
import { FcOpenedFolder } from 'react-icons/fc';
import { MdCreateNewFolder } from 'react-icons/md';
import { useNavigate } from 'react-router-dom'


const Dashboard = () => {
  
  return (
   

    <body id='dash-board'>
    <main className='dashboard-main'>
  
      <aside  className='aside'>
        <Sidebar/>
      </aside>

    <section>
      <header className='fixed' > 
      <h2>My&nbsp;Workspace</h2>
      <nav className='search'><FaSearch/></nav>
      </header>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut iste in ex dolor, 
        soluta eos modi! Temporibus enim velit officiis! Quam autem odit quas harum vero fugiat 
        tempora explicabo necessitatibus?</p>
    </section>
    
    </main>
    </body>
  )
}

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