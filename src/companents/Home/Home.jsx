
import Header from "../Header/Header";
import Main from "../Main/Main";
import Saidbar from "../Saidbar/Saidbar";
import { Route, Router, Routes } from "react-router-dom";

import "./Home.css"


function Home() {
    return (
        <div className="container">
            <Saidbar></Saidbar>
            <div className="home">
                <Header></Header>
                <Main></Main>
            </div>

        </div>
    )
}
export default Home;