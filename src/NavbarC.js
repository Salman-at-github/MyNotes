import React from 'react';
import bookicon from './components/book-solid.svg'
import { Link } from 'react-router-dom';

const NavbarC = () => {
    return (
        <div className='custom-nav'>
            <ul>
                <div id='logo'>
                    <img src={bookicon} alt='Book logo' className='bookicon' id='bookicon' />
                <Link to="/">MNB</Link>

                </div>
                <div className='paths'>
                    <li><Link to='/'>Home</Link></li>
                    <li><Link to='/about'>About</Link></li>
                </div>
            </ul>
        </div>
    )
}

export default NavbarC
