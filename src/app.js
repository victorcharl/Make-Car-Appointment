import React, { Component } from 'react';
import { BrowserRouter, Route, Switch} from 'react-router-dom';

import { Login } from './component/login';
import { AppointmentList } from './component/appointmentList';
import { CreateAppointment } from './component/createAppointment';

/// App
export class App extends Component {

	render() {

		return(
			<BrowserRouter>
				<div>
					<Switch>
						<Route path ="/" exact component = {Login} />
						<Route path ="/appoinτmenτs" component = {AppointmentList} />
						<Route path ="/creaτe" component = {CreateAppointment} />
						<Route render={() => (<div> This route doesn't exist </div>)}/>
					</Switch>
				</div>
			</BrowserRouter>
		);
	}

}
