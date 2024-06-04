import './App.css';
import Headline from './Modules/Headline.js'
import Footer from './Modules/Footer.js'
import MainPage from './Modules/Pages/MainPage.js'
import SideBar from './Components/SideBar.js'

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
            <Route path = "/channel/:id" element={ <MainPage className = "App-header"></MainPage>}/>
            <Route path = "/search/:keyword" element={ <MainPage className = "App-header"></MainPage>}/>
            <Route path = "/video/:id" element={ <MainPage className = "App-header"></MainPage>}/>
            <Route path = "/" element={ <MainPage className = "App-header"></MainPage>}/>
            <Route path = "/*" element={ <MainPage className = "App-header"></MainPage>}/>
          </Routes>
        </Router>
      </div>
      <Footer></Footer>
    </div>
  );
}


export default App;
