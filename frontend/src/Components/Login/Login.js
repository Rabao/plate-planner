import React, {Component} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {connect} from 'react-redux'
import { withRouter } from '../WithRouer/WithRouter';
import {addToken, addUser} from '../../Redux/actionCreators'
import {baseUrl} from '../../Shared/baseUrl'
import axios from 'axios'
import {Breadcrumb} from 'react-bootstrap'


const mapDispatchToProps = (dispatch) => ({
    addToken: () =>  dispatch(addToken()),
    addUser: () => dispatch(addUser()) 
});

function ClickToLogInRegister(props) {
    const navigate = useNavigate();


    async function handleLogin (username,password) {
        const data = { username: username, password:  password };
        const userWithToken = await axios.post(baseUrl + '/login', data)
        await props.dispatch(addToken(userWithToken.data.token))
        await props.dispatch(addUser(userWithToken.data.user));
        navigate('/home');       
    }

    function handleSubmit() {
        const data = {username: props.rUsername, password: props.rPassword, confirmPassword: props.confirmPassword, role: 'USER'}
        if(props.rPassword === props.confirmPassword){
            axios.post(baseUrl + "/register", data)

            setTimeout(() => {
                 handleLogin(data.username, data.password);
            }, 300)

        }else{
            alert("Password and Confirm Password must match!")
        }
    }

    return (
        <div className="row">
            {/* <Link to="/register">Need an account?</Link> */}
            <button type="submit" className='submit-buttons' onClick={() => handleLogin(props.username,props.password)}>Sign in</button>
            <button type="submit" className='submit-buttons' onClick={() => handleSubmit()}>Sign Up</button>
        </div> 
    )
}

// function LoginAction(props) {
//     // ClickToLogIn(props.username,props.password,props.dispatch)
//     return (
//         <div className="row">
//             <Link to="/register">Need an account?</Link>
//             <button type="submit" className='submit-buttons' onClick={() => ClickToLogIn(props.username,props.password,props.dispatch)}>Sign in</button>
//         </div>
//     )
// }

class Login extends Component {
    
    constructor(props){
        super(props);
        this.state = {
            username: '',
            password: '',
            rUsername: '',
            rPassword: '',
            confirmPassword: ''
        }
        this.handleInputChange = this.handleInputChange.bind(this);
    }
    

    handleLogin = async () => {
        const data = { username: this.state.username, password: this.state.password };
        

        const userWithToken = await axios.post(baseUrl + '/login', data)

        
        await this.props.dispatch(addToken(userWithToken.data.token))
        await this.props.dispatch(addUser(userWithToken.data.user));
    }

    handleInputChange = (event) => {
        event.preventDefault()
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    // handleSubmit = (dispatch) => {
    //     const data = {username: this.state.rUsername, password: this.state.rPassword, confirmPassword: this.state.confirmPassword, role: 'USER'}
    //     if(this.state.rPassword === this.state.confirmPassword){
    //         axios.post(baseUrl + "/register", data)

    //     const username = this.state.rUsername;
    //     const password = this.state.rPassword;
      

 
    //     ClickToLogIn(username, password,dispatch);
  
        

    //     }else{
    //         alert("Password and Confirm Password must match!")
    //     }
    // }


    render(){
        return(
            <div className="login-page">
            <div className="container">
                <Breadcrumb>
                    <Breadcrumb.Item>
                        <Link to="/home">Home</Link>  
                    </Breadcrumb.Item>
                    <Breadcrumb.Item active>
                        Sign In
                    </Breadcrumb.Item>
                </Breadcrumb>
            <div className="container">
                <div className="row login-body" style={{width:"75%"}}>
                    <div className="col login"  style={{width:"33%"}}>
                            <h5> Sign in </h5>
                                <label class="sr-only">Username</label>
                                <input
                                    type="text"
                                    id="username"
                                    name="username"
                                    class="form-control"
                                    placeholder="Username"
                                    v-model="user.username"
                                    onChange={this.handleInputChange}
                                    required
                                />
                                <label class="sr-only">Password</label>
                                <input
                                    type="password"
                                    id="password"
                                    name="password"
                                    class="form-control"
                                    placeholder="Password"
                                    v-model="user.password"
                                    onChange={this.handleInputChange}
                                    required
                                />
                            </div>
                    <div className="col register" style={{width:"33%"}}>
                        <h5>Create Account</h5>
                                <label class="sr-only">Username</label>
                                <input
                                    type="text"
                                    id="rUsername"
                                    name="rUsername"
                                    class="form-control"
                                    placeholder="Username"
                                    v-model="user.username"
                                    onChange={this.handleInputChange}
                                    required
                                />
                                <label class="sr-only">Password</label>
                                <input
                                    type="rPassword"
                                    id="rPassword"
                                    name="rPassword"
                                    class="form-control"
                                    placeholder="Password"
                                    v-model="user.password"
                                    onChange={this.handleInputChange}
                                    required
                                />
                                <input
                                    type="password"
                                    id="password-confirm"
                                    name="confirmPassword"
                                    class="form-control"
                                    placeholder="Confirm Password"
                                    v-model="user.password"
                                    onChange={this.handleInputChange}
                                    required
                                />
                                {/* <Link to="/login">Have an account?</Link> */}
                    </div>
                    <div className="row login-register">
                    <ClickToLogInRegister 
                                            username = {this.state.username}
                                            password = {this.state.password}
                                            dispatch = {this.props.dispatch}
                                            rUsername = {this.state.rUsername}
                                              rPassword = {this.state.rPassword}
                                              confirmPassword = {this.state.confirmPassword}/>
                    </div>
                </div>
            </div>
        </div>
    </div>
        )
    }
}

export default withRouter(connect(mapDispatchToProps)(Login));