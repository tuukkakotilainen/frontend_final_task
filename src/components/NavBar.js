import React from "react";
import { Link } from "react-router-dom";

function NavBar() {
    return (
        <ul>
            <li>
                <Link to="/customerlist">Customers</Link>
            </li>
            <li>
                <Link to="/traininglist">Trainings</Link>
            </li>
        </ul>
    )
}

export default NavBar