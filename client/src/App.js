import React, { useEffect, useState } from "react";
import "./css/style.css";
import { BrowserRouter } from "react-router-dom";
import MainPage from "./components/mainpage/MainPage";
import ProtectedRoute from "./utils/protectedRoute";
import { auth } from "./utils/auth";

const App = () => {
    let [isLoading, setIsLoading] = useState(true)
    let [rerender, setRerender] = useState(true)
    useEffect(()=>{
        (async ()=>{
            await auth.authenticate();
            setIsLoading(false);
        })()            
    }, [])

    return (
        <BrowserRouter>
            <div className="App">
                {isLoading ? 
                null:
                <ProtectedRoute path="/" component={MainPage} setRerender={setRerender} rerender={rerender}/>}
            </div>
        </BrowserRouter>
    );
};

export default App;