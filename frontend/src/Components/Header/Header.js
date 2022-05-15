import React, {Component} from 'react';
import {Navigate, Link, Route, Routes} from 'react-router-dom';
import {CgSearch} from 'react-icons/cg';
import {CgHome} from 'react-icons/cg';
import { Dropdown, ButtonGroup, Button } from 'react-bootstrap';

export default class Header extends Component {
    render(){
        const navText = "Hello, " + this.props.user + "!";
        return(
            <div className="header">
                <div className="container">
                    <div className="row">
                        <div className="col search-wrapper" id="search-wrapper" md={9}>
                            <form>
                                <input type="text" name="search-bar" id="search-bar"></input>
                                <button id="search-button"><CgSearch /></button>
                            </form>
                        </div>
                        <div className="col link-wrapper" id="link-wrapper" md={3}>
                            {this.props.token !== undefined ?
                                    <div>
                                        <Routes>
                                            <Route path='' element={<Navigate to='/home' />} />
                                        </Routes>   
                                        
                                        <Dropdown as={ButtonGroup} className="header-links">
                                            <Link to="/home"><Button><CgHome/></Button></Link> 
                                            <Dropdown.Toggle split >
                                                <span id="header-welcome">{navText}</span>
                                            </Dropdown.Toggle>    
                                                <Dropdown.Menu>
                                                    <Dropdown.Item to='/login' onClick={this.props.handleLogout}>Logout</Dropdown.Item>  
                                                </Dropdown.Menu>                           
                                       </Dropdown>
                                    </div>

                                     
                                : 
                               
                                    <Dropdown as={ButtonGroup} className="header-links">
                                        <Link to="/home"><Button><CgHome/></Button></Link>
                                        <Dropdown.Toggle split  >
                                            <span id="header-welcome">Sign in/ Sign up</span>
                                        </Dropdown.Toggle>    
                                            <Dropdown.Menu>
                                                <Dropdown.Item href='/login'>Sign In</Dropdown.Item> 
                                                <Dropdown.Item href='/register'>Sign Up</Dropdown.Item>  
                                            </Dropdown.Menu>                           
                                    </Dropdown>
                            
                                    
                            }
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

// const handleDropdown = () => {
//     return(

//     )
// }

