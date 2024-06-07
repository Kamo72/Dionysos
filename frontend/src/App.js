import './App.css';
import Headline from './Modules/Headline.js'
import Footer from './Modules/Footer.js'
import SideBar from './Components/SideBar.js'

import ViewPage from './Modules/Pages/ViewPage.js'
import NotfoundPage from './Modules/Pages/NotfoundPage.js'
import SignInPage from './Modules/Pages/SignInPage.js';
import SignUpPage from './Modules/Pages/SignUpPage.js';

import MainPage from './Modules/Pages/MainPage.js'
import SearchPage from './Modules/Pages/SearchPage.js';
import ChannelPage from './Modules/Pages/ChannelPage.js';
import UploadPage from './Modules/Pages/UploadPage.js';
import ProfilePage from './Modules/Pages/ProfilePage.js';

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
// import Detail from "./routes/Detail";
// import Home from "./routes/Home";
// import Error from "./routes/Error";



function App() {

  const [sideBarOpened, SetSideBarOpened] = useState(false);

  return (
    <div className="App">
      <Headline toggleFunc = {()=>{SetSideBarOpened(!sideBarOpened)}} ></Headline>
      <div
        style={{
          display: "flex",
        }}>
        <SideBar isOpened = {sideBarOpened}></SideBar>
        <Router>
          <Routes>
            <Route path = "/profile" element={ <ProfilePage className = "App-header"></ProfilePage>}/>
            <Route path = "/signin" element={ <SignInPage className = "App-header"></SignInPage>}/>
            <Route path = "/signup" element={ <SignUpPage className = "App-header"></SignUpPage>}/>
            <Route path = "/upload" element={ <UploadPage className = "App-header"></UploadPage>}/>
            <Route path = "/channel/:id" element={ <ChannelPage className = "App-header"></ChannelPage>}/>
            <Route path = "/search/:keyword" element={ <SearchPage className = "App-header"></SearchPage>}/>
            <Route path = "/view/:id" element={ <ViewPage className = "App-header"></ViewPage>}/>
            <Route path = "/" element={ <MainPage className = "App-header"></MainPage>}/>
            <Route path = "/*" element={ <NotfoundPage className = "App-header"></NotfoundPage>}/>
          </Routes>
        </Router>
      </div>
      <Footer></Footer>
    </div>
  );
}

export const serverRoot = "http://localhost:8080"
export const webRoot = false? serverRoot : window.location.origin;
export default App;