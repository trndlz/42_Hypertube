import React, { useEffect, useState, useRef } from "react";
import "./css/style.css";
import { BrowserRouter } from "react-router-dom";
import MainPage from "./components/mainpage/MainPage";
import ProtectedRoute from "./utils/protectedRoute";
import { auth } from "./utils/auth";
// import LogRocket from 'logrocket';
// LogRocket.init('qzue8a/hypertube');

const App = () => {
	let isMounted = useRef(false);
    let [isLoading, setIsLoading] = useState(true);
    let [rerender, setRerender] = useState(true);
    useEffect(() => {
        isMounted.current = true;
        (async () => {
            await auth.authenticate();
            if (isMounted.current){
                setIsLoading(false);
            }
        })();
        return () => {
            isMounted.current = false;
        }
    }, []);

    return (
        <BrowserRouter>
            <div className="App">
                {isLoading ? null : (
                    <ProtectedRoute
                        path="/"
                        component={MainPage}
                        setRerender={setRerender}
                        rerender={rerender}
                    />
                )}
            </div>
        </BrowserRouter>
    );
};

export default App;
