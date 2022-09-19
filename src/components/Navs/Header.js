import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import logo from "../../image/logo.png"
import { useDispatch } from "react-redux"
import { useNavigate } from 'react-router-dom'




function Header() {
    const [searchName, setSearchName] = useState('')
    const dispatch = useDispatch()
    const navigate = useNavigate()


    const handleSearch = (e) => {
        e.preventDefault();
        dispatch({
            type: "searchData",
            payload: searchName
        })
    }

    const logOut = (e) => {
        e.preventDefault()
        navigate('/')
        localStorage.clear('token');
    
      }
    return (
        <div className='main-header'>
            <div className='container'>
                <div className='row'>
                    <nav className="navbar navbar-expand-lg navbar-light main-nav">
                        <span className="navbar-brand main-nav-brandName"><img src={logo} /></span>
                        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse nav-right" id="navbarTogglerDemo02">
                            <span className='d-flex'>
                            <span className="nav-link" href="#"><Link className="main-nav-link" to="/home">Home</Link> </span>
                            <span className="nav-link" href="#"><Link className="main-nav-link" to="/dataTable">Admin</Link> </span>
                            </span>
                            <form className="form-inline my-2 my-lg-0" onSubmit={(e) => handleSearch(e)}>
                                <input className="form-control mr-sm-2 nav-input" type="search" placeholder="Search project"  onChange={(e)=>setSearchName(e.target.value)} />
                                <button className="btn nav-btn my-2 my-sm-0" type="submit" >Search</button>
                                <Link to="/"> <button className="btn nav-btn-logout my-2 my-sm-0" type="submit" onClick={(e)=>logOut(e)}>Logout</button></Link>
                            </form>
                        </div>
                    </nav>
                </div>
            </div>
        </div>
    )
}

export default React.memo(Header)