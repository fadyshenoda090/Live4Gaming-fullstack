import {createBrowserRouter} from "react-router-dom";
import Layout from "../layout/Layout.tsx";
import Home from "../pages/home/Home.tsx";
import NotFound from "../pages/notFound/NotFound.tsx";
import ContactUs from "../pages/contact-us/ContactUs.tsx";
import Login from "../pages/auth/login/Login.tsx";
import Register from "../pages/auth/register/Register.tsx";
import TournamentsPage from "../pages/tournaments/Tournaments.tsx";
import GamesPage from "../pages/games/Games.tsx";
import About from "../pages/about/About.tsx";
import GameDetails from "../pages/gameDetails/GameDetails.tsx";
import TournamentDetails from "../pages/tournamentDetails/TournamentDetails.tsx";

const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        children: [
            { index: true, element: <Home /> ,errorElement:<NotFound/>},
            { path: '/about', element: <About /> },
            { path: '/contact-us', element: <ContactUs /> },
            { path: '/auth/login', element: <Login /> },
            { path: '/auth/register', element: <Register /> },
            { path: '/tournaments', element: <TournamentsPage /> },
            { path: '/tournaments/:id', element: <TournamentDetails /> },
            { path: '/games', element: <GamesPage /> },
            { path: '/games/:id', element: <GameDetails /> },
            { path: '*', element: <NotFound /> },
        ],
    },
]);

export default router;