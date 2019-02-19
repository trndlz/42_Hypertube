import React, { Component } from 'react';
import './app.css';
import { Route, BrowserRouter } from "react-router-dom";
import HomePage from "./components/homepage/HomePage";
import MainPage from "./components/mainpage/MainPage";
import Footer from "./components/partials/Footer";

class App extends Component {
  render() {
    console.log("IN APP");
    return (
      <BrowserRouter>
        <div className="App">
            <div style={{marginBottom: "60px"}}>
              <Route exact path="/" component={HomePage}/>
              <Route path="/mainpage" component={MainPage}/>
            </div>
            <Footer/>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
