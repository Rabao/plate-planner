import React, { Component } from 'react'
import {Breadcrumb} from 'react-bootstrap'
import {Link} from 'react-router-dom'
import { usersFailed } from '../../Redux/actionCreators';

class Dashboard extends Component{

    render(){
        return(
            <div className='container'>
            <Breadcrumb>
                <Breadcrumb.Item>
                    <Link to="/home">Home</Link>  
                </Breadcrumb.Item>
                <Breadcrumb.Item active>
                    Dashboard
                </Breadcrumb.Item>
            </Breadcrumb>
            <div className="container">
                <div className='component-body'>
                <div className="row">
                    <div className="col xl-3">
                        <div className="avatar">
                            <img src="/avatars/istockphoto-1089633230-612x612.jpg"/>
                        </div>
                    </div>
                    <div className="col xl-3">
                        <div className="user-info">
                           <h3>Hello there, {this.props.user.username}!</h3>
                        </div>
                    </div>
                    <div className="col xl-6">
                        <div className="user-info">
                           <h5></h5>
                        </div>
                    </div>
                </div>             
                    <div className="row">
                        <div className="col" md={4} id="generate-plan">
                        <aside>
                            <h5>Your Plans</h5>

                        </aside>
                        </div>
                        <div className="col" md={4} id="generate-plan">
                        <aside>
                            <h5>Your Recipes</h5>

                        </aside>
                        </div>
                        <div className="col" md={4} id="generate-plan">
                        <aside>
                            <h5>Your Groceries</h5>

                        </aside>
                        </div>
                    </div>
                    </div>
                        {/* Visible if the user is registered. */}         
            </div>
    </div>
        )
    }
}

export default Dashboard;