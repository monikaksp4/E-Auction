import React, { Component } from 'react'
import HeaderComponent from '../Component/HeaderComponent';
import '../Component/Style.css'
import UserService from '../services/UserService';

class ForgetPasswordComponent extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            error:'',
            loginId:'',
            password:''
                 
        }
    }
    handleChange=(e)=>{
        this.setState({[e.target.name]:e.target.value});
    }
 cancel=(e)=>{
        e.preventDefault();
        this.props.history.push('/');
    }
    
    getLoginDetails=(e)=>{
        e.preventDefault();
        if(this.state.loginId!='' && this.state.password!=''){
            UserService.forgetPassword(this.state.loginId,this.state.password).then(response => {
           this.props.history.push('/forgetPasswordSuccess');
       }).catch(err => { 
        let error=err.message;
        if(error=="Request failed with status code 500"){
   this.setState({error:"LoginId is incorrect"});
    } });       
   }
        else{
this.setState({error:'Please enter the fields'});
        }
    }
    render() {
        return (
            <div>
           <HeaderComponent/>
           <div>
           <div className = "login">
            <h2 className="center">Forget Password</h2>
                                    <form>
                                    <div className = "form-group">
                                            <input  placeholder="Enter Login Id" name="loginId" className="form-control"  
                                                value={this.state.loginId} onChange={this.handleChange}/>
                                        </div>
                                         <div className = "form-group">
                                            <input type="password" placeholder="Enetr New Password" name="password" className="form-control" 
                                            value={this.state.password} onChange={this.handleChange}/>
                                        </div>
                                     <div className = "form-group">
                                        <span className="error">{this.state.error}</span>
                                         </div> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                        
                                        <button className="btn btn-success" onClick={this.getLoginDetails.bind(this)}>submit</button>
                                                                         
                                                                         </form>
                                </div></div>
                                
           </div>
        )
    }
}

export default ForgetPasswordComponent
