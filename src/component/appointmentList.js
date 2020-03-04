import React, { Component } from 'react';
import { Table , Button, Modal, ModalBody, ModalFooter, ModalHeader, Label, Input, FormGroup} from 'reactstrap';

import axios from 'axios';

export class AppointmentList extends Component {

	constructor(props){
		super(props);
		this.state = {
			appointments : [],
			editAppointmentModal : false,
			updatedModal: false,
			editAppointment : {
				id: '',
				appDate: '',
				appTime: '',
				appDescription: '',
				appName: '',
				appEmail: ''
			}
		}
	}

	toggleEditAppModal(){
		this.setState({
			editAppointmentModal : !this.state.editAppointmentModal
		});
	}

	toggleUpdateSuccessfulModal(){
		this.setState({
			updatedModal : !this.state.updatedModal,
			editAppointmentModal : !this.state.editAppointmentModal
		});
	}

	componentDidMount(){
		this.getAppointments();
	}

	getAppointments(){
		axios
			.get('http://localhost:3000/appointmentList')
			.then(response => {	
				this.setState({
					appointments : response.data
					
				})
			});
			
	}

	cancelAppointment(id) {
		axios
			.delete('http://localhost:3000/appointmentList/' + id)
			.then(response => {
				this.getAppointments();
			});
	}

	updateAppointment(){
		if(!this.state.editAppointment.appDate || !this.state.editAppointment.appTime
			|| !this.state.editAppointment.appName || !this.state.editAppointment.appEmail
			|| !this.state.editAppointment.appDescription)
		{
			alert('Please dont leave any empty value')

		}
		else{

			let { appDate, appTime, appDescription, appName, appEmail} = this.state.editAppointment;
			
			axios
			.put('http://localhost:3000/appointmentList/' + this.state.editAppointment.id, {
				appDate, appTime, appDescription, appName, appEmail
			})
			.then(response => {
				this.getAppointments();
				
			this.setState({updatedModal : true});
			});
		}
	}

	editAppointmentData(id, appDate, appTime, appDescription, appName, appEmail){
		this.setState({
			editAppointmentModal: true,
			editAppointment: {
				id, appDate, appTime, appDescription, appName, appEmail
			}
		})
	}

	render() {

		let appointments = this.state.appointments.map((appointment, index) => {
			return (
				<tr key = {index}>
					<td>{appointment.id}</td>
					<td>{appointment.appDate}</td>
					<td>{appointment.appTime}</td>
					<td>{appointment.appDescription}</td>
					<td>{appointment.appName}</td>
					<td>{appointment.appEmail}</td>
					<td>
						<Button className= "mr-2" color = "success" size = "sm" onClick = {this.editAppointmentData.bind(this, 
							appointment.id, appointment.appDate, appointment.appTime, appointment.appDescription,
							 appointment.appName, appointment.appEmail)}>EDIT</Button>
						<Button color = "danger" size = "sm" onClick = {this.cancelAppointment.bind(this, appointment.id)}>CANCEL</Button>
					</td>
				</tr>
			)
		});

		return(
			<main className = "container">
				<div className="card-header">
					<h3>Appointment List
					<Button style = {{float:"right"}} href = "/">Logout</Button></h3>
				</div>
                <Table >
					<thead>
						<tr>
							<th>ID</th>
							<th>Date</th>
							<th>Time</th>
							<th>Description</th>
							<th>Name</th>
							<th>Email Address</th>
							<th>Actions</th>
						</tr>
					</thead>
					<tbody>
						{appointments}
					</tbody>
				</Table>
				<Button className = "col-md-4 offset-md-4" color="primary" href="/creaτe">Create Appointment</Button>
				
				<Modal isOpen = {this.state.editAppointmentModal} toggle = {this.toggleEditAppModal.bind(this)}>
					<ModalHeader toggle = {this.toggleEditAppModal.bind(this)}>Edit Appointment</ModalHeader>
						<ModalBody>
							<FormGroup className="form-group row">
								<Label className="col-md-4 col-form-label text-md-right"
									 for = "id">ID</Label>
								<Input className="col-md-6 form-control"
									id = "id" readOnly
									value ={this.state.editAppointment.id} 
								  	onChange = {(e) => {
										let { editAppointment } = this.state;
										editAppointment.id = e.target.value; 
										this.setState({editAppointment});
								}} />
							</FormGroup>
							<FormGroup className="form-group row">
								<Label className="col-md-4 col-form-label text-md-right"
									 for = "date">Date</Label>
								<Input className="col-md-6 form-control"
									id = "appDate" type = "date" min="2019-12-15" max ="2020-12-31"
									value ={this.state.editAppointment.appDate} 
								  	onChange = {(e) => {
										let { editAppointment } = this.state;
										editAppointment.appDate = e.target.value; 
										this.setState({editAppointment});
								}} />
							</FormGroup>
							<FormGroup className="form-group row">
								<Label className="col-md-4 col-form-label text-md-right"
									for = "time">Time</Label>
								<Input className="col-md-6 form-control"
									id = "appTime" type = "time" step = "900"
									value ={this.state.editAppointment.appTime} 
								  	onChange = {(e) => {
										let { editAppointment } = this.state;
										editAppointment.appTime = e.target.value; 
										this.setState({editAppointment});
								  }} />
							</FormGroup>
							<FormGroup className="form-group row">
								<Label className="col-md-4 col-form-label text-md-right"
									for = "description">Description</Label>
								<Input className="col-md-6 form-control"
									id = "appDescription"
									value ={this.state.editAppointment.appDescription} 
								  	onChange = {(e) => {
										let { editAppointment } = this.state;
										editAppointment.appDescription = e.target.value; 
										this.setState({editAppointment});
								  }} />
							</FormGroup>
							<FormGroup className="form-group row">
								<Label className="col-md-4 col-form-label text-md-right"
									for = "name">Name</Label>
								<Input className="col-md-6 form-control" 
									id = "appName"
									value ={this.state.editAppointment.appName} 
								  	onChange = {(e) => {
										let { editAppointment } = this.state;
										editAppointment.appName = e.target.value; 
										this.setState({editAppointment});
								  }} />
							</FormGroup>
							<FormGroup className="form-group row">
								<Label className="col-md-4 col-form-label text-md-right"
									for = "email">Email Address</Label>
								<Input className="col-md-6 form-control"
									id = "appEmail" type = "email"
									value ={this.state.editAppointment.appEmail} 
								  	onChange = {(e) => {
										let { editAppointment } = this.state;
										editAppointment.appEmail = e.target.value; 
										this.setState({editAppointment});
								  }} />
							</FormGroup >
						</ModalBody>
					<ModalFooter>
						<Button className= "mr-2" color = "success" size = "sm" onClick = {this.updateAppointment.bind(this)}>Update</Button>
						<Button color = "danger" size = "sm" onClick = {this.toggleEditAppModal.bind(this)}>Cancel</Button>
					</ModalFooter>
				</Modal>
				<Modal isOpen = {this.state.updatedModal} toggle = {this.toggleUpdateSuccessfulModal.bind(this)}>
					<ModalHeader toggle = {this.toggleUpdateSuccessfulModal.bind(this)}>Update Successful</ModalHeader>
					<ModalBody>
						Changes have been made.
					</ModalBody>
					<ModalFooter>
						<Button onClick = {this.toggleUpdateSuccessfulModal.bind(this)}>Okay</Button>
					</ModalFooter>
				</Modal>
			</main>
		);
	}
}