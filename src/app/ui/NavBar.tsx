/* eslint-disable @next/next/no-img-element */
import React from "react";

const NavBar = () => {
    return <nav className="fixed top-0 z-50 w-full bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700">
        <div className="px-3 py-3 lg:px-5 lg:pl-3">
            <div className="flex items-center justify-between">
                <div className="flex items-center justify-start rtl:justify-end">
                <button data-drawer-target="logo-sidebar" data-drawer-toggle="logo-sidebar" aria-controls="logo-sidebar" type="button">
                    <div className="flex ms-2 md:me-24">
                        <img src="https://cdn2.iconfinder.com/data/icons/weather-flat-14/64/weather02-512.png" className="h-8 me-3" alt="FlowBite Logo" />
                        <span className="self-center text-xl font-semibold sm:text-2xl whitespace-nowrap dark:text-white">Clima de México</span>
                    </div>
                </button>
                </div>
                <div className="flex items-center">
                    <div className="flex items-center ms-3">
                        <button type="button" className="flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600" aria-expanded="false" data-dropdown-toggle="dropdown-user">
                            <img className="w-8 h-8 rounded-full" src="https://www.svgrepo.com/show/382097/female-avatar-girl-face-woman-user-9.svg" alt="user photo"/>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </nav>

    
    
}

export default NavBar