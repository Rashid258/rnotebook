
import React, {useEffect} from 'react'
import { Link, useLocation } from 'react-router-dom'

const Navbar = () => {
    let location = useLocation();
    
    useEffect(()=>{
        if(location.pathname === "/"){
            document.title = "rNotebook - Home"
        }else if(location.pathname === "/about"){
            document.title = "rNotebook - About"
        }
    }, [location])

    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container-fluid">
                    <h1 className="navbar-brand">rNotebook</h1>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <Link className={`nav-link ${location.pathname === "/"? "active" : ""}`} aria-current="page" to="/">Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link className={`nav-link ${location.pathname === "about"? "active" : ""}`} to="about">About</Link>
                            </li>
                        </ul>
                        <form className="d-flex">
                            <Link to="/login" className="btn btn-primary mx-2" role='button'>Login</Link>
                            <Link to="/signup" className="btn btn-primary mx-2" role='button'>Sign Up</Link>
                        </form>
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default Navbar
