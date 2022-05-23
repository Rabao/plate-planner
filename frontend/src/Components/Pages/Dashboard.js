import React, { Component } from 'react'
import {Breadcrumb} from 'react-bootstrap'
import {Link} from 'react-router-dom'
import {Modal, ModalBody, ModalHeader} from 'reactstrap';
import { LocalForm } from 'react-redux-form';

export default class Dashboard extends Component{
    constructor(props){
        super(props)

    }
    
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
                        <div className="col" md={12} id="generate-plan">
                            <h5>Published Recipes</h5>
                           {this.props.recipes ? <div><EditDeleteRecipe recipes={this.props.recipes} user={this.props.user} deleteRecipe={this.props.deleteRecipe}/></div> : <div></div>}
                        </div>
                    </div>             
                    <div className="row">
                        <div className="col" md={6} id="generate-plan">
                        <aside>
                            <h5>Your Plans</h5>

                        </aside>
                        </div>
                        <div className="col" md={6} id="generate-plan">
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

class EditDeleteRecipe extends Component{

    constructor(props){
        super(props);
        this.state = {
            isModalOpen: false,
            activeModal: ''
        };
        this.toggleModal = this.toggleModal.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        // this.handleEdit = this.handleEdit.bind(this);
    }

    toggleModal(activeModal){
        this.setState({
            activeModal: activeModal,
            isModalOpen: !this.state.isModalOpen
        });
    }

    handleDelete(id){
        this.toggleModal();
        this.props.deleteRecipe(id);
        window.location.reload(false);
    }

    // handleEdit(id, values){
    //     this.toggleModal();
    //     this.props.editComment(id, values.rating, values.userComment);
    //     window.location.reload(false);
    // }

    render(){
        let id = this.props.user.id;
        let filteredRecipes = this.props.recipes.filter(recipes => recipes.userId === parseInt(id,10));
    
        const recipes = filteredRecipes.map((recipe) => {
            return(
            <div className="users-published-recipes">               
                <div id="dashboard-recipe-collection-text"><p><mark>{recipe.name}</mark></p></div>
                    <div key={recipe.id} className="dashboard-recipe-collection">  
                        <img src={recipe.image}/>
                    </div>
                <div id="manage-recipe-buttons" md={6}>
                        <button type="button" className="dashboard-interface-button" >&#9997; EDIT</button>
                        <button type="button" className="dashboard-interface-button" onClick={() => this.toggleModal('delete')}>&#10060; DELETE</button>
                </div>
                <Modal isOpen={this.state.activeModal === 'delete'} toggle={this.toggleModal}> 
                        <ModalHeader style={{borderBottom:0}} toggle={this.toggleModal}>Delete Recipe?</ModalHeader>
                        <ModalBody>
                            <LocalForm onSubmit={() => this.handleDelete(recipe.id)}>
                                {recipe.name}<br></br>
                                <button type='submit' variant='danger'>&#10060;Delete</button>
                            </LocalForm>
                        </ModalBody>
                </Modal>                  
            </div>
            )
        })
    


    
        return(
            <div className="row dashboard-recipe-collection-wrapper">
                {recipes} 
            </div>
            
            )

        }
    }

