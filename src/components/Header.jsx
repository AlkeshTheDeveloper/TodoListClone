import React from 'react'
import logo from '../assests/images/logo192.png'

function Header() {
    return (
        <div>
            <header className="header">
                <nav>
                    <div>
                        <img src={logo} alt="logo"></img>
                    </div>
                </nav>
            </header>
        </div>
    )
}

export default Header
