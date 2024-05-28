import logo from './logo.svg';
import './App.css';
import Headline from './Components/Headline.js'
import Footer from './Components/Footer.js'
import MainPage from './Components/Pages/MainPage.js'

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Detail from "./routes/Detail";
// import Home from "./routes/Home";
// import Error from "./routes/Error";

function App() {
  return (
    <div className="App">
      <Headline></Headline>
      <Router >
        <Routes>
          <Route path = "/*" element={ <MainPage className = "App-header"></MainPage>}/>
        </Routes>
      </Router>
      <Footer></Footer>
    </div>
  );
}


export default App;
