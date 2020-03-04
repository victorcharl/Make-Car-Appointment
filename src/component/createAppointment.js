import React, { Component } from 'react';
import axios from 'axios';
import { Button, Input, FormGroup, Label} from 'reactstrap';

export class CreateAppointment extends Component {

	constructor(props){
		super(props);
		this.state = {
			appointments : [],
			newAppointment : {
				appDate: '',
				appTime: '',
				appDescription: '',
				appName: '',
				appEmail: ''
			}
		}
	}

	createAppointment() {
		if(!this.state.newAppointment.appDate || !this.state.newAppointment.appTime
			|| !this.state.newAppointment.appName || !this.state.newAppointment.appEmail
			|| !this.state.newAppointment.appDescription)
		{
			alert('PLEASE FILL UP FORM PROPERLY')

		}
		else
		{
			axios
				.post('http://localhost:3000/appointmentList', this.state.newAppointment)
				.then(response => {
					this.state.appointments.push(response.data)
				})
				alert('APPOINTMENT SAVE!')
		}
	}

	render() {

		return(
			<form className="login-form" >
				<div className="card-body"></div>
				<div className="row justify-content-center">
					<div className="col-md-8">
						<div className="card">
							<div className="card-header">
								<h3>Create Appointment</h3>
							</div>
							<div>
								<div className="card-body">
									<a href = "/appoinτmenτs">See Appointments</a>
								</div>
								<FormGroup className="form-group row">
									<Label className="col-md-4 col-form-label text-md-right"
										 for = "date">When would they like to come?</Label>
									<Input className="col-md-6 form-control"
										id = "appDate" type = "date" min="2019-12-15" max ="2020-12-31"
										value ={this.state.newAppointment.appDate} 
									  	onChange = {(e) => {
											let { newAppointment } = this.state;
											newAppointment.appDate = e.target.value; 
											this.setState({newAppointment});
									}} />
								</FormGroup>
								<FormGroup className="form-group row">
									<Label className="col-md-4 col-form-label text-md-right"
										for = "time">On what time</Label>
									<Input className="col-md-6 form-control"
										id = "appTime" type = "time" step = "900"
										value ={this.state.newAppointment.appTime} 
									  	onChange = {(e) => {
											let { newAppointment } = this.state;
											newAppointment.appTime = e.target.value; 
											this.setState({newAppointment});
									  }} />
								</FormGroup>
								<FormGroup className="form-group row">
									<Label className="col-md-4 col-form-label text-md-right"
										for = "description">Description</Label>
									<Input className="col-md-6 form-control"
										id = "appDescription"  value ={this.state.newAppointment.appDescription} 
									  	onChange = {(e) => {
											let { newAppointment } = this.state;
											newAppointment.appDescription = e.target.value; 
											this.setState({newAppointment});
									  }} />
								</FormGroup>
								<FormGroup className="form-group row">
									<Label className="col-md-4 col-form-label text-md-right"
										for = "name">Name</Label>
									<Input className="col-md-6 form-control" 
										id = "appName"  value ={this.state.newAppointment.appName} 
									  	onChange = {(e) => {
											let { newAppointment } = this.state;
											newAppointment.appName = e.target.value; 
											this.setState({newAppointment});
									  }} />
								</FormGroup>
								<FormGroup className="form-group row">
									<Label className="col-md-4 col-form-label text-md-right"
										for = "email">Email Address</Label>
									<Input className="col-md-6 form-control"
										id = "appEmail" type = "email"
										value ={this.state.newAppointment.appEmail} 
									  	onChange = {(e) => {
											let { newAppointment } = this.state;
											newAppointment.appEmail = e.target.value; 
											this.setState({newAppointment});
									  }} />
								</FormGroup >
								<div className="card-body"></div>
      							<Button className = "col-md-6 offset-md-4 btn btn-primary mr-2" color="primary" onClick={this.createAppointment.bind(this)} >Create Appointment</Button>
								<div className="card-body"></div>
							</div>
						</div>
					</div>
				</div>
			</form>
		);
	}
}