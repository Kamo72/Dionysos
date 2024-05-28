import logo from './logo.svg';
import './App.css';

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Detail from "./routes/Detail";
// import Home from "./routes/Home";
// import Error from "./routes/Error";

function App() {
  return (
    <div className="App">

      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>

      <div >
        <Router>
          <Routes>
            <Route path = "/*" element={ <h1>hello</h1>}/>
            {/* <Route path="/game/:id"  element={ <Detail /> }/>,
            <Route path="/first-app" element={ <Home /> }/>
            <Route path="/*" element={ <Error /> }/> */}
          </Routes>
        </Router>
      </div>

    </div>
  );
}


export default App;
