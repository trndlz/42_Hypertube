import React, { Component } from "react";
import "./css/style.css";
import { Route, BrowserRouter } from "react-router-dom";
import HomePage from "./components/homepage/HomePage";
import MainPage from "./components/mainpage/MainPage";

class App extends Component {
    render() {
        return (
            <BrowserRouter>
                <div className="App">
                    <Route exact path="/" component={HomePage} />
                    <Route path="/mainpage" component={MainPage} />
                </div>
            </BrowserRouter>
        );
    }
}

export default App;