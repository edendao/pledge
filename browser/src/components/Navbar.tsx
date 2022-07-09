import React from "react"
// import { NavLink } from "react-router-dom"

export const Navbar: React.FC = () => (
  <nav className="flex justify-between justify-end pt-8 md:mx-8 mx-2">
    <div>
      {/* <NavLink to="/">
        <button className="glass-button md:px-6">Eden Dao</button>
      </NavLink> */}
    </div>
    <div className="flex flex-row">
      {/* <div className="pr-4">
          <NavLink to="/about">
            {({ isActive }) => (
              <button
                className={`glass-button md:px-6 ${
                  isActive ? "selectedBorder" : ""
                }`}
              >
                <span className="hidden md:flex">
                  <span className="pr-3 pt-1">
                    <BsQuestionLg />
                  </span>
                  About
                </span>
                <span className="md:hidden">
                  <BsQuestionLg />
                </span>
              </button>
            )}
          </NavLink>
        </div> */}
      <div>
        <a href="#contribute">
          <button className="glass-button md:px-6">Sign the Pledge</button>
        </a>
      </div>
    </div>
  </nav>
)
