import React, { Component } from 'react'

class HeaderComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
        	
                 
        }

       
    }
    setData() {
    return localStorage.getItem('loginId');

}
logout=(e)=>{
    e.preventDefault();
    localStorage.removeItem('loginId');
    this.props.history.push('/');

}

    render() {
        return (
            <div>
                <header>
                    <nav className="navbar navbar-expand-md navbar-dark bg-dark">
                    <div><a href="" className="navbar-brand">E-AUCTION APPLICATION</a></div>
                    </nav>
                </header>
            </div>
        )
    }
}

export default HeaderComponent
