import React, { useEffect, useRef, useState } from 'react'
import './Navbar.css'
import logo from '../../assets/logo.png'
import search_icon from '../../assets/search_icon.svg'
import bell_icon from '../../assets/bell_icon.svg'
import profile_img from '../../assets/profile_img.png'
import caret_icon from '../../assets/caret_icon.svg'
import { auth, logout } from '../../firebase'
import { Link } from 'react-router-dom'
import { useContentStore } from '../../store/content'
import { onAuthStateChanged } from 'firebase/auth'


const Navbar = () => {

    const { contentType, setContentType } = useContentStore()
    const [user, setUser] = useState(null); 
    const navRef = useRef()

    useEffect(() => {

        const handleScroll = () => {
            if (window.scrollY > 300) {
                navRef.current.classList.add('nav-dark')
            } else {
                navRef.current.classList.remove('nav-dark')
            }
        }
        window.addEventListener('scroll', handleScroll)
        return () => {
            window.removeEventListener('scroll', handleScroll)
        }
    }, [])


    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            if (currentUser) {
                setUser({
                    name: currentUser.displayName || currentUser.email.split('@')[0],
                    email: currentUser.email
                });
            } else {
                setUser(null);
            }
        });
        return () => unsubscribe();
    }, []);

    return (
        <div ref={navRef} className='navbar'>
            <div className="navbar-left">
                <a href={'#'}><img src={logo} alt="" /></a>

                <div className="link-grp">
                    <Link to={'/'}  className='links' onClick={() => setContentType("movie/popular")}>Home</Link>
                    <Link to={'/tv'}  className='links' onClick={() => setContentType("tv/top_rated")}>TV Shows</Link>
                    <Link to={'/movies'} className='links' onClick={() => setContentType("movie/upcoming")}>Movies</Link>
                    {/* <Link  className='links' onClick={() => setContentType("movie/popular")}>New & Popular</Link> */}
                    <Link  className='links' onClick={() => setContentType("movie/top_rated")}>My List</Link>
                    <Link  className='links' onClick={() => setContentType("tv/airing_today")}>Browse by Language</Link>
                </div>
                {/* <ul>
                    <li>Home</li>
                    <li>TV Shows</li>
                    <li>Movies</li>
                    <li>New & Popular</li>
                    <li>My List </li> 
                    <li>Browse by Language</li>
                </ul> */}
            </div>
            <div className="navbar-right">
                <img src={search_icon} alt="" className='icons' />
                <p>{user? user.name : "user"}</p>
                <img src={bell_icon} alt="" className='icons' />
                <div className="navbar-profile">
                    <img src={profile_img} alt="" className='profile' />
                    <img src={caret_icon} alt="" />
                    <div className="dropdown">
                        <p onClick={() => { logout() }}>Sign Out</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Navbar