import React, {Component} from 'react';
import {useNavigate, Link, Route, Routes} from 'react-router-dom';
import {CgSearch} from 'react-icons/cg';
import {CgHome} from 'react-icons/cg';
import { Dropdown, ButtonGroup, Button } from 'react-bootstrap';
import { Control, LocalForm } from 'react-redux-form';
    
// function NavigateToPath(path){
//     const navigate = useNavigate();
//     navigate(path);       
// }

function Header(props) {
        const navigate = useNavigate();

    // constructor(props){
    //     super(props);
        
    //     this.submitSearch = this.submitSearch.bind(this);
    // }
    
    function submitSearch(values){
        console.log(values.searchbar);
        props.searchRecipe(values.searchbar);
        const path = '/recipes/search/'+values.searchbar;
        navigate(path);       
    }

    const navText = "Hello, " + props.user.username + "! ";
    return(
        <div className="header">
            <div className="container">
                <div className="row">
                    <div className="col search-wrapper" id="search-wrapper" md={9}>
                        <LocalForm onSubmit={(values)=>submitSearch(values)}>
                                <Control.text model='.searchbar' 
                                name="searchbar" 
                                className="form-control"
                                id="searchbar"/>
                            {/* <input type="text" name="searchbar" id="searchbar"></input> */}
                            <button id="search-button" type='submit'><CgSearch /></button>
                        </LocalForm>
                    </div>
                    <div className="col link-wrapper" id="link-wrapper" md={3}>
                        {props.token !== undefined ?
                                <div>
                                    {/* <Routes>
                                        <Route path='' element={<Navigate to='/home' />} />
                                    </Routes>   

                                        */}
                                    <Dropdown as={ButtonGroup} className="header-links">
                                        <Link to="/home"><Button><CgHome/></Button></Link> 
                                        <Dropdown.Toggle split >
                                            <span id="header-welcome">{navText}</span>
                                        </Dropdown.Toggle>    
                                            <Dropdown.Menu>
                                                <Dropdown.Item as={Link} to='/user'>Dashboard</Dropdown.Item>
                                                <Dropdown.Item as={Link} to='/add/recipe'>Author Recipe</Dropdown.Item>
                                                <Dropdown.Item as={Link} to='/groceries'>Your Groceries</Dropdown.Item>
                                                <Dropdown.Item as={Link} to='/mealplans' active>Manage Meal Plans</Dropdown.Item>
                                                <Dropdown.Divider />
                                                <Dropdown.Item as={Link} to='/login' onClick={props.handleLogout}>Logout</Dropdown.Item>  
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


export default Header;

