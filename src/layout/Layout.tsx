import {Outlet} from 'react-router-dom'
import Navbar from "../components/UI/Navbar.tsx";
import Footer from "../components/UI/Footer.tsx";
import MouseTrail from "../components/mouseTrail/MouseTrail.tsx";

const Layout = () => {
    return (
        <>
            <MouseTrail/>
            <Navbar/>
            <Outlet/>
            <Footer/>
        </>
    )
}
export default Layout
