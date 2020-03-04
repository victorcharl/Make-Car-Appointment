import React, { Component } from 'react';
import { Button, Input, FormGroup, Label} from 'reactstrap';
import axios from 'axios';

export class Login extends Component {

	constructor(props){
		super(props);
		this.state = {
			user : {
				EmailAddress : '',
				Password : ''
			}
		}
	}

	loggingIn(){
		axios
			.post('http://s28.ca/rest/bowspace/login', this.state.user)
			.then(response => {
				if(response.data.Status === "success"){
					window.location.pathname = "/appoinτmenτs"
				}
				else{
					alert('Unregistered User')
				}
			});
	}

	render() {
		return(
			<form className="login-form">
				<div className="card-body"></div>
				<div className= "container">
					<div className="row justify-content-center">
					<h6 style={{color:"red"}}>*Please use the sample authentication users that you gave.</h6>
						<div className="col-md-8">
							<div className="card">
								<div className="card-header">Login</div>
								<div className="card-body"></div>
									<FormGroup className="form-group row">
										<Label className="col-md-4 col-form-label text-md-right" for = "EmailAddress">Email Address: </Label>
										<Input className="col-md-6 form-control" 
											id = "EmailAddress" placeholder = "email address"
											onChange = {(e) => {
												let { user } = this.state;
												user.EmailAddress = e.target.value; 
												this.setState({user});
											}} />
									</FormGroup>
									<FormGroup className="form-group row">
										<Label className="col-md-4 col-form-label text-md-right" for = "Password">Password:</Label>
										<Input className="col-md-6 form-control" 
											id = "Password" type = "Password" placeholder = "password"
											onChange = {(e) => {
												let { user } = this.state;
												user.Password = e.target.value; 
												this.setState({user});
											}} />
									</FormGroup>
									<Button className = "col-md-6 offset-md-4 btn btn-primary" color="primary" 
										onClick = {this.loggingIn.bind(this)} >
											Login
									</Button>
								<div className="card-body"></div>	
							</div>
						</div>
					</div>
				</div>
			</form>
		);
	}
}