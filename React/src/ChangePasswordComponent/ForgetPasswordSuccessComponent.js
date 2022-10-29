import React, { Component } from 'react'
import HeaderComponent from '../Component/HeaderComponent';
import { BrowserRouter, Route, Switch, Link} from 'react-router-dom';
import '../Component/Style.css'
class ForgetPasswordSuccessComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
        	
                 
        }

       
    }
    

    render() {
        return (
            <div>
                <HeaderComponent/>
                <br/><br/><br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <span>Password Changed successfully...<Link to="/">Click here to Login</Link></span>
            </div>
        )
    }
}

export default ForgetPasswordSuccessComponent
