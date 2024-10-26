
import React, { useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom';

const Navbar = (props) => {
    let location = useLocation();
    let navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
        props.showAlert('Logged Out Successfully', 'success')
    }

    useEffect(() => {
        if (location.pathname === "/") {
            document.title = "rNotebook - Home"
        } else if (location.pathname === "/about") {
            document.title = "rNotebook - About"
        }
        else if (location.pathname === "/login") {
            document.title = "rNotebook - Login"
        } else if (location.pathname === "/signup") {
            document.title = "rNotebook - Sign Up"
        }
    }, [location])

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark sticky-top">
            <div className="container-fluid">
                <h1 className="navbar-brand">rNotebook</h1>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className={`nav-link ${location.pathname === "/" ? "active" : ""}`} aria-current="page" to="/">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className={`nav-link ${location.pathname === "/about" ? "active" : ""}`} to="/about">About</Link>
                        </li>
                    </ul>
                    {/* Conditionally render Login/Signup or Logout button */}
                    <div>
                        {!localStorage.getItem('token') ? (
                            <>
                                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                    <li className="nav-item">
                                        <Link to="/login" className="btn btn-primary mx-2 mb-2" role="button">Login</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link to="/signup" className="btn btn-primary mx-2" role="button">Sign Up</Link>
                                    </li>

                                </ul>
                            </>
                        ) : (
                            
                            <button className="btn btn-primary" onClick={handleLogout}>Logout</button>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Navbar
