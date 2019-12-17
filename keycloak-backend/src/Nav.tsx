import React from "react";
import { NavLink } from "react-router-dom"

function createIsActive(link: string) {
    return (match: any, location: { pathname: string }) => {
        if (!match) {
            return false;
        } else
            return location.pathname.indexOf(link) >= 0;
    }
}

function isHome(match: any, location: { pathname: string }) {
    if (!match) {
        return false;
    } else return location.pathname === "/";
}

export const Nav: React.FC = () => {
    return <nav className="App-nav">
        <ul>
            <li>
                <NavLink className={"App-nav-link"} activeClassName={"App-nav-link-selected"} isActive={isHome} to="/" > Home</NavLink>
            </li>
            <li>
                <NavLink className={"App-nav-link"} activeClassName={"App-nav-link-selected"} isActive={createIsActive("call")} to="/call">Rest API</NavLink>
            </li>
            <li>
                <NavLink className={"App-nav-link"} activeClassName={"App-nav-link-selected"} isActive={createIsActive("info")} to="/info">Info Page</NavLink>
            </li>
        </ul>
    </nav>
}