import React from 'react';
import './header.css'
import logo from '../Images/logo.svg';

const Header = () => {
    return (
        <nav class="navbar navbar-expand-lg bg-color-peach">
            <div class="container-fluid">
                <button
                    class="navbar-toggler"
                    type="button"
                    data-mdb-toggle="collapse"
                    data-mdb-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <i class="fas fa-bars"></i>
                </button>

                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                        <img
                            src={logo}
                            height="45"
                            width={45}
                            alt="MDB Logo"
                            loading="lazy"
                        />
                        <p className='header-title'>SenereMindz</p>

                </div>
                <div class="d-flex align-items-center">
                </div>
            </div>
        </nav>
    )
};
export default Header;