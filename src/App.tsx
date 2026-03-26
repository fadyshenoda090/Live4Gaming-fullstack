import './App.css'
import {RouterProvider} from 'react-router-dom';
import router from "./router/Router.tsx";
import {useEffect} from "react";


function App() {
    useEffect(() => {
        // Disable browser's scroll restoration
        if ('scrollRestoration' in history) {
            history.scrollRestoration = 'manual';
        }
    }, []);
    return (
        <RouterProvider router={router}/>
    )
}

export default App
