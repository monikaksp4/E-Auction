import React, { Component } from 'react'
import HeaderComponent from './HeaderComponent';
import './Style.css'
import UserService from '../services/UserService';

class Registration extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            
            users:{},
            error:'',
            message:''


        }

    }
handleChange(user,e){
    let users=this.state.users;
    users[user]=e.target.value;
    this.setState({users});
   
}

handelValidation(){
    let users=this.state.users;
    let validate=true;
    console.log(users.loginId);
    if(!users["loginId"] && !users["firstName"] && !users["lastName"] && !users["email"] && !users["dob"] && !users["password"] && !users["contactNumber"]){
this.setState({error:"Please enter all field"});
        validate=false;
    }
    else{
         if(users["password"]!=users["confirmPassword"]){
            this.setState({error:"Please enter password and confirmPassword same"});
        validate=false;
        }
        else{
        validate=true;
        }}
        return validate;

}

    
    cancel=(e)=>{
        e.preventDefault();
        this.props.history.push('/registration');
    }
    login=(e)=>{
        e.preventDefault();
        this.props.history.push('/');
    }
    saveUserDetails=(e)=>{
        e.preventDefault();
if(this.handelValidation()){
let users=this.state.users;
UserService.saveUser(users).then(response => {
   this.setState({message: "Registered successfully"})})
    .catch(err => { 
        let error=err.message;
        if(error=="Request failed with status code 500"){
   this.setState({error:"Login Id and Email Already Exist"});
    } })
}
}
   
    render() {
        return (
            <div>
            <HeaderComponent/>
            <div>
            <div className = "registration">
            <h2 className="center">Registration</h2>
                                    <form>
                                    <div className = "form-group">
                                            <input  placeholder="Login Id" name="loginId" className="form-control"  
                                                value={this.state.users["loginId"]} onChange={this.handleChange.bind(this,"loginId")}/>
                                        </div>
                                        <div className = "form-group">
                                            <input placeholder="First Name" name="firstName" className="form-control" 
                                            value={this.state.users["firstName"]} onChange={this.handleChange.bind(this,"firstName")}
                                                />
                                        </div>
                                        <div className = "form-group">
                                            <input placeholder="Last Name" name="lastName" className="form-control" 
                                            value={this.state.users["lastName"]} onChange={this.handleChange.bind(this,"lastName")}
                                                />
                                        </div>
                                        <div className = "form-group">
                                            <select placeholder="Account Type" name="accountType" className="form-control" 
                                            value={this.state.users["accountType"]} onChange={this.handleChange.bind(this,"accountType")}
                                                >
                                                    <option>Seller</option><option>Buyer</option>
                                            </select>
                                        </div>
                                         <div className = "form-group">
                                            <input placeholder="Contact Number" name="contactNumber" className="form-control" 
                                            value={this.state.users["contactNumber"]} onChange={this.handleChange.bind(this,"contactNumber")}
                                               />
                                        </div>
                                        <div className = "form-group">
                                            <input placeholder="Address" name="address" className="form-control" 
                                            value={this.state.users["address"]} onChange={this.handleChange.bind(this,"address")}
                                                />
                                        </div>
                                        <div className = "form-group">
                                            <input placeholder="City" name="city" className="form-control" 
                                            value={this.state.users["city"]} onChange={this.handleChange.bind(this,"city")}
                                                />
                                        </div>
                                        <div className = "form-group">
                                            <input placeholder="State" name="state" className="form-control" 
                                            value={this.state.users["state"]} onChange={this.handleChange.bind(this,"state")}
                                                />
                                        </div>

                                        <div className = "form-group">
                                            <input placeholder="Email Id" name="email" className="form-control"
                                            value={this.state.users["email"]} onChange={this.handleChange.bind(this,"email")} 
                                                />
                                        </div>
                                        <div className = "form-group">
                                            <input type="password" placeholder="Password" name="password" className="form-control" 
                                            value={this.state.users["password"]} onChange={this.handleChange.bind(this,"password")}
                                               />
                                        </div>
                                         <div className = "form-group">
                                            <input type="password" placeholder="Confirm Password" name="confirmPassword" className="form-control" 
                                            value={this.state.users["confirmPassword"]} onChange={this.handleChange.bind(this,"confirmPassword")}
                                                />
                                        </div>
                                         <div className = "form-group">
                                        <span className="error">{this.state.error}</span>
                                        <span className="message">{this.state.message}</span>
                                         </div> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<button className="btn btn-success" onClick={this.saveUserDetails.bind(this)}>Save</button>
                                        <button className="btn btn-danger" onClick={this.cancel.bind()} style={{marginLeft: "10px"}}>Cancel</button>
                                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span> <a href='' onClick={this.login.bind()}>Already registered?LOGIN</a></span>
                                       
                                         </form>
                                </div>
            </div>
            </div>
        )
    }
}

export default Registration
