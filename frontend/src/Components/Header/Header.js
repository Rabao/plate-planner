import React, {Component} from 'react';
import {Navigate, Link, Route, Routes} from 'react-router-dom';
import {FaSearch} from 'react-icons/fa';

export default class Header extends Component {
    render(){
        return(
            <div className="header">
                <div className="container">
                    <div className="row">
                        <div className="col search-wrapper" id="search-wrapper" md={9}>
                            <form>
                                <input type="text" name="search-bar" id="search-bar"></input>
                                <button id="search-button"><FaSearch /></button>
                            </form>
                        </div>
                        <div className="col link-wrapper" id="link-wrapper" md={3}>
                            {this.props.token !== undefined ?
                                    <div>
                                        
                                        <Link to='/login' className="header-links" onClick={this.props.handleLogout}>Logout</Link> 
                                        <Routes>
                                            <Route path='' element={<Navigate to='/home' />} />
                                        </Routes>
                                        <Link to='/home' className="header-links">Home |</Link>
                                    </div>  
                                : 
                                    <Link to='/login' className="header-links">Home </Link>
                            }
                        </div>
                    </div>
                </div>
            </div>
        )
    }

}