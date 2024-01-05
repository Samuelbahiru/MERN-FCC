import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div>
      <nav className="nav navbar-dark bg-dark navbar-expand-lg p-3">
        <Link
          className="navbar-brand mx-5 text-warning text-capitalize fs-3"
          aria-current="page"
          to="/"
        >
          ExerciseTracker
        </Link>
        <div className="collpase navbar-collapse mx-5">
          <ul className="navbar-nav navbar-collapse">
            <li className="navbar-item mx-2">
              {" "}
              <Link className="nav-link ft-20 " aria-current="page" to="/">
                Exercises
              </Link>
            </li>
            <li className="navbar-item mx-2">
              {" "}
              <Link className="nav-link " aria-current="page" to="/create">
                Create_Exercise
              </Link>
            </li>
            <li className="navbar-item mx-2">
              <Link className="nav-link " aria-current="page" to="/user">
                Create_User
              </Link>
            </li>
            {/* <li className="navbar-item"></li> */}
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
